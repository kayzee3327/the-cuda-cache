---
id: registers
title: Register File
sidebar_position: 2
draft: true
---

# Register File

## Register File Size Per SM

TODO: Insert register file size (in 32-bit registers) per SM for each architecture (Volta: 64K, Ampere: 64K, Hopper: 64K — verify and expand).

## Register Pressure and Occupancy

TODO: Explain how the number of registers per thread directly limits the number of resident warps per SM (the occupancy calculation).

## Compiler Directives: `__launch_bounds__` and `maxrregcount`

TODO: Show how to guide the compiler's register allocation with `__launch_bounds__` and the `-maxrregcount` nvcc flag, with trade-off analysis.

## Register Spilling to Local Memory

TODO: Explain what happens when a thread needs more registers than available, the latency cost of local memory spills, and how to detect spilling in Nsight Compute.

## 64-bit vs 32-bit Register Usage

TODO: Explain how 64-bit (double-precision) operands consume register pairs and the implication for mixed-precision kernels.
