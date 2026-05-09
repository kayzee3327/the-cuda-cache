---
id: memory-overview
title: Memory Hierarchy Overview
sidebar_position: 1
draft: true
---

# Memory Overview

For detailed introduction to memory hierarchy, please refer to [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/#memory-hierarchy)



## Access Latency Reference Table

TODO: Insert latency numbers (in clock cycles) for each memory type across Volta, Ampere, and Hopper.

|               | Volta | Ampere | Hopper |
| ------------- | ----- | ------ | ------ |
| Device Memory |       |        |        |
| L2 Cache      |       |        |        |
| L1 Cache      |       |        |        |
| Register      |       |        |        |



## Bandwidth Reference Table

TODO: Insert peak bandwidth numbers (GB/s) for each tier.

|               | sm75 | sm80               | sm86 | sm90 |
| ------------- | ---- | ------------------ | ---- | ---- |
| Device Memory |      | 1555 GB/sec (HBM2) |      |      |
| L2 Cache      |      |                    |      |      |
| L1 Cache      |      |                    |      |      |
| Register      |      |                    |      |      |



## On-chip Memory Reference Table

|      | L2 Cache | L1 Cache & Shared Memory | Register File (Per SM) | Registers (Per thread) |
| ---- | -------- | ------------------------ | ---------------------- | ---------------------- |
| sm75 |          |                          |                        |                        |
| sm80 | 40MB     | 192KB                    | 64K 32-bit             | 255                    |
| sm86 |          |                          |                        |                        |
| sm90 |          |                          |                        |                        |



## Programmer-Controlled vs Hardware-Managed Caches

TODO: Distinguish between memory spaces the programmer explicitly manages (registers, shared memory) and those managed by the hardware (L1, L2, texture cache).
