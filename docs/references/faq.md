---
id: faq
title: FAQ
---

Here's a collection of frequently asked questions.

### What PoW hash function does Nervos CKB use?
For testnet it's [Cuckoo](https://github.com/nervosnetwork/ckb/wiki/PoW-Engines).\
For mainnet it's not decided yet. Please stay tuned.:)

### Why can't I find my address on the explorer?
If you address cannot be found on the explorer, it means your address has not been involved in any transaction yet.  
If you think you have mined a block with your ckb client, you should check:
* if your `ckb.toml` is properly configured with the right `[block_assembler]` parameters
* if your `ckb run` programm has synchronized to the latest block. If not, the block you mined will not be included in the longest chain.

### Can I mine with CPU/GPU/ASIC?
Currently, the mining software only supports mining with CPU. GPU supports will be added very soon.  
As for ASIC, Nervos foundation will not work on producing ASIC miner for Nervos CKB. Also the hash function used in Nervos CKB PoW will be a completely new one, which means no ASIC should occur in the near future.

### CKB-CLI prompts `ERROR: output path ( privkey ) already exists`?
You already have a privkey file under this directory. You need to remove that one first.
