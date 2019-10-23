---
id: version-2.1.0-userguide-manual
title: 在自行准备的主机上部署 k8s 集群
original_id: userguide-manual
---

KubeOperator 支持两种 Kubernetes 集群部署方式，一种是自动模式，另外一种是手动模式。自动模式下，用户需要自行准备主机和 NFS 作为持久化存储。手动模式下的 k8s 集群部署流程为：

- 1 登录：登录 Web 控制台;
- 2 系统设置：包括主机登录凭据和集群域名后缀等；
- 3 选择离线包：选择 k8s 版本；
- 4 准备主机：准备 k8s 集群所需要的主机；
- 5 创建和部署集群：创建集群、配置集群和部署集群
- 6 管理集群：访问 Dashboard、监控系统和 Registry 等。

## 1 登录

KubeOperator 完全启动后，访问 KubeOperator 控制台，进行登录。默认的登录用户名为 admin，默认密码为 kubeoperator@admin123。

> 为了保证系统的安全，请在完成登录后，点击控制台右上角的"修改密码"进行密码的重置。

## 2 系统设置

在使用 KubeOperator 之前，需要先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

### 2.1 主机 IP 和 集群域名后缀

主机 IP 指 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

集群域名后缀为集群节点访问地址的后缀，集群暴露出来的对外服务的 URL 都将以该域名后缀作为访问地址后缀。例如: grafana.apps.cluster.f2c.com。

![setting-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/setting-system.png?raw=true)

### 2.2 凭据

凭据为 KubeOperator 连接主机资产的凭证，可以使用 password。在左侧导航菜单中选择【设置】，进入【设置】页后点击【凭据】TAB 可以看到已添加凭据信息。

![credential-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/setting-credential.png?raw=true)

点击【添加】按钮添加新的凭据。

![add_credential-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/setting-credential1.png?raw=true)

## 3 选择离线包

在离线包列表中可以查看 KubeOperator 当前所提供的 Kubernetes 安装版本详细信息。在后续进行 Kubernetes 集群部署时，可以从这些版本中选择其一进行部署（当前支持1.15.0和1.15.3版本后续会跟随 Kubernetes 社区发布离线包）。

![package-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/package.png?raw=true)

![package-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/package-detail.png?raw=true)

## 4 准备主机

### 4.1 主机需求

KubeOperator 当前版本仅支持一主多节点的部署和管理，对于集群中各节点的要求如下：
<table>
    <tr>
        <td>角色</td>
        <td>数量</td>
        <td>操作系统</td>
        <td>最低配置</td>
        <td>推荐配置</td>
        <td>描述</td>
    </tr>
    <tr>
        <td>daemon</td>
        <td>1</td>
        <td>CentOS 7.6</td>
        <td>1C 2G</td>
        <td>2C 4G</td>
        <td>集群内 NTP 服务和 DNS 服务。</td>
    </tr>
    <tr>
        <td>master</td>
        <td>1</td>
        <td>CentOS 7.6</td>
        <td>2C 4G</td>
        <td>4C 16G</td>
        <td>运行 etcd、kube-apiserver、kube-scheduler、kube-apiserver。</td>
    </tr>
    <tr>
        <td>worker</td>
        <td>3+</td>
        <td>CentOS 7.6</td>
        <td>2C 8G</td>
        <td>8C 32G</td>
        <td>运行 kubelet、应用工作负载。</td>
    </tr>
</table>

### 4.2 添加主机

在左侧导航菜单中选择【主机】，进入【主机】页后可以看到已添加主机的详细信息，包括 IP、CPU、内存、操作系统等。点击【添加】按钮添加新的主机。在输入完主机名称、IP、选择凭据后，点击【提交】按钮即可完成一台主机的添加。

![host-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/host.png?raw=true)

![host-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/host-add.png?raw=true)

## 5 创建和部署集群

### 5.1 集群列表

在左侧导航菜单中选择【集群】，进入【集群】页后可以看到已添加集群的详细信息，包括 集群部署的 Kubernetes 版本、节点数，部署模式、选择的部署计划及运行状态等。

![cluster-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster1.png?raw=true)

### 5.2 创建集群

> KubeOperator 2.0 手动模式仅支持 NFS 作为外部持久化存储，创建集群前，请自行准备 NFS 存储，并可以被集群主机挂载。我们推荐使用专用 NAS 产品，自行搭建的 NFS 服务仅适合在开发测试环境使用。

#### 5.2.1 基本信息

点击【集群】页的【添加】按钮进行集群的创建。在【基本信息】里输入集群的名称，选择该集群所要部署的 Kubernetes 版本。

![cluster-create-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-basicinfo.png?raw=true)

#### 5.2.2 部署模型

选择 Kubernetes 集群的部署模型。KubeOperator 当前版本支持一主多节点和多主多节点。选择部署模型后，KubeOperator 将展示集群中各个角色节点的详细配置要求。

![cluster-create-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-model.png?raw=true)

> 多主多节点模式适合在 MultiAZ（多故障域）下部署，实现双活环境下的高可用。KubeOperator 2.1 版本会支持 MultiAZ。

