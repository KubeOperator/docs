---
id: version-2.1-introduction
title: 一、关于 KubeOperator
original_id: introduction
---

## 1 什么是 KubeOperator？

KubeOperator 是一个开源项目，在离线网络环境下，通过可视化 Web UI 在 VMware、Openstack 或者物理机上规划、部署和管理生产级别的 Kubernetes 集群。

![overview](../../../img/overview.png)

## 2 KubeOperator 的整体架构

KubeOperator 提供可视化的界面和经过验证的原生 K8s 离线安装包，使用 Terraform 在IaaS 平台上自动创建主机（用户也可以自行准备主机，比如物理机或虚拟机），通过 Ansible 完成自动化部署和变更操作，支持 Kubernetes 集群 从 Day 0 规划，到 Day 1 部署，到 Day 2 运维及变更的全生命周期管理。

![architecture](../../../img/KubeOperator.jpeg)

## 3 KubeOperator 的技术优势

-  按需创建：调用云平台 API，一键快速创建和部署 Kubernetes 集群 (即 Kubernetes as a Service)；
-  按需伸缩：快速伸缩 Kubernetes 集群，优化资源使用效率；
-  按需修补：快速升级和修补 Kubernetes 集群，并与社区最新版本同步，保证安全性；
-  自我修复：通过重建故障节点确保集群可用性；
-  离线部署：持续更新包括 Kubernetes 及常用组件的离线包；
-  Multi-AZ 支持：通过把 Kuernetes 集群 Master 节点分布在不同的故障域上确保高可用；

## 4 KubeOperator 的版本规划

 v1.0 （已发布）

- 提供原生 Kubernetes 的离线包仓库；
- 支持一主多节点部署模式；
- 支持离线环境下的一键自动化部署，可视化展示集群部署进展和结果；
- 内置 Kubernetes 常用系统应用的安装，包括 Registry、Promethus、Dashboard、Traefik Ingress、Helm 等；
- 提供简易明了的 Kubernetes 集群运行状况面板；
- 支持 NFS 作为持久化存储；
- 支持 Flannel 作为网络方案；
- 支持 Kubernetes 集群手动部署模式（自行准备主机和 NFS）；

 v2.0 （已发布）

- 支持调用 VMware vCenter API 自动创建集群主机；
- 支持 VMware vSAN 、VMFS/NFS 作为持久化存储；
- 支持 Multi AZ，支持多主多节点部署模式；
- 内置 Weave Scope；
- 支持 Calico 网络插件；
- 支持通过 F5 BIG-IP Controller 对外暴露服务（Nodeport mode, 七层和四层服务都支持）

 v2.1 （已发布）
 
 - 支持 Openstack 云平台；
 - 支持 Openstack Cinder 作为持久化存储；
 - 支持 Kubernetes 集群升级（Day 2）；
 - 支持 Kubernetes 集群扩缩容（Day 2）；
 - 支持 Kubernetes 集群备份与恢复（Day 2）；
 - 支持 Kubernetes 集群健康检查与诊断（Day 2）；
 - 支持 webkubectl；

v2.2 （进行中，2019.11.30 发布）

  - K8s 日志收集及管理方案（Loki）；
  - KubeOperator 自身的系统日志收集和管理；
  - 新增概览页面：展示关键信息，比如状态、容量、TOP 使用率、异常日志、异常容器等信息；
  
v2.3 （计划中，2019.12.31 发布）

  - KubeApps 应用商店；
  - 支持云原生存储 Rook；

v3.0 （计划中）

  - 离线环境下使用 Sonobuoy 进行 Kubernetes 集群合规检查并可视化展示结果；
  - 国际化支持；
  - 支持 VMware NSX-T；
