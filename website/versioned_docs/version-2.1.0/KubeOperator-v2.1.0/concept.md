---
id: version-2.1.0-concept
title: KubeOperator 的主要概念
original_id: concept
---

## 1 部署模型

KubeOperator 支持两种类型的 k8s 集群部署，一种是一主多节点类型，另外一种是多主多节点类型。 

-  一主多节点类型：k8s 集群由一个 master 节点、一个 daemon 节点、三个及以上 worker 节点组成。
-  多主多节点类型：k8s 集群由三个 master 节点、一个 daemon 节点、三个及以上 worker 节点组成。

单主多节点类型适用于开发和测试环境，生产环境请使用多主多节点类型。


## 2 部署模式

KubeOperator 支持两种部署模式，一种是手动部署，一种是自动部署。

-  手动模式：用户需要自己准备主机及 NFS 持久化存储。
-  自动模式：用户只需要绑定云平台（比如 VMware）账号信息，KubeOperator 会根据预先定义的部署计划来自动创建主机实现一键自动化部署。

## 3 部署计划(Deploy Plan)

在自动部署模式下，部署计划定义了 k8s 集群的部署细节，包括其部署模型、集群所在的区域、可用区、节点大小类型等。

## 4 区域(Region)和可用区(AZ)

区域(Region)和可用区(AZ)这两个术语来自公有云。每个区域完全独立。每个可用区完全隔离，但同一个区域内的可用区之间使用低时延链路相连。区域和可用区之间的关系如下图所示。

![region-zone](https://github.com/KubeOperator/docs/blob/master/website/static/img/region-zone2.png?raw=true)

对于公有云厂商提供的托管 k8s 服务，master 节点由公有云厂商托管并维护，其 3 个master 节点会分布在同个区域下面的 3 个不同可用区上面，实现真正的高可用。

KubeOperator 借鉴公有云厂商的思路和概念，并应用到 VMware 和 Openstack 等私有云平台上面。例如，在 VMware 云平台下，区域对应为 Datacenter，可用区对应于 cluster，或者 cluster 下面的 resource pool。

-  如果用户只有一个 vSphere 集群，那么可以在集群下面建立三个 resource pool，每个resource pool 对应于一个可用区。
-  如果用户有三个 vSphere 集群，那么每个集群对应于一个可用区。

> 注：vSAN 集群不能被多个 vSphere 集群共享，所以 3 个 vSphere 集群，持久化存储仅支持集中存储。

## 5 离线包

KubeOperator 会持续维护包括操作系统、Kubernetes 及常用组件的完整离线包。该离线包能在完全离线的网络环境下部署和升级，并保证最终的一致性。离线包包括了部署 k8s 集群所需要的介质，包括操作系统、操作系统补丁、k8s 版本、k8s 组件等。比如 v1.15.3 离线包的内容为：

Kubernetes 及其附属组件：

|  分类  |  组件名称   | 版本  |
|  ---- |  ----  | ----  |
| 核心 | kubernetes  | 1.15.3 |
| 核心 | etcd  | 3.3.10 |
| 核心 | docker  | docker-ce-18.09.2 |
| 核心 | gcr.io/google-containers/pause-amd64| 3.1 |
| 存储 | quay.io/external_storage/nfs-client-provisioner  | v3.1.0-k8s1.11 |
| 网络 | docker.io/coredns/coredns| 1.5.0 |
| 网络 | quay.io/coreos/flannel| v0.11.0-amd64 |
| 网络 | calico/node| v3.4.4 |
| 网络 | calico/cni| v3.4.4 |
| 网络 | calico/kube-controllers| v3.4.4 |
| 网络 | docker.io/traefik  | v1.7.11 |
| 监控 | docker.io/grafana/grafana  | v1.7.11 |
| 监控 | quay.io/prometheus/alertmanager  | v0.15.2 |
| 监控 | quay.io/prometheus/node-exporter  | v1.7.11 |
| 监控 | quay.io/prometheus/prometheus| v2.4.3 |
| 监控 | quay.io/prometheus/pushgateway| v0.5.2 |
| 监控 | quay.io/coreos/kube-state-metrics| v1.4.0 |
| Dashboard | gcr.io/google_containers/heapster-grafana-amd64| v4.4.3 |
| Dashboard | gcr.io/google_containers/heapster-amd64| v1.5.4 |
| Dashboard | gcr.io/google_containers/heapster-influxdb-amd64| v1.5.2 |
| Dashboard | k8s.gcr.io/metrics-server-amd64| v0.3.2 |
| Dashboard | k8s.gcr.io/kubernetes-dashboard-amd64| v1.10.0 |
| 工具 | docker.io/registry| 2 |
| 工具 | docker.io/konradkleine/docker-registry-frontend| v2 |
| 工具 | gcr.io/kubernetes-helm/tiller| v2.12.3 |
| 工具 | quay.io/coreos/configmap-reload| v0.0.1 |
| 工具 | docker.io/appropriate/curl| edge |

操作系统及附属组件：

|  分类  |  组件名称   | 版本  |
|  ---- |  ----  | ----  |
| OS | CentOS 7.6  | CentOS-7-x86_64-Minimal-1810 |
| RPM | wget  | 1.14-18.el7 |
| RPM | net-tools  | 2.0-0.24.20131004git.el7 |
| RPM | iptables-services  | 1.4.21-28.el7 |
| RPM | bind-utils  | 9.9.4-72.el7 |
| RPM | bridge-utils  | 1.5-9.el7 |
| RPM | rsync  | 3.1.2-4.el7 |
| RPM | ntp  | 4.2.6p5-28.el7.centos |
| RPM | chrony  | 3.2-2.el7 |
| RPM | jq  | 1.5-1.el7 |
| RPM | oniguruma  | 5.9.5-3.el7 |
| RPM | glibc-common  | 2.17-260.el7 |
| RPM | kexec-tools  | 2.0.15-21.el7 |
| RPM | sos  | 3.6-9.el7.centos |
| RPM | psacct  | 6.6.1-13.el7 |
| RPM | libseccomp  | 2.3.1-3.el7 |
| RPM | python-passlib  | 1.6.5-2.el7 |
| RPM | python-docker-py  | 1.10.6-9.el7_6|

