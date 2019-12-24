---
id: version-2.2-known-issue
title: 十二、已知问题
original_id: known-issue
---

## 1.IPVS 模式暂不支持，原因是 loki 在 IPVS 模式下启动异常。

## 2.HA 方案暂不支持外部 lb 。

## 3.手动模式使用 Ceph 集群，卸载后请重启节点以确保清除系统残留的虚拟网卡、路由信息、iptables|ipvs 规则等，否则重复使用这些机器会安装失败。
