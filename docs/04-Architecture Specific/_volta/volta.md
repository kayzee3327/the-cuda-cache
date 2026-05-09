---
id: volta
title: "Volta Architecture (SM 7.0)"
sidebar_position: 1
---

# Volta Architecture (SM 7.0)

> **Products:** Tesla V100 (GV100), Titan V  
> **Compute Capability:** 7.0  
> **Released:** 2017

## Overview and Design Goals

TODO: Summarize Volta's position — the first HPC-focused Tensor Core architecture, the shift to Independent Thread Scheduling, and the HBM2 memory subsystem.

## Streaming Multiprocessor (SM) Architecture

### SM Count and Compute Throughput

TODO: Insert SM count for GV100 (80 SMs). Insert peak FP64, FP32, FP16, and INT8 TOPS/TFLOPS.

### Sub-Partition Layout

TODO: Describe the 4 sub-partitions per SM. Each sub-partition: 1 warp scheduler, 1 dispatch unit, 16 FP32 CUDA cores, 8 FP64 cores, 8 INT32 cores, 2 Tensor Cores (first generation), 8 LD/ST units, 4 SFUs.

### First-Generation Tensor Cores

TODO: Explain the Volta Tensor Core operation: 4×4×4 matrix multiply-accumulate (D = A*B + C) in FP16 with FP32 accumulation. Throughput: 8 ops/clock/TC.

## Independent Thread Scheduling

TODO: This is Volta's defining architectural change. Explain how each thread now has its own program counter and call stack, enabling divergent threads to reconverge at a finer granularity. Contrast with the pre-Volta "lock-step" warp behavior.

### Implications for `__syncwarp()`

TODO: Explain why code that relied on implicit warp synchrony (pre-Volta) can be silently incorrect on Volta+, and how `__syncwarp()` and `cooperative_groups` solve this.

## Memory Subsystem

### L1/Shared Memory

TODO: Insert L1 + shared memory capacity per SM (128 KB unified, configurable: 0/8/16/32/64/96 KB shared + remainder L1).

### L2 Cache

TODO: Insert L2 capacity (6 MB for GV100) and bandwidth.

### HBM2 Memory

TODO: Insert HBM2 bandwidth (900 GB/s for V100 SXM2), capacity (16 GB / 32 GB variants), and bus width (4096-bit).

## NVLink 2.0

TODO: Explain NVLink 2.0 topology (up to 6 links, 300 GB/s bidirectional per GPU), use in DGX-1V systems, and why peer-to-peer bandwidth matters for multi-GPU training.

## Key Kernel Optimization Considerations for Volta

TODO: Summarize the top 3–5 optimization insights specific to Volta — e.g., favoring HMMA (Tensor Core WMMA API), avoiding warp-sync assumptions, L1 tuning for bandwidth vs. latency.

## Nsight Compute: Volta-Specific Metrics

TODO: List key Nsight Compute metrics and their Volta-specific counter names.
