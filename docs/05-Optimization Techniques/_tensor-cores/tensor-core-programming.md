---
id: tensor-core-programming
title: Tensor Core Programming
sidebar_position: 1
---

# Tensor Core Programming

## The Three Levels of Tensor Core Access

TODO: Explain the abstraction hierarchy:
1. **Library level** — cuBLAS, cuDNN, FlashAttention. Easiest, fully optimized.
2. **WMMA API** — `nvcuda::wmma`. Per-warp matrix fragments in CUDA C++. Portable across Volta+.
3. **PTX `mma`/`wgmma`** — Direct instruction access. Maximum control, architecture-specific.

## WMMA API: Warp-Level Matrix Multiply

TODO: Explain the WMMA programming model: each warp cooperatively holds `fragment` objects that represent tiles of A, B, and C matrices. The data layout within fragments is opaque.

### Supported Tile Sizes and Precisions

TODO: Insert table of WMMA tile configurations (e.g., 16×16×16 FP16, 16×16×16 BF16, 8×16×16 TF32, 8×32×16 INT8, etc.) and the architectures that support each.

### Loading Fragments from Shared Memory

TODO: Explain `wmma::load_matrix_sync` and the layout requirements (row-major vs col-major). Emphasize the need for conflict-free shared memory layout (see the bank conflicts page).

### Executing MMA and Storing Results

TODO: Show `wmma::mma_sync` and `wmma::store_matrix_sync`. Walk through a complete WMMA GEMM tile.

```cpp
// TODO: Insert annotated WMMA kernel skeleton (16×16×16 FP16 GEMM tile)
```

## PTX `mma` Instruction (Volta/Turing/Ampere)

TODO: Explain the PTX `mma.sync.aligned.m16n8k16.row.col.f32.f16.f16.f32` instruction syntax. Explain operand registers and why this is warp-synchronous.

## PTX `wgmma` Instruction (Hopper+)

TODO: Explain `wgmma.mma_async.sync.aligned` — operates over an entire warp group (128 threads). D matrix stays in registers across the warp group; A and B come from shared memory (or registers for some configs).

## Occupancy and Tensor Core Utilization

TODO: Explain that Tensor Core pipelines have their own utilization metrics distinct from CUDA core pipelines. Show how to read `sm__inst_executed_pipe_tensor_op_hmma.avg.pct_of_peak_sustained_active` in Nsight Compute.

## CUTLASS as the Reference Implementation

TODO: Point to CUTLASS 3.x as the canonical open-source implementation of Tensor Core GEMMs. Explain CuTe layout algebra, the `MMA_Atom` abstraction, and how to use CUTLASS's profiler to establish a performance baseline before writing custom kernels.
