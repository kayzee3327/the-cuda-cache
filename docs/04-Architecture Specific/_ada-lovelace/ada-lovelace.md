---
id: ada-lovelace
title: "Ada Lovelace Architecture (SM 8.9)"
sidebar_position: 1
---

# Ada Lovelace Architecture (SM 8.9)

> **Products:** RTX 40-series (AD102/103/104), RTX 6000 Ada, L4, L40S  
> **Compute Capability:** 8.9  
> **Released:** 2022

## Overview and Design Goals

TODO: Summarize Ada as the consumer/pro successor to Ampere (GA102 line). Key advances: 4th-gen Tensor Cores with FP8 support, 3rd-gen RT Cores, and the Shader Execution Reordering (SER) feature. Larger L2 cache.

## Streaming Multiprocessor (SM) Architecture

### SM Count and Compute Throughput

TODO: Insert SM counts for AD102 (144 SMs for RTX 4090), AD103, AD104. Insert FP32, FP16, BF16, FP8, INT8 throughput numbers.

### Fourth-Generation Tensor Cores and FP8

TODO: Explain Ada's FP8 Tensor Core support (E4M3 and E5M2 formats). Insert throughput. Explain how FP8 enables ~2× the throughput of FP16/BF16 for inference workloads.

### Shader Execution Reordering (SER)

TODO: Explain SER as a hardware mechanism to reorder divergent shader invocations into more coherent groups, improving cache efficiency in ray tracing. Note relevance for any compute workload with data-dependent branching.

## Memory Subsystem

### L1 / Shared Memory Per SM

TODO: Insert Ada's L1 + SMEM configuration (128 KB per SM, same structure as Ampere GA102).

### L2 Cache

TODO: Insert the dramatically increased L2 cache: AD102 has 96 MB L2 (vs. 6 MB in GA102). Explain the performance implications for working sets that fit in L2.

### GDDR6X Memory

TODO: Insert bandwidth and capacity for RTX 4090 (1008 GB/s, 24 GB) and other Ada variants.

## Key Kernel Optimization Considerations for Ada

TODO: Highlight the large L2 as a game-changer for many AI inference workloads. FP8 Tensor Core path. Note that `cp.async` and software pipelining from Ampere carry over fully.

## Nsight Compute: Ada-Specific Metrics

TODO: List any counter name changes or new sections introduced for Ada.
