---
id: turing
title: "Turing Architecture (SM 7.5)"
sidebar_position: 1
---

# Turing Architecture (SM 7.5)

> **Products:** RTX 20-series (TU102/104/106), Quadro RTX, Tesla T4  
> **Compute Capability:** 7.5  
> **Released:** 2018

## Overview and Design Goals

TODO: Summarize Turing's dual mandate — real-time ray tracing (RT Cores) and deep learning inference (Tensor Cores gen 2). Position it relative to Volta.

## Streaming Multiprocessor (SM) Architecture

### SM Count and Compute Throughput

TODO: Insert SM counts for TU102 (72 SMs), TU104 (48 SMs), TU106 (36 SMs). Insert FP32, FP16, INT8, INT4 throughput numbers.

### Second-Generation Tensor Cores

TODO: Explain the Turing Tensor Core improvements: added INT8 (2048 INT8 ops/clock/SM) and INT4 (4096 INT4 ops/clock/SM) support. Still FP16 for training paths.

### The Independent Integer Datapath

TODO: Explain that Turing adds a dedicated INT32 execution path running in parallel with FP32, enabling concurrent int/float operations.

## RT Cores (Ray Tracing Acceleration)

TODO: Explain the RT Core's function — BVH traversal and ray-triangle intersection offloaded from shader units. Note: relevant for graphics, not typical CUDA compute.

## Memory Subsystem

### L1/Shared Memory

TODO: Insert L1 + shared memory capacity per SM (96 KB unified, configurable).

### L2 Cache

TODO: Insert L2 capacity (6 MB for TU102) and bandwidth.

### GDDR6 Memory

TODO: Insert GDDR6 bandwidth (~616 GB/s for RTX 2080 Ti) and capacity.

## Key Kernel Optimization Considerations for Turing

TODO: Note the importance of INT8/INT4 Tensor Cores for inference workloads, the independent integer pipe for index computations, and GDDR6 coalescing implications vs. HBM2.

## Nsight Compute: Turing-Specific Metrics

TODO: List Turing-specific counter names and any metrics that differ from Volta.
