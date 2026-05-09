---
id: warp-divergence
title: Warp Divergence
sidebar_position: 1
draft: true
---

# Warp Divergence

## What Is Warp Divergence?

TODO: Explain that when threads within a warp take different paths through a conditional branch, the hardware must execute all taken paths serially (with inactive threads masked), reducing effective throughput.

## Pre-Volta vs Post-Volta Divergence Behavior

TODO: Explain the critical difference: pre-Volta, diverged warps use a single PC with a SIMT stack (predication). Post-Volta (Independent Thread Scheduling), each thread has its own PC, enabling more flexible reconvergence but requiring explicit synchronization.

## Measuring Divergence in Nsight Compute

TODO: Identify the relevant metrics: `smsp__thread_inst_executed_pred_on.avg` (active thread instructions) vs. `smsp__inst_executed.avg` (total instructions). The ratio indicates predication efficiency.

## Strategies to Eliminate Divergence

### 1. Restructuring Data for Branch-Free Access

TODO: Explain sorting/partitioning input data so threads in the same warp take the same branch.

### 2. Predication vs. Branching

TODO: Explain the compiler's decision to predicate (execute both paths, mask results) vs. branch. For short sequences (< ~7 instructions per path), predication is preferred. Show `@p` PTX predication.

### 3. Warp-Uniform Branches

TODO: Explain that branches conditional on `threadIdx.x / 32` (warp ID) or on values uniform across a warp do not cause divergence.

### 4. Using Warp Intrinsics to Reduce Branching

TODO: Show how `__ballot_sync`, `__any_sync`, `__all_sync` can replace per-thread conditionals with warp-level votes.

## Divergence in Loops

TODO: Explain variable-trip-count loops (e.g., sparse computations) and strategies like warp compaction to keep warps busy.
