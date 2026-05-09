---
id: ampere
title: "Ampere Architecture (SM 8.0 / 8.6 / 8.7)"
sidebar_position: 1
draft: true
---

# Ampere Architecture (SM 8.0 / 8.6 / 8.7)

> **Products:** A100 (GA100, SM 8.0), RTX 30-series (GA102/104, SM 8.6), A10/A30/A40 (SM 8.6), Jetson Orin (SM 8.7)  
> **Compute Capability:** 8.0 (data center), 8.6 (consumer/pro), 8.7 (embedded)  
> **Released:** 2020

## Overview and Design Goals

TODO: Describe Ampere's scope — from the HPC A100 with its 3rd-gen NVLink and MIG to the mainstream GA102. Highlight the three headline features: 3rd-gen Tensor Cores, `cp.async` / async copy pipelines, and the L2 residence control API.

---

## Streaming Multiprocessor (SM) Architecture

### SM Count and Compute Throughput

TODO: Insert SM count for GA100 (108 SMs, but A100 SKU uses 108 enabled), GA102 (84 SMs for RTX 3090).  
TODO: Insert peak throughput table:

| Precision | A100 (SXM4) | RTX 3090 |
|-----------|-------------|----------|
| FP64      | TODO TFLOPS | TODO TFLOPS |
| FP32      | TODO TFLOPS | TODO TFLOPS |
| TF32      | TODO TOPS   | TODO TOPS   |
| FP16      | TODO TOPS   | TODO TOPS   |
| BF16      | TODO TOPS   | TODO TOPS   |
| INT8      | TODO TOPS   | TODO TOPS   |
| INT4      | TODO TOPS   | N/A         |

### Sub-Partition Layout

TODO: Describe Ampere's sub-partition structure. GA100 SM: 4 sub-partitions, each with 1 warp scheduler, 16 FP32 cores, 16 INT32 cores, 1 FP64 core cluster, 1 3rd-gen Tensor Core, 8 LD/ST units, 4 SFUs.

### Concurrent INT32 and FP32 Execution

TODO: This is a key Ampere optimization opportunity. The INT32 pipe now runs fully concurrently with the FP32 pipe (GA100 has a dedicated FP64 path too). Explain how this enables overlap of address computations with floating-point arithmetic. Show a simple PTX-level example of interleaved `imad` and `fmad` instructions.

### Third-Generation Tensor Cores

TODO: Ampere Tensor Cores introduce TF32 (19-bit, same range as FP32, 10-bit mantissa) and BF16 support in addition to FP16. Also adds structured sparsity (2:4 sparsity) support.

#### TF32 Mode

TODO: Explain TF32 as a "drop-in" FP32 Tensor Core path with minimal precision loss. Insert throughput numbers. Explain how `--allow-tf32` enables it transparently in cuBLAS/cuDNN.

#### BF16 Tensor Cores

TODO: Explain BF16's advantage over FP16 for training (larger dynamic range, no need for loss scaling). Insert throughput.

#### Structured Sparsity (2:4 Sparsity)

TODO: Explain the 2:4 sparsity format — exactly 2 out of every 4 consecutive values are non-zero, stored compressed with a metadata bitmask. The Tensor Core can execute 2× the operations on sparse matrices vs dense at the same theoretical FLOPS. Cover `cusparseLt`.

---

## Memory Subsystem

### L1 / Shared Memory Per SM

TODO: Insert L1 + shared memory configuration. GA100: 192 KB per SM (can be split as 0/8/16/32/64/100/132/164/192 KB shared + remainder L1). This is a significant increase from Volta's 128 KB.

### `cp.async`: Asynchronous Global-to-Shared Copy

TODO: This is Ampere's most impactful kernel optimization primitive for memory-bound kernels.

#### How `cp.async` Works

TODO: Explain that `cp.async` (PTX: `cp.async.ca.shared.global` / `cp.async.cg.shared.global`) initiates a DMA transfer directly from global memory into shared memory, bypassing the register file. The warp can continue executing other instructions while the copy is in flight.

#### Software Pipelining with `cp.async`

TODO: Walk through the double-buffering / multi-stage pipeline pattern: allocate 2× (or more) tiles in shared memory, issue `cp.async` for the next tile while computing on the current tile, call `cp.async_wait_group` to synchronize at the boundary.

```cpp
// TODO: Insert annotated double-buffering kernel skeleton here
// Stage 0: prefetch tile[0] with cp.async
// Compute Loop:
//   - Issue cp.async for tile[i+1]
//   - __pipeline_wait_prior(1)  // wait for tile[i] to be ready
//   - Compute on tile[i] in smem
// Drain: compute on last prefetched tile
```

#### `__pipeline_memcpy_async` (CUDA C++ Wrapper)

TODO: Show the high-level `cuda::pipeline` API that wraps `cp.async` without dropping to PTX.

### L2 Cache

TODO: Insert L2 capacity: GA100 has 40 MB (A100), GA102 has 6 MB (RTX 3090).

#### L2 Residence Control API (Ampere+)

TODO: Explain `cudaStreamAttrValue` with `accessPolicyWindow` — allows the programmer to designate a byte range in global memory as "persisting" in L2, preventing eviction by streaming accesses. Show a code snippet.

```cpp
// TODO: Insert cudaStreamSetAttribute example for L2 residence control
```

### HBM2e Memory (A100)

TODO: Insert HBM2e bandwidth for A100 SXM4 (2 TB/s), capacity (40 GB / 80 GB), bus width (5120-bit).

### GDDR6X Memory (RTX 30-series)

TODO: Insert GDDR6X bandwidth for RTX 3090 (~936 GB/s effective), capacity (24 GB), and explain the PAM4 signaling advantage over standard GDDR6.

---

## Multi-Instance GPU (MIG) — GA100 Only

TODO: Explain MIG as a hardware-enforced GPU partitioning feature — up to 7 independent GPU instances (GI) on A100, each with isolated SMs, L2 slices, HBM slices, and NVLink bandwidth. Covers use cases: multi-tenant inference, QoS isolation.

### MIG Slice Sizes

TODO: Insert the 7 available instance profiles for A100 80GB (e.g., 1g.10gb, 2g.20gb, 3g.40gb, 7g.80gb).

---

## NVLink 3.0 and NVSwitch

TODO: Explain NVLink 3.0 (600 GB/s bidirectional per GPU), NVSwitch-based all-to-all topology in DGX A100 (8 GPUs, NVSwitch fabric), and how this enables near-linear all-reduce scaling.

---

## Key Kernel Optimization Considerations for Ampere

TODO: Enumerate the top optimization strategies unique to or greatly improved in Ampere:
1. Use `cp.async` + software pipelining to hide global memory latency.
2. Use TF32 Tensor Cores for FP32-equivalent training.
3. Use BF16 Tensor Cores for mixed-precision training.
4. Use structured sparsity for inference if weight magnitude allows.
5. Use L2 persistence API for streaming kernels with hot working sets.
6. Exploit concurrent INT32+FP32 for address-computation overlap.
7. Take advantage of the 192 KB SMEM per SM for larger tiles.

---

## Nsight Compute: Ampere-Specific Sections and Metrics

### Async Copy Section

TODO: Explain the `L1TEX` and `MIO Throttle` stalls as relevant indicators for `cp.async` effectiveness. Insert counter names.

### Tensor Core Utilization

TODO: Insert metric names: `sm__inst_executed_pipe_tensor_op_hmma.avg`, `sm__inst_executed_pipe_tensor_op_imma.avg`.

### L2 Persistence Metrics

TODO: Insert counter names for L2 hit rate and eviction policy effectiveness.
