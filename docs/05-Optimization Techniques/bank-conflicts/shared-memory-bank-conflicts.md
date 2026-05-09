---
id: shared-memory-bank-conflicts
title: Shared Memory Bank Conflicts
sidebar_position: 1
draft: true
---

# Shared Memory Bank Conflicts

## What Are Bank Conflicts?

TODO: Define a bank conflict as two or more threads within the same warp simultaneously requesting data from the same bank (but different addresses within that bank), forcing the hardware to serialize the accesses.

## The 32-Bank Architecture

TODO: Explain the physical organization: shared memory is divided into 32 banks, each 4 bytes wide (32-bit bank mode, the default). The bank index for a 4-byte word at byte offset `B` is `(B / 4) % 32`.

### 32-bit vs 64-bit Bank Mode

TODO: Explain `cudaSharedMemConfig` — `cudaSharedMemBankSizeFourByte` (default) vs. `cudaSharedMemBankSizeEightByte`. The 8-byte mode doubles effective bank width, eliminating conflicts for 8-byte (double) accesses at stride-2, but halves the number of logical banks.

## Conflict Degrees: 2-Way, 4-Way, N-Way

TODO: Explain that an N-way conflict means N threads in the same warp hit the same bank, causing N serialized memory operations and an N× latency penalty. A 32-way conflict is the worst case.

## The Broadcast Exception

TODO: Explain the important exception: if **all** threads in a warp read the **same address** within the same bank, the hardware broadcasts the value and no conflict occurs (1 transaction, not 32).

## Diagnosing Bank Conflicts in Nsight Compute

TODO: Identify the relevant Nsight Compute metrics:
- `l1tex__data_bank_conflicts_pipe_lsu_mem_shared_op_ld.sum` — load conflicts
- `l1tex__data_bank_conflicts_pipe_lsu_mem_shared_op_st.sum` — store conflicts

TODO: Explain how to navigate to the **Shared Memory** section in Nsight Compute and interpret the "Bank Conflicts" row.

### Reading the Wavefront Analysis

TODO: Explain that Nsight Compute's wavefront analysis shows the actual number of memory transactions per warp access request. Ideal is 1. An N-way conflict shows N transactions.

## Common Conflict Patterns and Their Fixes

### Pattern 1: Stride-32 Access (Worst Case)

TODO: Show the classic 2D array transposition example where reading rows sequentially causes stride-32 conflicts.

```cpp
// TODO: Insert conflict-prone matrix transpose kernel
// __shared__ float tile[TILE][TILE]; // e.g., 32×32
// Each thread reads tile[threadIdx.x][threadIdx.y] — stride-32 conflict!
```

#### Fix: Padding (+1 Column)

TODO: Show how adding a single padding column breaks the conflict.

```cpp
// TODO: Insert fixed matrix transpose kernel
// __shared__ float tile[TILE][TILE + 1]; // +1 padding eliminates stride-32
```

TODO: Explain *why* this works: adding 1 column shifts each row's bank mapping by 1, so column accesses no longer all land on the same bank.

### Pattern 2: Stride-2 Access (16-Way Conflict in 32-bit Mode)

TODO: Show a warp where even threads access banks 0,2,4,...,30 and odd threads access 1,3,5,...,31 — no conflict. Then show how stride-2 within the same half-warp creates 16-way conflicts.

### Pattern 3: Reduction Trees

TODO: Show the classic parallel reduction that starts conflict-free and degrades as stride decreases. Show the conflict-free formulation using sequential addressing.

```cpp
// TODO: Insert conflicting reduction (stride = 1 at end, 32-way conflict)
// vs. conflict-free reduction using __shfl_down_sync at the warp level
```

### Pattern 4: Structs of Arrays vs Arrays of Structs

TODO: Explain that AoS layouts where each struct member is accessed by different threads in a warp can cause conflicts. SoA avoids this.

## Conflict-Free Access Patterns

TODO: Summarize the general rules for conflict-free shared memory access:
1. Stride-1 access by consecutive threads (each thread hits a unique bank).
2. Any access pattern where each of the 32 banks is touched by at most one thread per transaction.
3. Broadcast: all threads read the same address.

## Performance Impact Quantification

TODO: Insert measured bandwidth numbers for conflict-free vs. 2-way, 4-way, 16-way, and 32-way conflicts on representative architectures (V100, A100). Include the Nsight Compute screenshots or data tables.

## Advanced: Swizzling Layouts for Tensor Core Tiles

TODO: Explain how Tensor Core usage (WMMA / `wgmma`) requires specific shared memory swizzle patterns to avoid bank conflicts when loading tiles. Reference CUTLASS's `swizzle` layout algebra as the authoritative reference.

### Why Naive Row-Major Tiles Conflict

TODO: Show why a naive 128-byte row-major layout causes 4-way or 8-way conflicts when loaded with the ldmatrix instruction.

### Swizzle Patterns: XOR-Based Bank Remapping

TODO: Explain the XOR swizzle: the bank index is XOR'd with the row index, distributing accesses uniformly across banks.

```
// TODO: Insert diagram or table showing bank assignment before and after XOR swizzle
// bank_index = (col_index ^ (row_index * swizzle_bits)) % 32
```

## Summary Checklist

TODO: Provide a quick-reference checklist for auditing a kernel's shared memory access patterns:
- [ ] Are 2D tile accesses stride-1 in the fastest-changing dimension?
- [ ] Have you checked for stride-32 (or stride-16) patterns?
- [ ] Is padding applied where appropriate?
- [ ] Have you verified with Nsight Compute (zero bank conflict transactions)?
- [ ] For Tensor Core kernels, are you using a validated swizzle layout?
