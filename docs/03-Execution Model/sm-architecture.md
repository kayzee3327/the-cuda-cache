---
id: sm-architecture
title: Streaming Multiprocessor (SM) Architecture
sidebar_position: 1
draft: true
---

# Streaming Multiprocessor (SM) Architecture

## SM as the Fundamental Compute Unit

TODO: Explain that all CUDA execution happens on SMs, and that different GPU products expose different numbers of SMs. Reference the full SM count table across GPU models.

## Sub-Partitions and Processing Blocks

TODO: Explain the internal sub-partition structure of an SM (4 sub-partitions in Ampere/Ada, each with its own warp scheduler, register file slice, and execution units).

## Warp Schedulers Per SM

TODO: Insert number of warp schedulers per SM for each architecture (Volta: 4, Turing: 4, Ampere: 4, Ada: 4, Hopper: 4). Explain dual-issue capability.

## CUDA Cores, Tensor Cores, and Special Function Units (SFUs)

TODO: Insert CUDA core counts, Tensor Core counts, SFU counts, and LD/ST unit counts per SM per architecture.

## INT32 and FP32 Dual Execution (Ampere+)

TODO: Explain the Ampere-introduced ability to execute INT32 and FP32 operations concurrently within the same sub-partition.

## Resource Limits Per SM

TODO: Provide a reference table: max warps/SM, max threads/SM, max blocks/SM, register file size, shared memory capacity across all relevant architectures.
