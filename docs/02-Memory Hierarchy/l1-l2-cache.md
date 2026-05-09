---
id: l1-l2-cache
title: L1 & L2 Cache Architecture
sidebar_position: 5
draft: true
---

# L1 & L2 Cache Architecture

## L1 Cache (TEX Cache / Unified L1)

TODO: Explain how the L1 and texture cache were unified in Volta. Insert capacity per SM for each architecture generation.

### L1 Cache Line Size

TODO: Insert cache line sizes (128 bytes for global loads) and how this interacts with coalescing.

### L1 Hit Latency

TODO: Insert hit latency in cycles for Volta, Ampere, Ada, and Hopper.

## L2 Cache

TODO: Explain L2 as the last on-chip cache before DRAM. Insert L2 capacity for each architecture generation.

### L2 Cache Line Size

TODO: Insert L2 cache line sizes and explain sector-based access patterns.

### L2 Bandwidth and Latency

TODO: Insert L2 bandwidth (GB/s) and hit latency (cycles) per architecture.

## Cache Control Qualifiers

TODO: Explain `.ca`, `.cg`, `.cs`, `.cv`, `.lu`, `.wb`, `.wt` PTX cache qualifiers and the CUDA intrinsics that expose them (`__ldg`, `__cachewriteback`, etc.).

## The Texture Cache

TODO: Explain the texture cache's spatial locality optimization, its read-only nature for regular kernels, and how to use `__ldg()` or `const __restrict__` to route loads through it.
