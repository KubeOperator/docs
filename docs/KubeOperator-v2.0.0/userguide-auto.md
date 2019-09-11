---
id: userguide-auto
title: 使用指南 (自动模式)
---

KubeOperator 支持两种 Kubernetes 集群部署方式，一种是自动模式，另外一种是手动模式，我们推荐使用自动模式。在自动模式下，用户需要准备软件定义的 IaaS 云平台，比如 VMware vSphere 和 Openstack 等。

本章节以 VMware 作为示例，讲解整个部署过程，整个部署示意图如下图所示：
![overview](https://github.com/KubeOperator/docs/blob/master/website/static/img/vmware.png?raw=true)

整个流程包括：

- 1 系统登录：登录 KubeOperator Web 控制台;
- 2 系统设置：设置主机IP和集群域名后缀；
- 3 创建部署计划：创建区域、可用区和部署计划；
- 4 创建和部署集群：创建集群、配置集群和部署集群；
- 5 管理集群：访问 Dashboard、监控、Registry、Weave Scope 等。

## 1 登录

KubeOperator 完全启动后，访问 KubeOperator 控制台，进行登录。默认的登录用户名为 admin，默认密码为kubeoperator@admin123。

> 为了保证系统的安全，请在完成登录后，点击控制台右上角的"修改密码"进行密码的重置

## 2 系统设置

在使用 KubeOperator 之前，需要先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

### 2.1 主机 IP 和 集群域名后缀

主机 IP 指 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

集群域名后缀为集群节点访问地址的后缀，集群暴露出来的对外服务的 URL 都将以该域名后缀作为访问地址后缀。例如: grafana.apps.cluster.f2c.com。

![setting-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/setting-system.png?raw=true)

## 3 创建部署计划

### 3.1 创建区域(Region)

Region：与 AWS 中的 Region 概念相似，可以简单理解为地理上的分区，比如亚洲地区，或者华北地区，再或者北京等等。在 Vsphere 体系中我们使用 DataCenter 实现 Region 的划分。
创建区域时，首先选择提供商，目前仅支持VMware vSphere。
![region-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-region1.png?raw=true)
配置参数时，要已知vSphere环境信息，包括VCenter host ip，用户名和密码信息。最后一步选择vCenter的一个数据中心。
![region-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-region-conf.png?raw=true)

### 3.2 创建可用区(Zone)

Zone: 与 AWS 中的 AZ 概念相似，可以简单理解为 Region 中具体的机房，比如北京1区，北京2区。在 Vsphere 体系中我们使用 Cluster 实现 Zone 的划分。
创建可用区时需要选择一个之前添加的区域，如下图：
![zone-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-zone1.png?raw=true)
选择可用区配置参数时，需要配置集群，资源池，存储类型以及网络适配器等信息。
![zone-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-zone2.png?raw=true)


### 3.3 创建部署计划(Plan)

Plan: 在 KubeOperator 中用来描述在哪个区域下，哪些可用区中，使用什么样的机器规格，部署什么类型的集群的一个抽象概念。
这里我们选择单主多节点类型部署集群.
![plan-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-plan1.png?raw=true)
部署计划配置包括设置master节点，worker节点和Daemon节点的规格，即CPU，内存和磁盘大小。
![plan-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-plan2.png?raw=true)


## 4 创建和部署集群

### 4.1 集群列表

在左侧导航菜单中选择【集群】，进入【集群】页后可以看到已添加集群的详细信息，包括 集群部署的 Kubernetes 版本、部署模式、节点数及运行状态等。

![cluster-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-auto-list.png?raw=true)

### 4.2 创建集群

> KubeOperator 1.0 支持 NFS和VSAN 作为外部持久化存储，如果使用 NFS 存储，创建集群前，请自行准备 NFS 存储，并可以被集群主机挂载。我们推荐使用专用 NAS 产品，自行搭建的 NFS 服务仅适合在开发测试环境使用。

#### 4.2.1 基本信息

点击【集群】页的【添加】按钮进行集群的创建。在【基本信息】里输入集群的名称，选择该集群所要部署的 Kubernetes 版本和部署模式。
在离线包列表中可以查看 KubeOperator 当前所提供的 Kubernetes 安装版本详细信息。在后续进行 Kubernetes 集群部署时，可以从这些版本中选择其一进行部署（当前支持1.15.0,1.15.2，后续会继续跟随 Kubernetes 社区发布离线包）。

![cluster-create-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-create-auto-1.png?raw=true)

![package-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/package-v2.png?raw=true)

![package-2](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/package-2.png?raw=true)

#### 4.2.2 部署计划

选择 Kubernetes 集群的部署计划和 Worker 节点数量。

![cluster-create-2](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-create-auto-2.png?raw=true)

#### 4.2.3 配置网络

【配置网络】环节，选择集群的网络插件，当前版本仅支持 Flannel。

> 如果集群节点全部都在同一个二层网络下，请选择"host-gw"。如果不是，则选择"vxlan"。"host-gw" 性能优于 "vxlan"。

![cluster-create-4](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-create-auto-3.png?raw=true)

#### 4.2.4 配置存储

【添加存储】环节，选择外部持久化存储。

![cluster-create-5](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-create-auto-4.png?raw=true)

#### 4.2.5 配置集群参数

完成检测后，可以对集群的域名参数进行配置，如无特殊要求，推荐使用默认值。

![cluster-create-7](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-create-auto-5.png?raw=true)

#### 4.2.6 集群配置概览

所有步骤完成后，会有一个集群配置概览页对之前步骤所设参数进行汇总，用户可在此页进行集群配置的最后检查。

![cluster-create-8](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-create-auto-6.png?raw=true)

### 4.3 部署集群

在集群列表中点击要进行部署的集群名称，默认展示的是该集群的【概览】信息。【概览】页中展示了 Kubernetes 集群的诸多详情，包括 Kubernetes 版本、集群所用存储、网络模式等。点击【概览】页最下方的【安装】按钮进行 Kubernetes 集群的部署。

![cluster-2](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-auto-overview.png?raw=true)

集群部署开始后，将会自动跳转到【任务】页。在【任务】页里可以看到集群部署当前所执行的具体任务信息。

![cluster-deploy-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-deploy-1.png?raw=true)

如果是内网环境的话，一个典型的 5 节点集群的部署大概需要10分钟左右的时间。在出现类似下图的信息后，表明集群已部署成功：

![cluster-deploy-2](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/cluster-deploy-2.png?raw=true)

### 4.3 服务暴露

TBD：讲解 F5，如果没有 F5 也要讲一些配置 /etc/hosts 的方案。

## 5 管理集群

### 5.1 访问 Kubernetes Dashboard

Dashboard 对应的是 Kubernetes 的控制台，从浏览器中访问 Kubernetes 控制台需要用到【令牌】。点击【概览】页下方的【获取TOKEN】按钮获取令牌信息，将令牌信息复制到粘贴板。

![dashboard-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/dashboard-1.png?raw=true)

输入令牌信息后，点击【登录】，则可进入 Kubernetes 控制台。

![dashboard-2](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/dashboard-2.png?raw=true)

### 5.2 访问 Grafana

Grafana 对 Prometheus 采集到的监控数据进行了不同维度的图形化展示，更方便用户了解整个 Kubernetes 集群的运行状况。点击 Grafana 下方的【转到】按钮访问 Grafana 控制台。

集群级别的监控面板：

![grafana-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/grafana-1.png?raw=true)

节点级别的监控面板：

![grafana-2](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/grafana-2.png?raw=true)

### 5.3 访问 Registry

Registry 则用来存放 Kubernetes 集群所使用到的 Docker 镜像。

![regsitry-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/registry-1.png?raw=true)

### 5.4 访问 Prometheus

Prometheus 用来对整个 kubernetes 集群进行监控数据的采集。点击 Prometheus 下方的【转到】按钮即可访问 Prometheus 控制台。

![prometheus-1](https://github.com/KubeOperator/KubeOperator/blob/master/docs/images/prometheus-1.png?raw=true)

### 5.5 访问 Weave Scope

TBD
