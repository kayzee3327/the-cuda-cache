---
id: warp-execution
title: Warp Execution & Scheduling
sidebar_position: 2
draft: true
---

# Warp Execution & Scheduling

## What Is a Warp?

TODO: Define a warp as 32 threads executing in lockstep. Explain why 32 was chosen and the SIMT abstraction over SIMD hardware.

## The Warp Lifecycle

TODO: Trace a warp from creation (kernel launch) through scheduling, execution, stalling, and retirement.

## Warp Schedulers: GTO vs LRR vs Async

TODO: Explain the Greedy-Then-Oldest (GTO) and Least Recently Run (LRR) scheduling policies. Mention the async warp scheduler introduced in newer architectures.

## Issue Slots and Dual-Issue

TODO: Explain that each warp scheduler has a fixed number of issue slots per cycle (typically 1) and which architectures support dual-issue and under what conditions.

## Stall Reasons and Latency Hiding

TODO: Enumerate stall categories visible in Nsight Compute (Long Scoreboard, Short Scoreboard, Wait, Barrier, Branch, etc.) and explain how having more resident warps hides each type.

### Long Scoreboard Stalls (Global Memory)

TODO: Explain why global memory latency (~200–800 cycles) is the primary stall type and how to hide it with sufficient warp parallelism or prefetching.

### Short Scoreboard Stalls (Shared Memory / L1)

TODO: Explain shared memory latency and how it causes short scoreboard stalls.

## Instruction-Level Parallelism (ILP) Within a Warp

TODO: Explain how independent instructions within a single warp's instruction stream can be issued across multiple cycles to hide latency even with few warps.
