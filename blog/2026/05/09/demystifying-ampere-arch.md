---
slug: demystifying-ampere-arch
title: "[A] Demystifying NVIDIA Ampere Architecture: Notes"
authors: [kz]
tags: [Ampere, PTX, SASS, Instruction Analysis]
---

My notes on the article [Demystifying the Nvidia Ampere Architecture through Microbenchmarking and Instruction-level Analysis](https://arxiv.org/pdf/2208.11174). I prefer to use it as a datasheet. You can find:

- The relation between the number of instructions and the average cycles for `ADD.U32` instruction (This reveal the existence of addition hardware pipeline)
- The CPI for dependent and independent instructions
- The Tensor Cores Latencies and Throughput
- The memory accesses latencies
- Instructions Clock Cycles for the (Ampere A100) GPU

<!-- truncate -->

## Summary of Results and Conclusions

The paper demystifies the microarchitecture of the Nvidia Ampere A100 GPU by running low-level microbenchmarks to calculate the exact clock cycles required for various instructions, memory access latencies, and Tensor Core (TC) throughput. The authors discovered several critical insights regarding 

- how the compiler handles code, 
- how hardware dependencies affect performance, 
- and the exact clock cycle cost of operations.

### Key Findings on Instruction Latency & Pipeline Behavior

* **Dependency Penalty:** The latency of an instruction increases significantly if it depends on the output of a previous instruction. For example, a single-precision `add.f32` takes 4 cycles when dependent, but only 2 cycles when independent.


* **Pipeline Utilization:** The `mad` (multiply-add) instruction executes on the floating-point pipeline, even when used with integer values. The researchers proved this by running `add` and `mad` instructions simultaneously and observing that both executed in parallel without bottlenecking the integer pipeline.


* **Instruction Overheads:** Running a single instruction incurs a "first launch overhead." To get accurate measurements, the authors ran multiple independent instructions to find the true average cycles per instruction (CPI).


* **Compiler Translations (PTX to SASS):** Many PTX instructions map 1-to-1 to hardware SASS instructions, but complex math operations (like `div`, `sinf`, `cosf`) are broken down into multiple SASS instructions. Furthermore, signed and unsigned instructions generally execute in the same number of cycles and map identically, with few exceptions like `bfind`, `min`, and `max`.

### Key Findings on Memory Latency

* Ampere's **Global Memory** access latency is approximately 290 cycles (bypassing caches), which is a notable improvement over the Turing architecture's 434 cycles.


* **L2 Cache** latency is measured at 200 cycles, slightly slower than Turing's 188 cycles.


* **L1 Cache** latency remains fast and highly comparable to previous generations at 33 cycles.


* **Shared Memory** is slightly faster for store operations (19 cycles) than for load operations (23 cycles).

### Key Findings on Tensor Cores (TC)

* Ampere introduces broad support for new data types including FP64, U8, U4, and TF32, which require different underlying SASS instructions (e.g., `DMMA.884` for FP64, `IMMA.8832` for U4).


* Unlike older architectures where the matrix shape impacted latency, the Ampere architecture's latency is primarily tied to the data type rather than the shape of the matrix being computed.

## Extracted Data and Full Tables

Below are the complete tables detailing the exact measurements collected by the authors.

**Table 1: The relation between the number of instructions and the average cycles for ADD.U32 instruction** 

| # instrs | CPI |
| --- | --- |
| 1 | 5 |
| 2 | 3 |
| 3 | 2 |
| 4 | 2 |

**Table 2: The CPI for dependent and independent instructions** 

| Instruction | CPI for dependent | CPI for independent |
| --- | --- | --- |
| add.f16 | 3 | 2 |
| add.u32 | 4 | 2 |
| add.f64 | 5 | 4 |
| mul.lo.u32 | 3 | 2 |
| mad.rn.f32 | 4 | 2 |

**Table 3: The Tensor Cores Latencies and Throughput** 

| **Supported shapes**          | **Inputs** | **Accumulators** | **Cycles** | **Measured-theoretical** | **Instructions**                                             |
| ----------------------------- | ---------- | ---------------- | ---------- | ------------------------ | ------------------------------------------------------------ |
| m16n16k16, m8n32k16, m32n8k16 | f16        | f16              | 16         | 311-312 GB/s             | **PTX:** wmma.mma.sync.aligned.row.row.m16n16k16.f16.f16 **SASS:** 2 HMMA.16816.F16 - each inst. is 8 cycles |
| m16n16k16, m8n32k16, m32n8k16 | f16        | f32              | 16         | 310-312 GB/s             | **PTX:** wmma.mma.sync.aligned.row.row.m16n16k16.f16.f32 **SASS:** 2 HMMA.16816.F32 - each inst. is 8 cycles |
| m16n16k16, m8n32k16, m32n8k16 | bf16       | f32              | 16         | 310-312 GB/s             | **PTX:** wmma.mma.sync.aligned.row.row.m16n16k16.f32.bf16.bf16.f32 **SASS:** 2 HMMA.16816.F32.BF16 - each inst. is 8 cycles |
| m16n16k8                      | tf32       | f32              | 16         | 132-156 GB/s             | **PTX:** wmma.mma.sync.aligned.row.row.m16n16k8.f32.tf32.tf32.f32 **SASS:** 4 HMMA.1684.F32.TF32 - each inst. is 4 cycles |
| m8n8k4                        | f64        | f64              | 16         | 19-19.5 GB/s             | **PTX:** wmma.mma.sync.aligned.row.row.m8n8k4.f64.f64.f64.f64 **SASS:** 1 DMMA.884 - each inst. is 16 cycles |
| m16n16k16, m32n8k16, m8n32k16 | u8         | u32              | 8          | 594-624 GB/s             | **PTX:** wmma.mma.sync.aligned.row.row.m16n16k16.s32.u8.u8.s32 **SASS:** 2 IMMA.16816.U8.U8 - each inst. is 4 cycles |
| m8n8k32                       | u4         | u32              | 4          | 1229-1248 GB/s           | **PTX:** wmma.mma.sync.aligned.row.col.m8n8k32.s32.u4.u4.s32 **SASS:** 1 IMMA.8832.U4.U4 - each inst. is 4 cycles |

**Table 4: The memory accesses latencies** 

| Memory type | CPI (cycles) |
| --- | --- |
| Global memory | 290 |
| L2 cache | 200 |
| L1 cache | 33 |
| Shared Memory (ld/st) | (23/19) |

**Table 5: Instructions Clock Cycles for the (Ampere A100) GPU** 
*(Note: Consolidating the dual-column layout from the source into a single clear list for readability)*

| **PTX Instruction**         | **SASS Translation**                                    | **Cycles** |
| --------------------------- | ------------------------------------------------------- | ---------- |
| **Add/Sub Instructions**    |                                                         |            |
| add.u16                     | UIADD3                                                  | 2          |
| addc.u32                    | IADD3.X                                                 | 2          |
| add.u32                     | IADD                                                    | 2          |
| add.u64                     | UIADD3.X + UIADD3                                       | 4          |
| add.s64                     | UIADD3.X + UIADD3                                       | 4          |
| add.f16                     | HADD                                                    | 2          |
| add.f32                     | FADD                                                    | 2          |
| add.f64                     | DADD                                                    | 4          |
| **Mul Instructions**        |                                                         |            |
| mul.wide.u16                | LOP3.LUT + IMAD                                         | 4          |
| mul.wide.u32                | IMAD                                                    | 4          |
| mul.lo.u16                  | LOP3.LUT + IMAD                                         | 4          |
| mul.lo.u32                  | IMAD                                                    | 2          |
| mul.lo.u64                  | IMAD                                                    | 2          |
| mul24.lo.u32                | PRMT + IMAD                                             | 3          |
| mul24.hi.u32                | UPRMT + USHF.R.U32.HI + IMAD.U32 + PRMT                 | 9          |
| mul.rn.f16                  | HMUL2                                                   | 2          |
| mul.rn.f32                  | FMUL                                                    | 2          |
| mul.rn.f64                  | DMUL                                                    | 4          |
| **MAD Instructions**        |                                                         |            |
| mad.lo.u16                  | LOP3.LUT + IMAD                                         | 4          |
| mad.lo.u32                  | FFMA                                                    | 2          |
| mad.lo.u64                  | IMAD                                                    | 2          |
| mad24.lo.u32                | SGXT.U32 + IMAD                                         | 4          |
| mad24.hi.u32                | USHF.R.U32.HI + UIMAD.WIDE.U32 + 2*UPRMT + IADD3        | 11         |
| mad.rn.f32                  | FFMA                                                    | 2          |
| mad.rn.f64                  | DFMA                                                    | 4          |
| **Sad Instructions**        |                                                         |            |
| sad.u16/s16                 | (2 LOP3) + ULOP3 + VABSDIFF                             | 6          |
| sad.u32/s32                 | VABSDIFF + IMAD (1 IMAD + 1 Umov for 3 instrs)          | 3          |
| sad.u64/s64                 | UISETP.GE.U32.AND + UIADD + IADD                        | 10         |
| **Rem/Div Instructions**    |                                                         |            |
| rem/div.u16/s16             | multiple instructions                                   | 290        |
| rem/div.s32/u32             | multiple instructions                                   | 66         |
| rem/div.u64/s64             | multiple instructions                                   | 420        |
| div.rn.f32                  | multiple instructions                                   | 525        |
| div.rn.f64                  | multiple instructions                                   | 426        |
| **Abs Instructions**        |                                                         |            |
| abs.s16                     | PRMT + IABS + PRMT                                      | 4          |
| abs.s32                     | IABS                                                    | 2          |
| abs.s64                     | UISETP.LT.AND + UIADD3.X + UIADD3 + 2 USEL              | 11         |
| abs.f16                     | PRMT                                                    | 1          |
| abs.ftz.f32                 | FADD.FTZ                                                | 2          |
| abs.f64                     | DADD or (DADD+UMOV)                                     | 4          |
| **Brev Instructions**       |                                                         |            |
| brev.b32                    | BREV + SGXT.U32                                         | 2          |
| brev.b64                    | 2 UBREV + MOV                                           | 6          |
| **Copysign Instructions**   |                                                         |            |
| copysign.f32                | 2 LOP3.LUT or 1.5 LOP3.LUT                              | 4          |
| copysign.f64                | 2 ULOP3.LUT + IMAD.U32 + MOV                            | 6          |
| **And/Or/Xor Instructions** |                                                         |            |
| and.b16                     | LOP3.LUT or 1.5 LOP3.LUT                                | 2          |
| and.b32                     | LOP3.LUT                                                | 2          |
| and.b64                     | ULOP3.LUT                                               | 2-3        |
| **Not Instructions**        |                                                         |            |
| not.b16                     | LOP3.LUT                                                | 2          |
| not.b32                     | LOP3.LUT                                                | 2          |
| not.b64                     | 2 ULOP3.LUT                                             | 4          |
| **Lop3 Instructions**       |                                                         |            |
| lop3.b32                    | IMAD.MOV.U32 + LOP3.LUT                                 | 4          |
| **Cnot Instructions**       |                                                         |            |
| cnot.b16 / cnot.b32         | ULOP3.LUT+ISETP.EQ.U32.AND+SEL / UISETP.EQ.U32.AND+USEL | 5 / 4      |
| cnot.b64                    | multiple instructions                                   | 11         |
| **Bfe Instructions**        |                                                         |            |
| bfe.s32/.u32                | 3*PRMT + 2 IMAD.MOV + SHF.R.U32.HI + SGXT/.U32          | 11         |
| bfe.u64                     | UMOV + USHF.L.U32 + (UIADD3 + ULOP3.LUT)                | 5          |
| bfe.s64                     | multiple instructions                                   | 14         |
| **Min/Max Instructions**    |                                                         |            |
| min.u16                     | ULOP3.LUT + UISETPLT.U32.AND + USEL                     | 8          |
| min.u32                     | IMNMX.U32                                               | 2          |
| min.u64                     | UISETP.LT.U32.AND + 2*USEL                              | 8          |
| min.s16                     | PRMT + IMNMX                                            | 4          |
| min.s32                     | IMNMX                                                   | 2          |
| min.s64                     | UISETPLT.U32.AND + UISETP.LT.AND.EX + 2 USEL            | 8          |
| min.f16                     | HMNMX2 + PRMT                                           | 4          |
| min.f32                     | FMNMX                                                   | 2          |
| min.f64                     | DSETP.MIN.AND + IMAD.MOV.U32 + UMOV + FSEL              | 10         |
| **Neg Instructions**        |                                                         |            |
| neg.s16                     | UIADD3 + UPRMT                                          | 5          |
| neg.s32                     | IADD3                                                   | 2          |
| neg.s64                     | IMAD.MOV.U32 + HFMA2.MMA + MOV + UIADD3                 | 10         |
| neg.f32                     | FADD or IMAD.MOV.U32                                    | 2          |
| neg.f64                     | DADD + (UMOV)                                           | 4          |
| **FMA Instructions**        |                                                         |            |
| fma.rn.f16                  | HFMA2                                                   | 2          |
| fma.rn.f32                  | FFMA                                                    | 2          |
| fma.rn.f64                  | DFMA                                                    | 4          |
| **Sqrt Instructions**       |                                                         |            |
| sqrt.rn.f32                 | [multiple instrs including MUFU.RSQ]                    | 190-235    |
| sqrt.approx.f32             | [multiple instrs including MUFU.SQRT]                   | 2-18       |
| sqrt.rn.f64                 | [multiple instrs including MUFU.RSQ64]                  | 260-340    |
| **Rsqrt Instructions**      |                                                         |            |
| rsqrt.approx.f32            | [multiple instrs including MUFU.RSQ]                    | 2-18       |
| rsqrt.approx.f64            | MUFU.RSQ64H                                             | 8-11       |
| **Rcp Instructions**        |                                                         |            |
| rcp.rn.f32                  | [multiple instrs including MUFU.RCP]                    | 198        |
| rcp.approx.f32              | [multiple instrs including MUFU.RCP]                    | 23         |
| rcp.rn.f64                  | [multiple instrs including MUFU.RCP64H]                 | 244        |
| **Pop Instructions**        |                                                         |            |
| popc.b32                    | POPC                                                    | 6          |
| popc.b64                    | 2 UPOPC + UIADD3                                        | 7          |
| **Clz Instructions**        |                                                         |            |
| clz.b32                     | FLO.U32 + IADD                                          | 7          |
| clz.b64                     | UISETP.NE.U32.AND + USEL + UFLO.U32 + 2 UIADD3          | 13         |
| **Bfind Instructions**      |                                                         |            |
| bfind.u32                   | FLO.U32                                                 | 6          |
| bfind.u64                   | FLO.U32 + ISETP.NE.U32.AND + IADD3 + BRA                | 164        |
| bfind.s32                   | FLO                                                     | 6          |
| bfind.s64                   | multiple instructions                                   | 195        |
| **Testp Instructions**      |                                                         |            |
| testp.normal.f32            | IMAD.MOV.U32 + 2*ISETP.GE.U32.AND                       | 0 or 6     |
| testp.subnor.f32            | ISETP.LT.U32.AND                                        | 0 or 6     |
| testp.normal.f64            | 2 UISETP.LE.U32.AND + 2 UISETP.GE.U32.AND               | 13         |
| testp.subnor.f64            | UISETP.LT.U32.AND + 2 UISETP.GE.U32.AND.EX              | 8          |
| **Other Instructions**      |                                                         |            |
| sin.approx.f32              | FMUL + MUFU.SIN                                         | 8          |
| cos.approx.f32              | FMUL.RZ + MUFU.COS                                      | 8          |
| lg2.approx.f32              | FSETP.GEU.AND + FMUL + MUFU.LG2 + FADD                  | 18         |
| ex2.approx.f32              | FSTEP + FMUL + MUFU.EX2 + FMUL                          | 14         |
| ex2.approx.f16              | MUFU.EX2.F16                                            | 6          |
| tanh.approx.f32             | MUFU.TANH                                               | 6          |
| tanh.approx.f16             | MUFU.TANH.F16                                           | 6          |
| bar.warp.sync               | NOP                                                     | changes    |
| fns.b32                     | multiple instructions                                   | 79         |
| cvt.rzi.s32.f32             | F2I.TRUNC.NTZ                                           | 6          |
| setp.ne.s32                 | ISETP.NE.AND                                            | 10         |
| mov.u32 clock               | CS2R.32                                                 | 2          |
| **Bfi Instructions**        |                                                         |            |
| bfi.b32                     | 3 PRMT + 2 IMAD.MOV + SHF.L.U32 + BMSK + LOP3.LUT       | 11         |
| bfi.b64                     | UMOV + USHFL.U32 + (UIADD3 + ULOP3.LUT)                 | 5          |
| **dp4a/dp2a Instructions**  |                                                         |            |
| dp4a.u32.u32                | IMAD.MOV.U32 + IDP.4A.U8.U8                             | 135-170    |
| dp2a.lo.u32.u32             | IMAD.MOV.U32 + IDP.2A.LO.U16.U8                         | 135-170    |