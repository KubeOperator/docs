---
id: version-2.0.0-userguide-vsphere
title: 在 vSphere 平台上部署 k8s 集群
original_id: userguide-vsphere
---

KubeOperator 支持两种 Kubernetes 集群部署方式，一种是自动模式，另外一种是手动模式，我们推荐使用自动模式。在自动模式下，用户需要准备软件定义的 IaaS 云平台，比如 VMware vSphere 和 Openstack 等。

本章节以 VMware 作为示例，讲解整个部署过程，整个部署示意图如下图所示：
![overview](https://github.com/KubeOperator/docs/blob/master/website/static/img/vmware.png?raw=true)

整个流程包括：

- 1 登录：登录 KubeOperator Web 控制台;
- 2 系统设置：设置主机IP和集群域名后缀；
- 3 创建部署计划：创建区域、可用区和部署计划；
- 4 创建和部署集群：创建集群、配置集群和部署集群；
- 5 管理集群：访问 Dashboard、监控、Registry、Weave Scope 等。

## 1 登录

KubeOperator 完全启动后，访问 KubeOperator 控制台，进行登录。默认的登录用户名为 admin，默认密码为 kubeoperator@admin123。
KubeOperator 控制台 URL：http://host-ip ，将 host-ip 改为安装 KubeOperator 的主机 IP 地址。

![login-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/KubeOperator-login.png?raw=true)

> 为了保证系统的安全，请在完成登录后，点击控制台右上角的"修改密码"进行密码的重置。

## 2 系统设置

在使用 KubeOperator 之前，需要先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

### 2.1 主机 IP 和集群域名后缀

主机 IP 指 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

集群域名后缀为集群节点访问地址的后缀，集群暴露出来的对外服务的 URL 都将以该域名后缀作为访问地址后缀。例如: grafana.apps.cluster.f2c.com。

![setting-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/setting-system.png?raw=true)

## 3 创建部署计划

### 3.1 创建区域(Region)

Region：与 公有云中的 Region 概念相似，可以简单理解为地理上的区域。在 vSphere 体系中我们使用 DataCenter 实现 Region 的划分。创建区域时，首先选择提供商，目前仅支持 VMware vSphere。

![region-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-region1.png?raw=true)

配置参数时，需要提供 vSphere 环境信息，包括 vCenter IP，用户名和密码。

![region-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-region-conf.png?raw=true)

最后一步选择 vCenter 的一个数据中心。

![region-3](https://github.com/KubeOperator/docs/blob/master/website/static/img/region-datacenter.png?raw=true)

### 3.2 创建可用区(Zone)

Zone: 与 公有云中的 AZ 概念相似，可以简单理解为 Region 中具体的机房。在 vSphere 体系中我们使用不同的 Cluster 或者同个 Cluster 下的不同 Resource Pool 来实现 Zone 的划分。创建可用区时需要选择一个之前添加的区域，如下图：

![zone-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-zone1.png?raw=true)

选择可用区配置参数时，需要选择计算集群，资源池，存储类型以及网络适配器等信息，这些信息依赖于 vCenter 环境配置。

![zone-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-zone2.png?raw=true)

### 3.3 创建部署计划(Plan)

Plan: 在 KubeOperator 中用来描述在哪个区域下，哪些可用区中，使用什么样的机器规格，部署什么类型的集群的一个抽象概念。
这里以单主多节点类型举例.

![plan-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-plan1.png?raw=true)

部署计划配置包括设置 Master 节点，Worker 节点和 Daemon 节点的规格，即 CPU，内存和磁盘大小。

![plan-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/create-plan2.png?raw=true)

## 4 创建和部署集群

### 4.1 集群列表

在左侧导航菜单中选择【集群】，进入【集群】页后可以看到已添加集群的详细信息，包括 集群部署的 Kubernetes 版本、部署模式、节点数及运行状态等。

![cluster-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster1.png?raw=true)

### 4.2 创建集群

> KubeOperator 当前支持 NFS 和 vSAN 作为外部持久化存储，如果使用 NFS 存储，创建集群前，请自行准备 NFS 存储，并可以被集群主机挂载。我们推荐使用专用 NAS 产品，自行搭建的 NFS 服务仅适合在开发测试环境使用。

#### 4.2.1 基本信息

点击【集群】页的【添加】按钮进行集群的创建。在【基本信息】里输入集群的名称，选择该集群所要部署的 Kubernetes 版本和部署模式。
在离线包列表中可以查看 KubeOperator 当前所提供的 Kubernetes 安装版本详细信息。在后续进行 Kubernetes 集群部署时，可以从这些版本中选择其一进行部署（当前支持1.15.0, 1.15.3，后续会继续跟随 Kubernetes 社区发布离线包）。

![cluster-create-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-basicinfo.png?raw=true)

离线包列表信息：
![package-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/package.png?raw=true)

离线包详情信息：

![package-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/package-detail.png?raw=true)

#### 4.2.2 部署计划

选择 Kubernetes 集群的部署计划和 Worker 节点数量。

![cluster-create-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-plan.png?raw=true)

#### 4.2.3 配置网络

【配置网络】环节，选择集群的网络插件，当前版本支持 Flannel 和 Calico 两种网络方案。

> 对于 Flannel，如果集群节点全部都在同一个二层网络下，请选择"host-gw"。如果不是，则选择"vxlan"。"host-gw" 性能优于 "vxlan"。

![cluster-create-3](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-confnetwork.png?raw=true)

#### 4.2.4 配置存储

【添加存储】环节，选择外部持久化存储。

![cluster-create-4](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-confstore1.png?raw=true)

#### 4.2.5 配置集群参数

完成检测后，可以对集群的域名参数进行配置，如无特殊要求，推荐使用默认值。

![cluster-create-5](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-confpara.png?raw=true)

#### 4.2.6 集群配置概览

所有步骤完成后，会有一个集群配置概览页对之前步骤所设参数进行汇总，用户可在此页进行集群配置的最后检查。

![cluster-create-6](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-complate.png?raw=true)

### 4.3 部署集群

在集群列表中点击要进行部署的集群名称，默认展示的是该集群的【概览】信息。【概览】页中展示了 Kubernetes 集群的诸多详情，包括 Kubernetes 版本、集群所用存储、网络模式等。点击【概览】页最下方的【安装】按钮进行 Kubernetes 集群的部署。

![cluster-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-summary.png?raw=true)

集群部署开始后，将会自动跳转到【任务】页。在【任务】页里可以看到集群部署当前所执行的具体任务信息。

![cluster-deploy-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-task1.png?raw=true)

如果是内网环境的话，一个典型的 5 节点集群的部署大概需要10分钟左右的时间,【历史】页可以看到详情部署时间信息。在出现类似下图的信息后，表明集群已部署成功：

![cluster-deploy-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-task2.png?raw=true)

【历史】页可以看到所有完成的任务详情信息。

![cluster-deploy-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-history1.png?raw=true)

> 注：通过自动模式创建的集群里所有的主机，包括master，daemon和worker主机默认用户名和密码为：root / KubeOperator@2019。

### 4.4 卸载集群

在集群列表中点击要进行卸载的集群名称，点击【概览】页最下方的【卸载】按钮进行 Kubernetes 集群的卸载。卸载后的集群所有主机将被彻底移除，不会保留在主机列表中。

![cluster-uninstall](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-uninstall.png?raw=true)

### 4.5 服务暴露

在集群列表中点击集群名称，点击【F5 BIG-IP】添加F5 BIG-IP，为Kubernetes配置 F5-BIGIP-CONTROLLER后，我们可以通过 F5 BIGIP 设备向外网暴露服务。

![cluster-f5](https://github.com/KubeOperator/docs/blob/master/website/static/img/f5-bigip.jpeg?raw=true)

## 5 管理集群

### 5.1 访问 Dashboard

Dashboard 对应的是 Kubernetes 的控制台，从浏览器中访问 Kubernetes 控制台需要用到【令牌】。点击【概览】页下方的【获取TOKEN】按钮获取令牌信息，将令牌信息复制到粘贴板。

![dashboard-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/dashboard-1.png?raw=true)

输入令牌信息后，点击【登录】，则可进入 Kubernetes 控制台。

![dashboard-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/dashboard-2.png?raw=true)

### 5.2 访问 Grafana

Grafana 对 Prometheus 采集到的监控数据进行了不同维度的图形化展示，更方便用户了解整个 Kubernetes 集群的运行状况。点击 Grafana 下方的【转到】按钮访问 Grafana 控制台。

集群级别的监控面板：

![grafana-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/grafana-1.png?raw=true)

节点级别的监控面板：

![grafana-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/grafana-2.png?raw=true)

### 5.3 访问 Registry

Registry 则用来存放 Kubernetes 集群所使用到的 Docker 镜像。

![regsitry-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/registry-1.png?raw=true)

### 5.4 访问 Prometheus

Prometheus 用来对整个 kubernetes 集群进行监控数据的采集。点击 Prometheus 下方的【转到】按钮即可访问 Prometheus 控制台。

![prometheus-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/prometheus-1.png?raw=true)

### 5.5 访问 Traefik

Traefik 用来作为 kubernetes 集群的HTTP反向代理、负载均衡工具。点击 Trafik 下方的【转到】按钮即可访问 Traefik 控制台。

![prometheus-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/traefik.png?raw=true)

### 5.6 访问 Weave Scope

Weave Scope 用来监控、可视化和管理 kubernetes 集群。点击 Weave Scope 下方的【转到】按钮即可访问 Weave Scope 控制台。点击控制台的顶部【Pod】，会自动生成容器之间的关系图，方便理解容器之间的关系，也方便监控容器化和微服务化的应用。

![weave-scope-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/weave-scope-2.png?raw=true)

点击顶部的【Host】，可以远程shell登录各个节点，还可以看到主机的详细信息。

![weave-scope-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/weave-scope-1.png?raw=true)




