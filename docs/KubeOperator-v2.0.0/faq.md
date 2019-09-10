---
id: faq
title: 常见问题
---

## 1 KubeOperator 与 Kubepray 等部署工具的区别是什么？

KubeOperator 不仅提供 Day 1 部署功能，还提供 Day 0 规划和 Day 2 的Kubernetes 集群升级、变更的功能，除此之外，KubeOperator 还有如下优势：

-  提供可视化的 Web UI，大大降低部署和管理 k8s 的门槛；
-  提供离线的、经过全面验证和测试的安装包；
-  与 VMware 和 Openstack 等云平台紧密对接，能够实现一键虚机自动创建和部署（基于 Terraform 和 Ansible）。

## 2 KubeOperator 与 OpenShift 等 PaaS 平台有什么区别？

红帽 OpenShift 是一个非常全面的容器云平台，既包括面向运维人员的集群管理功能集，也包括面向开发人员的 CI/CD、DevOps、服务目录等功能集。 KubeOperator 只专注于解决运维人员侧的问题，即专注于帮助运维人员部署和管理安全、稳定、生产级别的 Kubernetes 集群。此外，KubeOperator 对外开放 REST API，可以实现 Kubernetes as a Service，开发人员可以自助申请 Kubernetes 集群并完成自动化交付。




