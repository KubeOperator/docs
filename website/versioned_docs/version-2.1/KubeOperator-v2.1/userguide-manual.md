---
id: version-2.1-userguide-manual
title: 四、在自行准备的主机上规划、部署及管理 K8S 集群
original_id: userguide-manual
---

KubeOperator 支持两种 Kubernetes 集群部署方式，一种是手动模式，另外一种是自动模式。手动模式下，用户需要自行准备主机和 NFS 作为持久化存储。

手动模式下 Kubernetes 集群的规划、部署和管理包含以下内容：

- 集群规划 （ Day 0）
  - 系统设置 
  - 准备主机
  - 准备存储
- 集群部署（ Day 1）
  - 创建集群
  - 部署集群
  - 服务暴露
- 集群运维和变更（ Day 2）
  - 集群运维
  - 集群伸缩
  - 集群备份

本章节以手动模式部署一个开发测试用集群为例，需要准备三台主机，每个主机的用途和需求是：

<table>
    <tr>
        <td>名称</td>
        <td>角色</td>
        <td>数量</td>
        <td>操作系统</td>
        <td>最低配置</td>
        <td>推荐配置</td>
        <td>描述</td>
    </tr>
    <tr>
        <td>master-1</td>
        <td>Master</td>
        <td>1</td>
        <td>CentOS 7.6</td>
        <td>2C 4G</td>
        <td>4C 16G</td>
        <td>运行 etcd、kube-apiserver、kube-scheduler、kube-apiserver。</td>
    </tr>
    <tr>
        <td>worker-1</td>
        <td>Worker</td>
        <td>1</td>
        <td>CentOS 7.6</td>
        <td>2C 8G</td>
        <td>8C 32G</td>
        <td>运行 kubelet、应用工作负载。</td>
    </tr>
    <tr>
        <td>nfs-storage</td>
        <td>NFS</td>
        <td>1</td>
        <td>CentOS 7.6</td>
        <td>2C 8G</td>
        <td>4C 16G</td>
        <td>提供 NFS 持久化存储，磁盘建议 500G 以上。</td>
    </tr>    
</table>


## 1 集群规划（ Day 0）

### 1.1 系统设置

在使用 KubeOperator 之前，需要先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

#### 1.1.1 主机 IP 和集群域名后缀

主机 IP 指安装 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

集群域名后缀为集群节点访问地址的后缀，集群暴露出来的对外服务的 URL 都将以该域名后缀作为访问地址后缀。例如: grafana.apps.cluster.f2c.com。

![setting-1](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/setting-system.png?raw=true)

#### 1.1.2 凭据

凭据为 KubeOperator 连接主机资产的凭证。在左侧导航菜单中选择【设置】，进入【设置】页后点击【凭据】TAB 可以看到已添加凭据信息。

![setting-2](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/setting-evidence-1.jpg?raw=true)

点击【添加】按钮添加新的凭据。

![add_credential-1](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/setting-evidence-add.jpg?raw=true)

### 1.2 准备主机

我们将准备并添加三台主机 master-1、worker-1、nfs-storage，用来作为 master 节点、worker 节点 及 NFS 存储。

在左侧导航菜单中选择【主机】，进入【主机】页后可以看到已添加主机的详细信息，包括 IP、CPU、内存、操作系统等。点击【添加】按钮添加主机。在输入主机名称、IP、选择凭据后，点击【提交】按钮即可完成一台主机的添加。

![host-2](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/host-add.jpg?raw=true)

### 1.3 准备存储

KubeOperator 支持自动创建 NFS 存储和添加自行准备的 NFS 存储，供自动模式和手动模式的 K8s 集群使用。下面介绍如何添加自动创建的 NFS 存储：
  
KubeOpeartor 控制台【存储】，单击【添加】，选中新建 NFS ，在主机下拉列表，选择上述第一步添加的 NFS 主机 (名称为：nfs-storage)，如果 NFS 无网络访问限制，白名单选项可以填 ” * “，挂载路径可按需填写，如 /nfs，点击【提交】。NFS 安装成功后，可以在 NFS 列表中看到该存储处于运行中状态。

添加成功后，创建集群时如果选择 NFS 存储，可以看到该 NFS 存储。

![storage-1](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/nfs-add-new.png?raw=true)

> 注：自行搭建的 NFS 服务仅适合在开发测试环境使用。KubeOperator 还支持录入已有的 NFS 存储（比如专业的 NAS 存储）。单击【添加】选中“录入 NFS” ，输入存储名称、白名单选项、服务地址、挂载路径，提交即可。

