---
id: occupancy-optimization
title: Occupancy Optimization
sidebar_position: 1
draft: true
---

# Occupancy Optimization

## Measuring Current Occupancy

TODO: Explain how to read achieved occupancy in Nsight Compute (`sm__warps_active.avg.pct_of_peak_sustained_active`). Distinguish from theoretical occupancy reported by the compiler.

## Finding the Occupancy Bottleneck

TODO: Walk through the decision tree: check the "Occupancy" section in Nsight Compute, identify whether the limiter is registers, shared memory, or block size.

## Register Reduction Strategies

TODO: Techniques to reduce register count: variable reuse, `__launch_bounds__`, splitting kernels, using shared memory as a register overflow buffer deliberately.

## Shared Memory Reduction Strategies

TODO: Using smaller tile sizes, exploiting the L1/SMEM split, and when tiling small enough to not help (compute-bound kernels).

## Block Size Selection

TODO: Rules for choosing block size: multiples of 32 (warp size), target at least 2 blocks/SM for latency hiding, benchmark empirically with the CUDA occupancy calculator.

## When to Accept Low Occupancy

TODO: Explain ILP as an alternative to occupancy for hiding latency. High-register, low-occupancy kernels with many independent instructions can outperform high-occupancy kernels. Cite cuBLAS GEMM as the canonical example.
