---
id: faq
title: 常见问题
---

## 1 KubeOperator 的定位是什么？

云原生正在快速兴起，三个互相关联的领域在同步进化：

-  基础设施方面：从 物理资源 到 虚拟化资源 到 容器化（ Kubernetes ）资源 的演进；
-  开发模式方面：从 瀑布模型 到 敏捷开发 到 DevOps 的演讲；
-  应用架构方面：从 单体架构 到 多层次架构 到 微服务 的演进。

KubeOperator 专注于解决云原生基础实施的问题，为开发者交付生产级别可用的 k8s 集群，实现 Kubernetes as a Service。


## 2 KubeOperator 与 Kubespray 等部署工具的区别是什么？

KubeOperator 不仅提供 Day 1 部署功能，还提供 Day 0 规划和 Day 2 的Kubernetes 集群升级、变更的功能，除此之外，KubeOperator 还有如下优势：

-  提供可视化的 Web UI，大大降低部署和管理 k8s 的门槛；
-  提供离线的、经过全面验证和测试的安装包；
-  与 VMware 和 Openstack 等云平台紧密对接，能够实现一键虚机自动创建和部署（基于 Terraform 和 Ansible）。

## 3 KubeOperator 与 OpenShift 等 PaaS 平台有什么区别？

- 红帽 OpenShift 是一个非常全面的容器云平台，既包括面向运维人员的集群管理功能集，也包括面向开发人员的 CI/CD、DevOps、服务目录等功能集。 
- KubeOperator 只专注于解决运维人员侧的问题，即专注于帮助运维人员部署和管理安全、稳定、生产级别的 Kubernetes 集群。此外，KubeOperator 对外开放 REST API，可以实现 Kubernetes as a Service，开发人员可以自助申请 Kubernetes 集群并完成自动化交付。

## 4 k8s 集群应该部署在物理机上面，还是 IaaS 上面？

总的来说，企业有两种方案选择：

- 基于物理机部署大的 k8s 集群：通过 namespace 实现租户的隔离；
- 基于 IaaS 平台之上部署多个 k8s 集群：为每个租户分配独立的 k8s 集群；

这两种方案各有好处，在 k8s 采纳初期，使用第二种方案更为理性，因为：

 - 如果是单一大集群，升级会影响所有租户，风险比较大；
 - IaaS 平台上有成熟存储和网络方案；
 - KubeOperator 与 VMware、Openstack 等 IaaS 方案紧密集成，可以实现全栈的自动化，集群交付快，伸缩快；




