---
id: introduction
title: 关于 KubeOperator
---

## 1 什么是 KubeOperator？

KubeOperator 是一个开源项目，帮助运维人员通过 Web-based UI，在完全离线和多云环境下，部署和管理生产级别的 Kubernetes 集群。KubeOperator 尤其适合在云平台（比如 VMware 及 Openstack）上部署和管理 Kubernetes 集群，实现 Kubernetes as a Service。
![overview](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/KubeOperator.jpeg?raw=true)

## 2 KubeOperator 的技术优势

-  按需创建：调用云平台 API，一键快速创建和部署 Kubernetes 集群 (即 Kubernetes as a Service)；
-  按需伸缩：快速伸缩 Kubernetes 集群，优化资源使用效率；
-  按需修补：快速升级和修补 Kubernetes 集群，保证集群安全性，并与社区最新版本同步；
-  自我修复：通过重建故障节点确保集群可用性；
-  离线部署：持续更新包括 Kubernetes 及常用组件的离线包；
-  Multi-AZ 支持：通过把集群节点分布在不同的故障域上确保集群的高可用；

## 3 KubeOperator 的版本规划

 v1.0.0 （已发布）

- 提供原生 Kubernetes 的离线包仓库；
- 支持一主多节点部署模式；
- 支持离线环境下的一键自动化部署，可视化展示集群部署进展和结果；
- 集成 Kubernetes 常用插件的安装，包括 Registry、Promethus、Dashboard、Traefik Ingress、Helm 等；
- 提供简易明了的 Kubernetes 集群运行状况面板；
- 支持 NFS 作为持久化存储；
- 支持 Flannel 作为网络方案；
- 支持 Kubernetes 集群手动部署模式（自行准备主机和 NFS）；

 v2.0.0 （已发布）

- 支持调用 VMware vCenter API 自动创建集群主机；
- 支持 VMware vSAN 、VMFS/NFS 作为持久化存储；
- 支持 Multi AZ，支持多主多节点部署模式；
- 支持通过 F5 BIG-IP Controller 对外暴露服务（Nodeport mode, 七层和四层服务都支持）；
- 集成 Weave Scope (支持 Web Shell)；
- 支持 Calico 作为网络方案；

 v2.1.0 （开发中）
 
- 支持 Kubernetes 集群升级；
- 支持 Kubernetes 集群扩缩容；
- 支持 etcd 备份及恢复；
- 支持 Openstack 云平台；
- 支持 Ceph 作为持久化存储；

 v3.0.0 （计划中）

- 集成 KubeApps 应用管理器（支持常用应用部署，比如 CI/CD 应用组合 Jenkins、GitLab、Harbor 和 Tekton 等）
- 支持 VMware NSX-T；
