---
id: version-2.2-concept
title: 二、KubeOperator 的主要概念
original_id: concept
---

## 1 部署模型

KubeOperator 支持两种类型的 K8s 集群部署，一种是一主多节点类型，另外一种是多主多节点类型。 

-  一主多节点类型：K8s 集群由一个 master 节点、一个及以上 worker 节点组成。
-  多主多节点类型：K8s 集群由三个 master 节点、三个及以上 worker 节点组成。

一主多节点类型适用于开发和测试环境，生产环境请使用多主多节点类型。


## 2 部署模式

KubeOperator 支持两种部署模式，一种是手动部署，一种是自动部署。

-  手动模式：用户需要自己准备物理机或虚拟机及 NFS 持久化存储。
-  自动模式：用户只需要绑定云平台（比如 VMware）账号信息，KubeOperator 会根据预先定义的部署计划来自动创建主机实现一键自动化部署。

## 3 部署计划(Deploy Plan)

在自动部署模式下，部署计划定义了 K8s 集群的部署细节，包括其部署模型、集群所在的区域、可用区、节点大小类型等。

## 4 区域(Region)和可用区(AZ)

区域(Region)和可用区(AZ)这两个术语来自公有云。每个区域完全独立。每个可用区完全隔离，但同一个区域内的可用区之间使用低时延链路相连。区域和可用区之间的关系如下图所示。

![region-zone](../../../img-2.1/region.png)

对于公有云厂商提供的托管 K8s 服务，master 节点由公有云厂商托管并维护，其 3 个master 节点会分布在同个区域下面的 3 个不同可用区上面，实现真正的高可用。

KubeOperator 借鉴公有云厂商的思路和概念，并应用到 VMware 和 Openstack 等私有云平台上面。例如，在 VMware 云平台下，区域对应为 Datacenter，可用区对应于 cluster，或者 cluster 下面的 resource pool。

-  如果用户只有一个 vSphere 集群，那么可以在集群下面建立三个 resource pool，每个resource pool 对应于一个可用区。
-  如果用户有三个 vSphere 集群，那么每个集群对应于一个可用区。

> 注：vSAN 集群不能被多个 vSphere 集群共享，所以 3 个 vSphere 集群，持久化存储仅支持集中存储。 具体请参考：https://docs.vmware.com/en/VMware-Enterprise-PKS/1.5/vmware-enterprise-pks-15/GUID-vsphere-persistent-storage.html

## 5  Kubernetes 离线安装包

KubeOperator 提供完整的离线 Kubernetes 安装包，每个安装包会被构建成一个独立容器镜像供 KubeOperator 使用，离线安装包中包括以下三种内容：

- Kubenetes 核心组件：包括 Kubenetes、Docker 及 etcd；
- Kubenetes 附属组件（镜像）：包括网络、存储、监控、Dashboard 及常用工具；
- 操作系统 RPM 包：除 CentOS 7.6 Minimal 外的其他必备 RPM。安装包容器运行后是一个标准的 Yum 源服务器。

Kubernetes 离线安装包具体信息请参考工程：[K8s-package](https://github.com/KubeOperator/K8s-package)。以 Kubernetes 离线包 v1.15.4 为例，其包括的内容如下：

Kubenetes 核心组件

|  分类  |  组件名称   | 版本  |
|  ---- |  ----  | ----  |
| 核心 | kubernetes  | 1.15.4 |
| 核心 | etcd  | 3.3.10 |
| 核心 | docker  | docker-ce-18.09.9 |

Kubenetes 附属组件（镜像）

|  分类  |  组件名称   | 版本  |
|  ---- |  ----  | ----  |
| 网络 | quay.io/coreos/flannel | v0.11.0-amd64 |
| 网络 | calico/node | v3.7.3 |
| 网络 | calico/cni | v3.7.3 |
| 网络 | calico/kube-controllers | v3.7.3 |
| 网络 | docker.io/coredns/coredns | 1.6.0 |
| 网络 | docker.io/traefik | v1.7.11 |
| 网络 | f5networks/K8s-bigip-ctlr | 1.9.2 |
| 存储 | quay.io/external_storage/nfs-client-provisioner | v3.1.0-K8s1.11 |
| 监控 | docker.io/grafana/grafana | v1.7.11 |
| 监控 | quay.io/prometheus/alertmanager | v0.15.2 |
| 监控 | quay.io/prometheus/node-exporter | v1.7.11 |
| 监控 | quay.io/prometheus/prometheus| v2.4.3 |
| 监控 | quay.io/prometheus/pushgateway| v0.5.2 |
| 监控 | quay.io/coreos/kube-state-metrics| v1.4.0 |
| Dashboard | kubernetesui/dashboard| v2.0.0-beta4 |
| Dashboard | kubernetesui/metrics-scraper| v1.0.1 |
| 工具 | gcr.io/google-containers/pause-amd64| 3.1 |
| 工具 | docker.io/registry| 2 |
| 工具 | docker.io/konradkleine/docker-registry-frontend| v2 |
| 工具 | gcr.io/kubernetes-helm/tiller| v2.15.0 |
| 工具 | quay.io/coreos/configmap-reload| v0.0.1 |
| 工具 | docker.io/appropriate/curl| edge |
| 工具 | weaveworks/scope| 1.11.5 |
| 工具 | quay.io/comcast/kuberhealthy | v1.0.2 |

RPM 包（基于 CentOS 7.6 Minimal 及以上）

|  分类  |  组件名称  |
|  ---- |  ----   |
| RPM | dnsmasq  | 
| RPM | chrony  | 
| RPM | ntpdate | 
| RPM | nfs-utils | 
