---
id: shared-memory
title: Shared Memory (SMEM)
sidebar_position: 3
draft: true
---

# Shared Memory (SMEM)

## Physical Organization: Banks

TODO: Explain the 32-bank structure of shared memory, bank width (4-byte or 8-byte modes), and how addresses map to banks.

## Bank Conflict Mechanics

TODO: Explain what constitutes a bank conflict (multiple threads in a warp accessing the same bank in the same cycle), the serialization penalty, and the broadcast exception.

## Configuring Shared Memory Size

TODO: Cover `cudaFuncSetAttribute` with `cudaFuncAttributeMaxDynamicSharedMemorySize` and the `__shared__` keyword for static allocation.

## L1/Shared Memory Split

TODO: Explain the configurable L1/SMEM split that exists in Volta+ and how to tune it per kernel.

## Async Copy to Shared Memory (`cuda::memcpy_async`)

TODO: Explain the `cp.async` PTX instruction surfaced via cooperative groups, pipeline objects, and why it decouples data movement from compute on Ampere+.

## Avoiding Padding Pitfalls

TODO: Show the classic column-major vs row-major access example and how adding a +1 padding column can eliminate bank conflicts.