#### 5.2.3 配置节点

【添加主机】环节，把集群所需的主机添加到了 KubeOperator 中。在【配置节点】环节，则可以根据不同的节点角色，选择主机列表中的各个主机。

![cluster-create-3](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-node1.png?raw=true)

#### 5.2.4 配置网络

【配置网络】环节，选择集群的网络插件，当前版本支持 Flannel和calico。

> 如果集群节点全部都在同一个二层网络下，请选择"host-gw"。如果不是，则选择"vxlan"。"host-gw" 性能优于 "vxlan"。

![cluster-create-4](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-network.png?raw=true)

#### 5.2.5 配置存储

【添加存储】环节，选择外部持久化存储。

![cluster-create-5](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-store1.png?raw=true)

#### 5.2.6 配置检测

完成上述 5 个步骤后，KubeOperator 会对当前集群所选择的部署节点进行配置检测，包含 CPU、内存和操作系统的检测。

![cluster-create-6](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-check.png?raw=true)

#### 5.2.7 配置集群参数

完成检测后，可以对集群的域名参数进行配置，如无特殊要求，推荐使用默认值。

![cluster-create-7](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-para.png?raw=true)

#### 5.2.8 集群配置概览

所有步骤完成后，会有一个集群配置概览页对之前步骤所设参数进行汇总，用户可在此页进行集群配置的最后检查。

![cluster-create-8](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-complate.png?raw=true)

### 5.3 部署集群

在集群列表中点击要进行部署的集群名称，默认展示的是该集群的【概览】信息。【概览】页中展示了 Kubernetes 集群的诸多详情，包括 Kubernetes 版本、集群所用存储、网络模式等。点击【概览】页最下方的【安装】按钮进行 Kubernetes 集群的部署。

![cluster-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-summary1.png?raw=true)

集群部署开始后，将会自动跳转到【任务】页。在【任务】页里可以看到集群部署当前所执行的具体任务信息。

![cluster-deploy-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-install.png?raw=true)

如果是内网环境的话，一个典型的 5 节点集群的部署大概需要10分钟左右的时间。在出现类似下图的信息后，表明集群已部署成功：

![cluster-deploy-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-install1.png?raw=true)

### 5.4 卸载集群

在集群列表中点击要进行卸载的集群名称，点击【概览】页最下方的【卸载】按钮进行 Kubernetes 集群的卸载。注意的是和自动模式部署不同，卸载后的所有主机仍在该集群列表中，仅卸载kebernetes集群。

![cluster-uninstall](https://github.com/KubeOperator/docs/blob/master/website/static/img/cluster-manu-uninstall.png?raw=true)

## 6 管理集群

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

### 6.1 访问 Dashboard

Dashboard 对应的是 Kubernetes 的控制台，从浏览器中访问 Kubernetes 控制台需要用到【令牌】。点击【概览】页下方的【获取TOKEN】按钮获取令牌信息，将令牌信息复制到粘贴板。

![dashboard-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/dashboard-1.png?raw=true)

输入令牌信息后，点击【登录】，则可进入 Kubernetes 控制台。

![dashboard-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/dashboard-2.png?raw=true)

### 6.2 访问 Grafana

Grafana 对 Prometheus 采集到的监控数据进行了不同维度的图形化展示，更方便用户了解整个 Kubernetes 集群的运行状况。点击 Grafana 下方的【转到】按钮访问 Grafana 控制台。

集群级别的监控面板：

![grafana-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/grafana-1.png?raw=true)

节点级别的监控面板：

![grafana-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/grafana-2.png?raw=true)

### 6.3 访问 Registry

Registry 则用来存放 Kubernetes 集群所使用到的 Docker 镜像。

![regsitry-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/registry-1.png?raw=true)

### 6.4 访问 Prometheus

Prometheus 用来对整个 kubernetes 集群进行监控数据的采集。点击 Prometheus 下方的【转到】按钮即可访问 Prometheus 控制台。

![prometheus-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/prometheus-1.png?raw=true)

### 6.5 访问 Traefik

Traefik 用来作为 kubernetes 集群的HTTP反向代理、负载均衡工具。点击 Trafik 下方的【转到】按钮即可访问 Traefik 控制台。

![prometheus-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/traefik.png?raw=true)

### 6.6 访问 Weave Scope

Weave Scope 用来监控、可视化和管理 kubernetes 集群。点击 Weave Scope 下方的【转到】按钮即可访问 Weave Scope 控制台。点击控制台的顶部【Pod】，会自动生成容器之间的关系图，方便理解容器之间的关系，也方便监控容器化和微服务化的应用。

![weave-scope-1](https://github.com/KubeOperator/docs/blob/master/website/static/img/weave-scope-2.png?raw=true)

点击顶部的【Host】，可以远程shell登录各个节点，还可以看到主机的详细信息。

![weave-scope-2](https://github.com/KubeOperator/docs/blob/master/website/static/img/weave-scope-1.png?raw=true)

