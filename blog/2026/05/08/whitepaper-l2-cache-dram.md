---
slug: l2-cache-dram-whitepaper
title: "[WP] L2 Cache and DRAM Architecture: Summary"
authors: [kz]
tags: [Ampere, Hopper, L2 Cache, Device Memory, HBM, Memory Hierarchy]
---

This blog summarizes basic architectural information of Device Memory and L2 Cache from NVIDIA's

- [Ampere Whitepaper](https://images.nvidia.com/aem-dam/en-zz/Solutions/data-center/nvidia-ampere-architecture-whitepaper.pdf)
- [Hopper Whitepaper](https://resources.nvidia.com/en-us-hopper-architecture/nvidia-h100-tensor-c)

<!-- truncate -->

The global and local memory areas accessed by CUDA programs reside in HBM memory space, i.e., “device memory”.

- Constant memory space resides in device memory and is cached in the constant cache.
- Texture and surface memory spaces reside in device memory. They are cached in texture cache.
- The Level 2 (L2) cache caches reads from and writes to HBM (device) memory. It services memory requests from various subsystems within the GPU.

HBM and L2 memory spaces are accessible to all SMs and all applications running on the GPU.



## Device Memory (DRAM) Overview

|           | Ampere (SXM4)                                  | Hopper (SXM5)         | Hopper (PCIe)          |
| --------- | ---------------------------------------------- | --------------------- | ---------------------- |
| DRAM      | 40GB (HBM2, 5 stacks, 8 memory dies per stack) | 80GB (HBM3, 5 stacks) | 80GB (HBM2e, 5 stacks) |
| Data Rate | 1215 MHz DDR                                   | 2619 MHz DDR          | 1593 MHz DDR           |
| Bandwidth | 1555 GB/sec                                    | 3352 GB/sec           | 2039 GB/sec            |

For more, please check "H100 HBM and L2 Cache Memory Architectures" section of [Hopper Whitepaper](https://resources.nvidia.com/en-us-hopper-architecture/nvidia-h100-tensor-c), [Hopper Architecture In-depth](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/) and [Hopper Architecture In-depth](https://developer.nvidia.com/blog/nvidia-ampere-architecture-in-depth/).

## L2 Cache

## 

|                  | Ampere (SXM4)                                                | Hopper (SXM5)                                         | Hopper (PCIe)                                         |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------- |
| Cache Size       | 40MB                                                         | 50MB                                                  | 50MB                                                  |
| Organization     | The L2 cache is divided into two partitions to enable higher bandwidth and lower latency memory access. Each L2 partition localizes and caches data for memory accesses from SMs in the GPCs directly connected to the partition.<br />Each L2 cache partition is divided into 40 L2 cache slices. Eight 512 KB L2 slices are associated with each memory controller. | Partitioned Crossbar but not necessarily 2-way split. | Partitioned Crossbar but not necessarily 2-way split. |
| Read Bandwidth   | 5120 Bytes/clk                                               | Unknown                                               | Unknown                                               |
| Data Compression | The NVIDIA Ampere architecture adds Compute Data Compression to accelerate unstructured sparsity and other compressible data patterns. | Supported                                             | Supported                                             |

For detailed info, please refer to whitepapers.





