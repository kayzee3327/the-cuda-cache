---
slug: volta-details-via-microbenchmarking
title: "[A] Dissecting the Volta Architecture: Notes"
authors: [kz]
tags: [Volta, Register, Instruction Analysis]
---

My notes on the article [Dissecting the NVIDIA Volta GPU Architecture via Microbenchmarking](https://arxiv.org/pdf/1804.06826). The Volta architecture fundamentally changes how AI computes. There are so many designs that still make an impact on latest architectures. I will dive into these same-in-Volta topics mentioned in [Dissecting the NVIDIA Ampere GPU Architecture via Microbenchmarking](https://www.nvidia.com/en-us/on-demand/session/gtcspring21-s33322/):

- Instruction Encoding
- Dual-Port Register

<!-- truncate -->

## Instruction

Volta uses one 128-bit word to encode each instruction together with its corresponding control information. Previous architectures use a 64-bit word to encode each instruction, and a separate 64-bit word to encode control information associated to multiple instructions. The author finds that 

- at least 91 bits are used to encode the instruction
- at least 23 bits are used to encode control information;
- the remaining 14 bits appeared to be unused in the author's experiments.

### Control Information

On Volta, each control section contains 2 zeroes as its most significant bits, and 1 section of 21 bits. In each 128-bit word, control information is preceded and followed by the instruction encoding bits.

6 sections containing control information are organized as follows:

| Width (bits) | 4           | 6                 | 3                  | 3                   | 1          | 4            |
| ------------ | ----------- | ----------------- | ------------------ | ------------------- | ---------- | ------------ |
| Meaning      | Reuse flags | Wait barrier mask | Read barrier index | Write barrier index | Yield flag | Stall Cycles |

#### Reuse flags

Each of the 4 reuse flag bits corresponds to one of the 8-byte slots. When a flag is set, the value of the register in the corresponding slot will be stored in the reuse cache for future instructions to consume. Reuse mitigates register bank conflicts. The least significant bit in reuse flags controls the cache for the first source operand slot. The most significant bit is for the fourth source operand slot.

#### Wait barrier mask & Write barrier index

While most instructions have fixed latency and can be statically scheduled by the assembler, instructions involving memory and shared resources typically have variable latency. In volta, dependency barriers are used to track the completion of variable-latency instructions and resolve data hazards. There are 6 available barriers in total and each maps to a bit in Wait barrier mask.

During compilation, when a variable latency instruction writes to a register, the assembler associates the register to one of the barriers by setting the corresponding Write barrier index field. In a later instruction that depends on this write result, the assembler marks a corresponding bit in its Wait barrier mask. 

The hardware will stall the later instruction until the results of the earlier one are available. An instruction may wait on multiple barriers, which explains why the Wait barrier mask is a bitmask, not an index.

#### Read barrier index (Read dependency barriers)

Read dependency barriers serve to protect against *write-after-read* hazards. Unbuffered instructions that write the contents of registers to memory need the registers to remain unchanged during the operation. To guarantee that, the assembler associates them to a barrier by populating the corresponding Read barrier index field. Later instructions writing to the same register will wait on that barrier.

#### Stall Cycles

This 4-bit field indicates how long the scheduler should wait before issuing the next instruction, ranging from 0 to 15 cycles. On Pascal and Maxwell, if the combination of this field and the yield flag contain a special combination of bits, the two dispatchers in a processing block can dispatch two consecutive instructions of a warp at the same time (dual issue). On Volta there is only one dispatcher in a processing block, and we do not observe dual issue in the generated code.

#### Yield flag

Balances workloads by controlling warp switching. If set, the scheduler prefers to issue the next instruction from the current warp. If cleared, it prefers switching to a new warp, which costs an extra cycle and renders the next instruction's register reuse flags ineffective.

### Encoding

Volta uses more bits to encode its instructions than previous architectures. The Volta architecture places the opcode in the least significant bits of the first 64-bit part of the code bundle. Volta opcodes vary in length from 10 to 13 bits. 

As in previous architectures, operands on Volta can be registers (general purpose, special or predication), memory addresses (constant, shared or global), or an immediate value. Predication is regulated by 4 bits: the first bit is a negation flag, and the remaining 3 bits encode a predicate register index.



## Dual-Port Register

The register file on Volta is divided into 2 banks and the width of each bank is 64 bits. The bank of a register is the register’s index modulo 2. Since the Volta GPU has 64-bit register banks, a conflict will only happen when all three 32-bit source registers in an `FFMA` instruction are in a same bank. For example, R97 and R99 are in bank 1; if RX also sits in bank 1, a conflict will occur.
