---
id: blackwell
title: "Blackwell Architecture (SM 10.0)"
sidebar_position: 1
---

# Blackwell Architecture (SM 10.0)

> **Products:** B100, B200, GB200, RTX 50-series (GB202/203), GeForce RTX 5090  
> **Compute Capability:** 10.0  
> **Released:** 2024–2025

## Overview and Design Goals

TODO: Describe Blackwell's mission — scaling LLM inference to trillion-parameter models with the new FP4 Tensor Cores, the NVLink 5.0 / NVSwitch 4.0 fabric, and the GB200 NVL72 rack-scale design. Also note the dual-die GB100 design.

## Streaming Multiprocessor (SM) Architecture

### SM Count and Compute Throughput

TODO: Insert SM counts for GB100, GB102. Insert throughput table including FP4, FP6, FP8, FP16, BF16, TF32, FP32, FP64.

### Fifth-Generation Tensor Cores: FP4 and FP6

TODO: Explain the new FP4 (E2M1) and FP6 (E2M3 / E3M2) formats, their quantization properties, and when they are losslessly applicable. Insert throughput — FP4 should be ~2× FP8.

### Second-Generation Transformer Engine

TODO: Explain the 2nd-gen Transformer Engine with micro-tensor scaling (per-block scale factors down to 32 elements) vs. the per-tensor scaling of Hopper. This enables FP4/FP6 inference without accuracy loss.

## Blackwell-Specific CUDA Programming Primitives

### Fifth-Generation `wgmma` / BWGMMA

TODO: Explain any instruction-set changes. TBD based on CUDA 13.x release notes.

### NV Block Cluster Extensions

TODO: Explain any cluster size limit changes from Hopper (max 16 blocks) on Blackwell.

## Memory Subsystem

### L1 / Shared Memory Per SM

TODO: Insert SMEM per SM (TBD — expected ≥ 228 KB).

### L2 Cache

TODO: Insert L2 capacity for GB100/GB102.

### HBM3e Memory

TODO: Insert bandwidth for B100 (3.5 TB/s) and B200 (8.0 TB/s with HBM3e at 192 GB). Insert capacity (192 GB for B200 SXM).

### NVLink-C2C (Chip-to-Chip)

TODO: Explain the NVLink-C2C die-to-die interconnect in the GB200 NVL72, connecting the Grace CPU to the Blackwell GPU die at ~900 GB/s.

## GB200 NVL72 Rack-Scale Architecture

TODO: Explain the 72-GPU rack system: 36 nodes × (1 Grace CPU + 2 Blackwell GPUs), connected via NVSwitch 4.0. Total GPU memory: 13.8 TB. Total NVLink bandwidth: 130 TB/s. Explain the implications for model parallelism at this scale.

## Key Kernel Optimization Considerations for Blackwell

TODO: Enumerate Blackwell-specific strategies — primarily around FP4/FP6 quantization pipelines, micro-tensor scaling, and any new TMA/`wgmma` variants.

## Nsight Compute: Blackwell-Specific Sections

TODO: To be filled when CUDA 13.x Nsight Compute documentation is available. Watch for FP4 Tensor Core pipe metrics and NVLink-C2C bandwidth counters.
