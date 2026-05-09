---
id: synchronization
title: Synchronization Primitives
sidebar_position: 4
draft: true
---

# Synchronization Primitives

## `__syncthreads()`: Block-Level Barrier

TODO: Explain semantics, cost, and the rule that all threads in a block must reach the barrier (convergence requirement). Explain the danger of conditional `__syncthreads()`.

## `__syncwarp()` and Warp-Level Primitives

TODO: Explain post-Volta independent thread scheduling and why `__syncwarp()` is required where implicit warp-level synchrony was previously assumed.

## Warp Shuffle Instructions

TODO: Cover `__shfl_sync`, `__shfl_up_sync`, `__shfl_down_sync`, `__shfl_xor_sync`. Show use cases: warp-level reductions, broadcast, prefix sums.

## Atomic Operations

TODO: Cover `atomicAdd`, `atomicCAS`, `atomicExch`, and the full atomic zoo. Discuss contention and the Ampere native FP32 atomic improvement.

## Memory Fences: `__threadfence()`, `__threadfence_block()`, `__threadfence_system()`

TODO: Explain memory ordering guarantees and when fences are needed beyond atomic operations.

## Cooperative Groups Barriers

TODO: Show `grid_group`, `thread_block_tile`, and `cooperative_groups::sync()` as the modern, composable replacement for primitive barriers.
