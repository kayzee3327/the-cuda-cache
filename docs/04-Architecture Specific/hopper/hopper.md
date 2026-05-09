---
id: hopper
title: "Hopper Architecture (SM 9.0)"
sidebar_position: 1
draft: true
---

# Hopper Architecture (SM 9.0)

> **Products:** H100 (GH100), H200  
> **Compute Capability:** 9.0  
> **Released:** 2022 (H100), 2024 (H200)

## Overview and Design Goals

TODO: Describe Hopper as the data center architecture that introduced the Transformer Engine, wgmma/TMA primitives, and the NVLink 4.0 / NVSwitch 3.0 fabric. The primary target is LLM training and inference at scale.

## Streaming Multiprocessor (SM) Architecture

### SM Count and Compute Throughput

TODO: Insert SM count for GH100 (132 SMs, H100 SXM5 uses 132). Insert peak throughput table including FP8, FP16, BF16, TF32, FP32, FP64.

### Fourth-Generation Tensor Cores with `wgmma`

TODO: Explain `wgmma` (warp-group matrix multiply accumulate) — the new hardware instruction that operates across an entire warp group (4 warps = 128 threads). Contrast with Ampere's `mma` which operates per-warp.

### The Transformer Engine

TODO: Explain the Transformer Engine as the combination of FP8 Tensor Cores with a dynamic scaling system (per-tensor scale factors) managed by the `transformer_engine` library. Cover the E4M3 and E5M2 formats and when each is preferred.

## Tensor Memory Accelerator (TMA)

TODO: TMA is Hopper's hardware replacement for `cp.async` and is the primary way to load tiles for `wgmma`.

### TMA Descriptors

TODO: Explain TMA descriptors — compile-time metadata objects that encode the global tensor shape, strides, and swizzle mode. Show how to construct a `CUtensorMap` using `cuTensorMapEncodeTiled`.

### TMA Load and Store Operations

TODO: Explain `cp.async.bulk.tensor` (TMA load) and `cp.async.bulk.tensor.reduce` (TMA store). Cover the single-thread-issues-for-entire-warp semantics and the fence required before use.

### TMA and Asynchronous Pipelines

TODO: Explain the `mbarrier` (memory barrier) that replaces `cp.async_wait_group` for TMA-based pipelines. Show the producer-consumer model.

## Distributed Shared Memory (DSMEM)

TODO: Explain DSMEM — the ability for SMs in the same GPC to directly read/write each other's shared memory via a low-latency interconnect. Cover `cluster_size` and `__cluster_barrier_arrive/wait`.

## Thread Block Clusters

TODO: Explain the new hierarchy level above blocks and below grids. A cluster is a group of up to 16 thread blocks that share the DSMEM interconnect and have access to cluster-level synchronization.

## Memory Subsystem

### L1 / Shared Memory Per SM

TODO: Insert Hopper SMEM per SM (228 KB on GH100).

### L2 Cache

TODO: Insert L2 capacity (50 MB for GH100).

### HBM3 / HBM3e Memory

TODO: Insert bandwidth: H100 SXM5 (3.35 TB/s HBM3), H200 SXM (4.8 TB/s HBM3e). Insert capacity (80 GB / 141 GB).

## NVLink 4.0 and NVSwitch 3.0

TODO: Explain NVLink 4.0 (900 GB/s bidirectional per GPU), NVSwitch 3.0 fabric, and the DGX H100 all-to-all topology. Compare to Ampere NVLink 3.0.

## Key Kernel Optimization Considerations for Hopper

TODO: Enumerate the Hopper-specific optimizations:
1. Migrate from `cp.async` + `mma` to TMA + `wgmma` for matrix kernels.
2. Use thread block clusters and DSMEM for reduction/communication patterns.
3. Use FP8 Transformer Engine for LLM attention and FFN layers.
4. Exploit the 228 KB SMEM for multi-stage pipelines.
5. Understand `mbarrier` semantics to avoid deadlock in producer-consumer pipelines.

## CUTLASS 3.x and the Hopper Programming Model

TODO: Explain how CUTLASS 3.x was redesigned around the Hopper programming model (CuTe layout algebra, `wgmma` pipeline abstraction) and why hand-writing Hopper kernels without it is extremely difficult.

## Nsight Compute: Hopper-Specific Sections

TODO: Cover new Nsight Compute sections for TMA utilization, `wgmma` pipe utilization, cluster-level metrics, and the new stall reasons.