## 2 集群部署（Day 1）

### 2.1 创建集群

#### 2.1.1 基本信息

点击【集群】页的【添加】按钮进行集群的创建。在【基本信息】里输入集群的名称，选择该集群所要部署的 Kubernetes 版本。

![cluster-create-1](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-basicinfo.jpg?raw=true)

#### 2.1.2 部署模型

选择 Kubernetes 集群的部署模型。KubeOperator 当前版本支持一主一节点和多主多节点。选择部署模型后，KubeOperator 将展示集群中各个角色节点的详细配置要求。

![cluster-create-2](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-model.jpg?raw=true)

> KubeOperator 支持 MultiAZ（多故障域），多主多节点模式适合在  MultiAZ 下部署，实现双活环境下的高可用。

#### 2.1.3 配置节点

【添加主机】环节，把集群所需的主机添加到了 KubeOperator 中。在【配置节点】环节，则可以根据不同的节点角色，选择主机列表中的各个主机。

![cluster-create-3](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-node.jpg?raw=true)

#### 2.1.4 配置网络

【配置网络】环节，选择集群的网络插件，当前版本支持 Flannel 和 calico。

> 如果集群节点全部都在同一个二层网络下，请选择"host-gw"。如果不是，则选择"vxlan"。"host-gw" 性能优于 "vxlan"。

![cluster-create-4](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-network.jpg?raw=true)

#### 2.1.5 配置存储

【添加存储】环节，选择外部持久化存储。

![cluster-create-5](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-storage-nfs.jpg?raw=true)

#### 2.1.6 配置检测

完成上述 5 个步骤后，KubeOperator 会对当前集群所选择的部署节点进行配置检测，包含 CPU、内存和操作系统的检测。

![cluster-create-6](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-check.jpg?raw=true)

#### 2.1.7 集群配置概览

所有步骤完成后，会有一个集群配置概览页对之前步骤所设参数进行汇总，用户可在此页进行集群配置的最后检查。

![cluster-create-8](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-complate.jpg?raw=true)

### 2.2 部署集群

在集群列表中点击要进行部署的集群名称，默认展示的是该集群的【概览】信息。【概览】页中展示了 Kubernetes 集群的诸多详情，包括集群状态，Worker 状态，集群描述信息等。点击【概览】页最下方的【安装】按钮进行 Kubernetes 集群的部署。

![cluster-deploy](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-summary.jpg?raw=true)

集群部署开始后，将会自动跳转到【任务】页。在【任务】页里可以看到集群部署当前所执行的具体任务信息。

![cluster-deploy-1](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-manu-install-1.jpg?raw=true)

如果是内网环境的话，一个典型的 4 节点集群的部署大概需要 10 分钟左右的时间。在出现类似下图的信息后，表明集群已部署成功：

![cluster-deploy-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-install-2.png?raw=true)

### 2.3 服务暴露

在集群列表中点击集群名称，点击【F5 BIG-IP】添加 F5 BIG-IP，为 Kubernetes 配置 F5-BIGIP-CONTROLLER 后，我们可以通过 F5 BIGIP 设备向外网暴露服务。

![cluster-f5](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/f5-bigip-1.png?raw=true)


## 3 集群运维和变更（Day 2）

### 3.1 集群运维

#### 3.1.1 集群管理

回到集群的【概览】页，该页提供了 Grafana、Prometheus、Registry-console、Dashboard 、Traefik、Weave Scope 六个管理系统快捷访问方式。这六个系统的访问域名需要在 DNS 服务器中添加相应的域名记录。如无条件，也可以通过修改本地 /etc/hosts 文件来达到相同的作用。

eg: 

``` bash
# 编辑 /etc/hosts
$ vim /etc/hosts
# 替换 WORKER_IP 为任意 worker 节点 IP 地址
WORKER_IP grafana.apps.whfay.f2c.com
WORKER_IP prometheus.apps.whfay.f2c.com
WORKER_IP registry-ui.apps.whfay.f2c.com
WORKER_IP dashboard.apps.whfay.f2c.com
WORKER_IP master-1.whfay.f2c.com
WORKER_IP traefik.apps.whfay.f2c.com
WORKER_IP scope.weave.apps.whfay.f2c.com
```

##### 3.1.1.1 访问 Dashboard

