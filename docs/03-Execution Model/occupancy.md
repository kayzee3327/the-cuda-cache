---
id: occupancy-model
title: "Occupancy: The Full Model"
sidebar_position: 3
draft: true
---

# Occupancy: The Full Model

## Defining Occupancy

TODO: Define occupancy as active warps / maximum warps per SM. Distinguish between theoretical and achieved occupancy.

## The Three Resource Limiters

TODO: Explain that occupancy is limited by whichever of these three runs out first: registers per thread, shared memory per block, and threads/blocks per SM.

### Register Limiter

TODO: Show the formula: `floor(max_regs_per_sm / (regs_per_thread * 32))` and walk through an example.

### Shared Memory Limiter

TODO: Show the formula and walk through an example with a tile-based GEMM kernel.

### Block Size Limiter

TODO: Explain the max blocks/SM hardware limit and how small block sizes can cap occupancy independent of register/SMEM use.

## The CUDA Occupancy Calculator

TODO: Walk through using `cudaOccupancyMaxActiveBlocksPerMultiprocessor` at runtime and the spreadsheet calculator.

## Why 100% Occupancy Is Not Always Optimal

TODO: Explain the occupancy-ILP-register pressure trade-off. High occupancy kernels often spill registers; lower occupancy with more ILP can be faster. Cite examples.

## Occupancy in Nsight Compute

TODO: Explain the Occupancy section of the Nsight Compute report and which metrics to focus on (`sm__warps_active.avg.pct_of_peak_sustained_active`).
