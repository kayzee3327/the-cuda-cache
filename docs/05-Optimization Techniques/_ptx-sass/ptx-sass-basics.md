---
id: ptx-sass-basics
title: "PTX & SASS: Reading the Assembly"
sidebar_position: 1
draft: true
---

# PTX & SASS: Reading the Assembly

## The CUDA Compilation Pipeline

TODO: Diagram the full pipeline: CUDA C++ → PTX (virtual ISA, forward-compatible) → SASS (actual hardware ISA, architecture-specific). Explain the role of `nvcc`, `ptxas`, and `cuobjdump`.

## Extracting PTX from a Compiled Binary

TODO: Show commands:
```bash
# TODO: Insert nvcc flags to emit PTX
nvcc -ptx kernel.cu -o kernel.ptx

# TODO: Extracting embedded PTX from a .cubin / .fatbin
cuobjdump --dump-ptx my_binary
```

## Extracting SASS

TODO: Show:
```bash
cuobjdump --dump-sass my_binary
# or via Nsight Compute's Source page (SASS view)
```

## Reading PTX: Key Instruction Classes

TODO: Walk through the most common PTX instruction types:
- `ld.global` / `ld.shared` / `st.*` — load/store with cache qualifiers
- `fma.rn.f32` / `fma.rn.f16` — fused multiply-add
- `mma.sync.*` — Tensor Core matrix multiply
- `cp.async.*` — async copy (Ampere+)
- `bar.sync` / `membar.*` — barriers and fences
- `shfl.sync.*` — warp shuffle
- `atom.*` — atomic operations

## Reading SASS: Key Differences from PTX

TODO: Explain that SASS has a fixed instruction encoding with explicit latency information (stall counts) visible in the disassembly. Show how to read the `[!------:B------:R-:W-:-:S06]` style stall annotations in Ampere/Ada SASS.

## Finding Bottlenecks in SASS

### Identifying Long-Latency Instructions

TODO: Explain how stall cycles encoded in SASS show where the scheduler is waiting. High stall counts on `LDG` instructions = memory bottleneck.

### Identifying Register Reuse

TODO: Explain the `reuse` flag in SASS register operands (visible as `.reuse` suffix) and how it indicates operand caching in the register file to reduce read bandwidth.

## Controlling Compilation for Better Assembly

TODO: Cover `-O3`, `--use_fast_math`, `-lineinfo`, `--keep` (to keep PTX), `-maxrregcount`, and `__launch_bounds__`. Explain the trade-offs.

## Nsight Compute Source View: PTX and SASS Correlation

TODO: Explain how Nsight Compute's Source page correlates your CUDA C++ source → PTX → SASS, and how to use it to identify which source lines generate the most stalled instructions.