Dashboard 对应的是 Kubernetes 的控制台，从浏览器中访问 Kubernetes 控制台需要用到【令牌】。点击【概览】页下方的【获取TOKEN】按钮获取令牌信息，将令牌信息复制到粘贴板。

![dashboard-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/dashboard-1.png?raw=true)

输入令牌信息后，点击【登录】，则可进入 Kubernetes 控制台。

![dashboard-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/dashboard-2.png?raw=true)

##### 3.1.1.2 访问 Grafana

Grafana 对 Prometheus 采集到的监控数据进行了不同维度的图形化展示，更方便用户了解整个 Kubernetes 集群的运行状况。点击 Grafana 下方的【转到】按钮访问 Grafana 控制台。

集群级别的监控面板：

![grafana-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/grafana-1.png?raw=true)

节点级别的监控面板：

![grafana-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/grafana-2.png?raw=true)

##### 3.1.1.3 访问 Registry

Registry 则用来存放 Kubernetes 集群所使用到的 Docker 镜像。

![regsitry-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/registry-1.png?raw=true)

##### 3.1.1.4 访问 Prometheus

Prometheus 用来对整个 kubernetes 集群进行监控数据的采集。点击 Prometheus 下方的【转到】按钮即可访问 Prometheus 控制台。

![prometheus-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/prometheus-1.png?raw=true)

##### 3.1.1.5 访问 Traefik

Traefik 用来作为 kubernetes 集群的HTTP反向代理、负载均衡工具。点击 Trafik 下方的【转到】按钮即可访问 Traefik 控制台。

![prometheus-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/traefik.png?raw=true)

##### 3.1.1.6 访问 Weave Scope

Weave Scope 用来监控、可视化和管理 kubernetes 集群。点击 Weave Scope 下方的【转到】按钮即可访问 Weave Scope 控制台。点击控制台的顶部【Pod】，会自动生成容器之间的关系图，方便理解容器之间的关系，也方便监控容器化和微服务化的应用。

![weave-scope-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/weave-scope-2.png?raw=true)

点击顶部的【Host】，可以远程shell登录各个节点，还可以看到主机的详细信息。

![weave-scope-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/weave-scope-1.png?raw=true)

##### 3.1.1.7 Webkubectl

KubeOperator 新增功能支持 Webkubectl 。

![cluster-webkubectl](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-webkubectl.png?raw=true)

#### 3.1.2 集群监控

在 K8s 集群【健康状态】栏，可以看到整体的集群状态，具体包括 Control Manager，Schedule，etcd 和 nodes 的实时健康状态以及过去半年 K8s 集群运行状态。

![cluster-healthy](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-heathy-1.png?raw=true)

### 3.2 集群升级

KubeOperator 支持 K8s 升级。

在集群列表中点击要进行升级的集群名称，点击【概览】页最下方的【升级】按钮进行 Kubernetes 集群的升级。

![cluster-upgrade-1](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-upgrade.png?raw=true)

单击【确认】后，系统自动跳转到【任务】页，可以看到升级进度和详细 log 信息。

![cluster-upgrade-2](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-upgrade-1.png?raw=true)

升级完成后，可以看到如下信息。

![cluster-upgrade-3](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-upgrade-2.png?raw=true)

同时在集群【历史】页，可以通过单击【详情】按钮查看升级的所有 log 信息。

![cluster-upgrade-4](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/log.png?raw=true)

### 3.3 集群备份

KubeOperator 目前的备份功能支持三种不同种类的存储，即 AWS S3、aliyun oss 和 Azure 存储。为集群备份和恢复提供存储支持，实现备份和恢复功能。

添加备份账号之前，请首先自行准备好 AWS S3 ，aliyun oss 或者 Azure 存储账号信息，包括 AccessKey，SecretKey，endpoint 和桶/容器信息。
以添加 S3 为例，在【系统设置】的【备份】Tab 也中输入名称和 AccessKey，SecretKey 和端点（对应 AWS S3 系统里的 endpoint），单击【获取桶/容器】获取桶名称，建议在 S3 新建一个桶单独使用，最后提交。

![setting-2](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/setting-backup.png?raw=true)

在集群【备份】页面，可以看到，KubeOperator 支持的备份策略，包括备份间隔，复本保留分数以及可以开启户禁用备份策略，实现集群备份和恢复功能。

![cluster-backup](https://github.com/KubeOperator/docs/blob/master/website/static/img-2.1/cluster-backup.png?raw=true)

