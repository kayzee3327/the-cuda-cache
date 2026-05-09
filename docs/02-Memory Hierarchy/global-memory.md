---
id: global-memory
title: Global Memory & Coalescing
sidebar_position: 4
draft: true
---

# Global Memory & Coalescing

## DRAM Architecture: HBM vs GDDR

TODO: Explain the architectural differences between HBM (stacked, wide bus, lower frequency) and GDDR (off-package, narrower bus, higher frequency), and which GPU segments use each.

## Memory Transactions and Cache Lines

TODO: Explain that global memory accesses are served in 128-byte L2 cache line transactions and the importance of aligning accesses.

## Coalescing Rules

TODO: Precisely define coalescing: all threads in a warp accessing a contiguous, aligned 128-byte region. Show the best-case and worst-case patterns.

## Stride Access Patterns and Their Cost

TODO: Analyze stride-1 (fully coalesced), stride-2, stride-N, and fully random access patterns. Include effective bandwidth utilization estimates.

## Alignment Requirements

TODO: Cover `__align__()`, `cudaMallocPitch`, and how data structure layout affects coalescing.

## Using L2 Persistence (Ampere+)

TODO: Explain the L2 Residency Control API introduced in Ampere (`cudaStreamAttrValue`, `accessPolicyWindow`) for pinning hot data in L2.
