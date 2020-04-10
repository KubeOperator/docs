---
id: version-2.5-userguide-openstack
title:  六、在 OpenStack 平台上规划、部署及运营 K8s 集群
original_id: userguide-openstack
---

KubeOperator 支持两种 Kubernetes 集群部署方式，一种是自动模式，另外一种是手动模式，我们推荐使用自动模式。在自动模式下，用户需要准备软件定义的 IaaS 云平台，比如 VMware vSphere 和 Openstack 等。自动模式下 Kubernetes 集群的规划、部署和管理包含以下内容：

- 集群规划 （Day 0）
  - 系统设置 
  - 创建部署计划
  - 准备存储
- 集群部署（Day 1）
  - 创建集群
  - 部署集群
  - 服务暴露
- 集群运营（Day 2）
  - 集群管理
  - 集群升级
  - 集群伸缩
  - 集群备份

本章节以 OpenStack 平台作为示例，讲解整个 K8s 集群的规划、部署及管理过程。

## 1 集群规划 （Day 0）

### 1.1 系统设置

在使用 KubeOperator 之前，需要先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

#### 1.1.1 主机 IP 和集群域名后缀

主机 IP 指安装 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

集群域名后缀为集群节点访问地址的后缀，集群暴露出来的对外服务的 URL 都将以该域名后缀作为访问地址后缀。例如: grafana.apps.cluster.f2c.com。

![setting-1](../../../img-2.4/system-1.png)

#### 1.1.2 LDAP 设置

通过使用 LDAP 统一认证服务可以简化用户管理过程。开启 LDAP ，输入已搭建好的 LDAP 服务信息后，LDAP 中用户将可以在【用户管理】页同步到 KubeOperator 环境中。
参考配置信息如下：

![ldap-1](../../../img-2.5/ldap-1.png)

#### 1.1.3 通知设置

本节通知中可以设置选择收到消息通知方式。获取消息通知除了在 KubeOperator 系统中【消息中心】页的的站内信以外，还支持包括邮件、企业微信和钉钉三种方式。具体设置方法参考如下截图信息。

![notify-1](../../../img-2.5/email.png)

![notify-2](../../../img-2.5/wechat.png)

企业微信相关参数概念请参考如下链接。

https://work.weixin.qq.com/api/doc/90000/90135/90665

![notify-3](../../../img-2.5/dingtalk.png)

钉钉相关参数概念请参考如下链接。
https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq/26eaddd5


### 1.2 创建部署计划

#### 1.2.1 创建区域(Region)

Region：与 公有云中的 Region 概念相似，可以简单理解为地理上的区域。在 OpenStack 体系中我们使用平台自身 Region 实现划分。创建区域时，首先选择提供商，目前仅支持 VMware vSphere 和 Openstack。

![region-1](../../../img-2.2/region-new-openstack.png)

配置参数时，需要提供 OpenStack 环境信息，包括认证地址、用户名、密码，项目 ID 和 Domain 名称，单击【验证】可以校验 OpenStack 信息是否正确。

![region-2](../../../img-2.2/region-new-openstack-2.png)


最后一步选择 OpenStack 的一个 Region。

![region-3](../../../img-2.2/region-new-openstack-3.png)

#### 1.2.2 创建可用区(Zone)

Zone: 与 公有云中的 AZ 概念相似，可以简单理解为 Region 中具体的机房。在 OpenStack 体系中我们使用平台自身的 Zone 来划分。创建可用区时需要选择一个之前添加的区域，如下图：

![zone-1](../../../img-2.2/zone-basicinfo-openstack.png)

选择可用区配置参数时，需要选择 OpenStack 可用区，存储类型以及网络等信息，这些信息依赖于 OpenStack 环境配置。最后单击【检测】按钮，校验输入的起始 IP 地址等信息格式是否正确，检测通过之后才可以单击【完成】。

![zone-2](../../../img-2.2/zone-basicinfo-openstack-2.png)

添加成功后会有一个初始化的过程，状态变为就绪后可以选择该可用区创建部署计划。

![zone-3](../../../img-2.2/zone-status-openstack.png)


#### 1.2.3 创建部署计划(Plan)

Plan: 在 KubeOperator 中用来描述在哪个区域下，哪些可用区中，使用什么样的机器规格，部署什么类型的集群的一个抽象概念。
这里以一主多节点类型举例。

![plan-1](../../../img-2.2/create-plan-openstack.png)

部署计划配置包括选择可用区（可用区可以单选或多选），并设置 Master 节点，Worker 节点的规格，即 CPU，内存和磁盘。

![plan-2](../../../img-2.2/create-plan-openstack-conf.png)

### 1.3 准备存储

KubeOperator 支持自动创建 NFS 存储和添加自行准备的 NFS 存储，下面介绍如何添加 KubeOperator 为集群自动创建的 NFS 存储：
  
KubeOpeartor 控制台【存储】，单击【添加】，选中新建 NFS ，在主机下拉列表，选择事先添加的作为 NFS 的主机 (名称为：nfs-storage)，如果 NFS 无网络访问限制，白名单选项可以默认填 ” * “，挂载路径可按需填写，如 /nfs，点击【提交】。NFS 安装成功后，可以在 NFS 列表中看到该存储处于运行中状态。

添加成功后，创建集群时如果选择 NFS 存储，可以看到该 NFS 存储。

![storage-1](../../../img-2.4/nfs.png)

> 注：自行搭建的 NFS 服务仅适合在开发测试环境使用。KubeOperator 还支持录入已有的 NFS 存储（比如专业的 NAS 存储）。单击【添加】选中“录入 NFS” ，输入存储名称、白名单选项可以默认选项、服务地址、挂载路径，提交即可。需要注意另外一点添加 NFS 存储时，存储的名称不能和集群名称相同。


## 2 用户管理

KubeOperator 系统中的【用户管理】功能模块可以添加用户，包括超级管理员用户和普通用户。而普通用户又可以根据【项目】选择其作为项目管理员还是只读用户。
实现不同用户对不同项目的使用权限的分级管理。

### 2.1 Admin 用户

用户分为超级管理员和普通用户，超级管理员权限和系统默认账号 admin 权限完全相同。新建的超级管理员登录系统后可实现所有 admin 权限的操作。
【用户管理】页，可创建用户，单击【添加】，添加超级管理员时，需要输入用户名、邮箱、密码和开启超级管理员按钮，提交后可在用户列表看见该超级管理员用户。

![user-1](../../../img-2.4/user-1.png)


### 2.2 普通用户

【用户管理】页，创建普通用户，普通用户初始状态没有任何权限。需要【项目】内添加成为项目管理员或只读用户。后续章节详细介绍项目管理员和只读用户。
单击【添加】后，需要输入用户名、邮箱、密码和默认关闭【超级管理员】按钮，提交后可在用户列表看见该普通用户。

![user-1](../../../img-2.4/user-2.png)

admin 管理员可以删除、禁用和开启所有用户，新建超级管理员可以删除、禁用和开启除 admin 账号以外的所有用户，普通用户无上述权限。

## 3 项目管理

KubeOperator 系统中默认创建 KubeOperator 项目，如果 2.3 版本及以下版本升级为 2.4 版本的集群将全部属于 KubeOperator 项目。
超级管理员（admin 账号和新建的超级管理员账号）可以创建多个项目，项目内可以部署多个集群，不同项目之间的集群除超级管理员以外账号是不可见的。
项目管理员管理该项目的集群，通过授权资源（包括主机，存储，部署计划和备份账号）给项目，然后可以开始创建集群。

### 3.1 创建项目

【项目管理】页，点击【添加】，输入项目名称和描述信息提交，创建项目完成后并不能马上创建 K8s 集群，需要授权集群所需的资源，后续 3.3 章节将详细描述。

![project-1](../../../img-2.4/project-1.png)

### 3.2 添加成员

超级管理员账号可以分配一个或多个项目管理员角色给项目，项目管理员可以对该项目创建，安装，升级等等管理集群的操作。
例如，在【项目管理】--【 qa 】项目--【成员】中，单击【管理】，选择管理员和只读用户，确定后在【成员】列表中列出所有项目中的用户，包括用户名和角色。
项目管理员仅可以给项目添加只读用户。

![project-2](../../../img-2.4/project-2.png)

![project-3](../../../img-2.4/project-3.png)


### 3.3 资源授权

在 KubeOperator 环境中的资源需要超级管理员或项目管理员授权给项目后才可以使用，包括主机、存储、备份账号等。
例如，在【项目管理】--【 qa 】项目--【资源】中，授权主机、存储资源。

![project-4](../../../img-2.4/project-4.png)

![project-5](../../../img-2.4/project-5.png)

在选择该项目创建集群时，授权的资源在可选列表里面。所以手动模式集群，必须的资源包括主机和外部存储（假如使用外部存储）。


## 4  集群部署（Day 1）

### 4.1 创建集群

> KubeOperator 当前支持 NFS 和 Cinder 作为外部持久化存储，如果使用 NFS 存储，创建集群前，请自行准备 NFS 存储，并可以被集群主机挂载。我们推荐使用专用 NAS 产品，自行搭建的 NFS 服务仅适合在开发测试环境使用。

#### 4.1.1 基本信息

点击【集群】页的【添加】按钮进行集群的创建。在【基本信息】里输入集群的名称，选择该集群所要部署的 Kubernetes 版本和部署模式。
在离线包列表中可以查看 KubeOperator 当前所提供的 Kubernetes 安装版本详细信息。在后续进行 Kubernetes 集群部署时，可以从这些版本中选择其一进行部署（当前支持1.16.3,1.16.2, 1.15.5，后续会继续跟随 Kubernetes 社区发布离线包）。

![cluster-create-1](../../../img-2.2/cluster-openstack.png)

离线包列表信息：

![package-1](../../../img-2.4/package-1.png)

离线包详情信息：

![package-2](../../../img-2.4/package-2.png)

#### 4.1.2 部署计划

选择 Kubernetes 集群的部署计划和 Worker 节点数量，至少 1 个 Worker 节点，Worker 节点配置建议 4 核 16 G，请保证 OpenStack 环境资源充足，尤其是内存资源。

![cluster-create-2](../../../img-2.2/cluster-plan-openstack-1.png)

#### 4.1.3 配置网络

【配置网络】环节，选择集群的 kube-proxy 运行模式、 ingress 方式以及网络插件，当前 kube-proxy 运行模式支持 iptables 和 ipvs 两种；ingress 支持 trafik 和 nginx；网络插件支持 Flannel 和 Calico，这里我们分别选择 iptables、trafik、Flannel 三种方式。

> 如果集群节点全部都在同一个二层网络下，请选择"host-gw"。如果不是，则选择"vxlan"。"host-gw" 性能优于 "vxlan"。选项 Service CIDR 和 POD CIDR 保证不和已有主机节点 IP 段冲突即可使用。 

![cluster-5](../../../img-2.5/vmwarecluster-5.png)

#### 4.1.4 配置存储

【添加存储】环节，选择持久化存储 Cinder 或者 NFS ，如果选择 NFS，支持两种方式的 NFS，一种是自动创建 NFS 存储，另外一种是用户自行准备的 NFS 存储。 详细描述见 1.3.1 和 1.3.2 节部分。

![cluster-create-4](../../../img-2.2/cluster-storage-cinder.png)

#### 4.1.5 集群配置概览

所有步骤完成后，会有一个集群配置概览页对之前步骤所设参数进行汇总，用户可在此页进行集群配置的最后检查。

![cluster-create-5](../../../img-2.2/cluster-complete-openstack-1.png)

### 4.2 部署集群

在集群列表中点击要部署的集群名称，默认展示的是该集群的【概览】信息。【概览】页中展示了 Kubernetes 集群的诸多详情，包括集群状态，Worker 状态集群描述信息等。点击【概览】页最下方的【安装】按钮进行 Kubernetes 集群的部署。

![cluster-deploy](../../../img-2.2/cluster-summary-openstack.png)

集群部署开始后，将会自动跳转到【任务】页。在【任务】页里可以看到集群部署当前所执行的具体任务信息。

![cluster-deploy-1](../../../img-2.2/cluster-install-openstack-1.png)


如果是内网环境的话，一个典型的 4 节点集群的部署大概需要10分钟左右的时间,【历史】页可以看到详情部署时间信息。在出现类似下图的信息后，表明集群已部署成功。

![cluster-deploy-2](../../../img-2.2/cluster-install-openstack-2.png)

【历史】页可以看到所有完成的任务详情信息，包括部署过程中的日志详情。

![cluster-deploy-3](../../../img-2.2/cluster-history-openstack.png)

> 注：通过自动模式创建的集群里所有的主机，包括 master 和 worker 主机默认用户名和密码为：root / KubeOperator@2019。


## 5 集群运营（Day 2）

### 5.1 集群管理

回到集群的【概览】页，该页提供了 Grafana、Prometheus、Registry-console、Dashboard 、Traefik、Weave Scope 六个管理系统快捷访问方式。这六个系统的访问域名需要在 DNS 服务器中添加相应的域名记录。如没有使用 F5 BIG-IP 暴露服务，也可以通过修改本地主机的 hosts 文件来达到相同的作用。

eg: 

``` bash
# 编辑 /etc/hosts
testerdeMacBook-Pro:~ tester$sudo vim /etc/hosts
# 替换 WORKER_IP 为任意 worker 节点 IP 地址
WORKER_IP grafana.apps.mycluster.fit2cloud.com
WORKER_IP prometheus.apps.mycluster.fit2cloud.com
WORKER_IP registry-ui.apps.mycluster.fit2cloud.com
WORKER_IP dashboard.apps.mycluster.fit2cloud.com
WORKER_IP master-1.mycluster.fit2cloud.com
WORKER_IP traefik.apps.mycluster.fit2cloud.com
WORKER_IP scope.weave.apps.mycluster.fit2cloud.com
```
以上文本也可以直接在集群的【内置应用】页单击【点此获取】复制域名解析规则。

#### 5.1.1 Dashboard

##### 5.1.1.1 KubeOperator Dashboard

KubeOperator 2.2 中新增功能【概览】页，该页面集中显示了集群相关的统计信息，包括集群状态，容量信息，Nodes 数量、Namespaces 数量、Pods 数量等，还包括异常日志，异常 Pod 的信息统计。

![Dashboard-1](../../../img-2.4/ko-dashboard.png)

##### 5.1.1.2 K8s Dashboard

K8s Dashboard 对应的是 Kubernetes 的控制台，从浏览器中访问 Kubernetes 控制台需要用到【令牌】。点击【概览】页下方的【获取TOKEN】按钮获取令牌信息，将令牌信息复制到粘贴板。

![dashboard-1](../../../img-2.4/k8s-dashboard.png)

输入令牌信息后，点击【登录】，则可进入 Kubernetes 控制台。

![dashboard-2](../../../img-2.4/k8s-dashboard-1.png)

#### 5.1.2 集群监控

##### 5.1.2.1 集群事件

KubeOperator 支持获取 K8s 事件，实时更新在 KubeOperator 集群事件页面，包括正常和异常事件，可搜索过去一天/周/月的 Normal 和 Warning 事件，同时支持关键字搜索事件。事件内容和 K8s Dashboard 的 Event 一致，通过 KubeOperator 控制台能够更加直观快速的看到集群的状态信息。

![event-1](../../../img-2.4/event-1.png)

在集群【事件】页，单击信息列的事件，可以获取事件详情信息。

![event-2](../../../img-2.4/event-2.png)

##### 5.1.2.2 访问 Grafana

Grafana 对 Prometheus 采集到的监控数据进行了不同维度的图形化展示，更方便用户了解整个 Kubernetes 集群的运行状况。点击 Grafana 下方的【转到】按钮访问 Grafana 控制台。

集群级别的监控面板：

![grafana-3](../../../img-2.4/grafana-1.png)

节点级别的监控面板：

![grafana-4](../../../img-2.4/grafana-2.png)

#### 5.1.2.3 访问 Weave Scope

Weave Scope 用来监控、可视化和管理 Kubernetes 集群。点击 Weave Scope 下方的【转到】按钮即可访问 Weave Scope 控制台。点击控制台的顶部【Pod】，会自动生成容器之间的关系图，方便理解容器之间的关系，也方便监控容器化和微服务化的应用。Weave Scope 默认的用户名是 admin，密码是 admin123。

![weave-scope-1](../../../img-2.4/weave-scope-2.png)

点击顶部的【Host】，可以远程shell登录各个节点，还可以看到主机的详细信息。

![weave-scope-2](../../../img-2.4/weave-scope-1.png)

##### 5.1.2.4 访问 Prometheus

Prometheus 用来对整个 kubernetes 集群进行监控数据的采集。点击 Prometheus 下方的【转到】按钮即可访问 Prometheus 控制台。

![prometheus-1](../../../img-2.4/prometheus-1.png)

##### 5.1.2.5 健康状态

在 K8s 集群【健康状态】栏，可以看到整体的集群状态，具体包括核心组件 Control Manager，Schedule，etcd 状态和系统组件健康状态。

![cluster-healthy](../../../img-2.4/healthy.png)


#### 5.1.3 集群日志

KubeOperator 系统新增加支持获取 KubeOperator 系统日志和 K8s 集群日志功能。

##### 5.1.3.1 系统日志

【系统日志】页支持查找 KubeOperator 系统日志信息， 日志类型包括 info、debug 和 error 日志，还可以用关键字搜索日志等等日志信息。

![log-1](../../../img-2.4/systemlog.png)

##### 5.1.3.2 集群日志

K8s 集群日志使用 Grafana 日志聚合工具 Loki。Loki 是Grafana Labs 团队的开源项目，它的设计非常经济高效且易于操作，特别适合存储 Kubernetes Pod 日志。

通过访问 Grafana 控制台看到 Loki 日志。

![log-2](../../../img-2.4/loki-2.png)


#### 5.1.4 集群管理
 
##### 5.1.4.1 访问 Registry

Registry 则用来存放 Kubernetes 集群所使用到的 Docker 镜像。Registry 默认的用户名是 admin，密码是 admin123。

![regsitry-1](../../../img-2.4/registry-1.png)

##### 5.1.4.2 访问 Traefik

Traefik 用来作为 kubernetes 集群的HTTP反向代理、负载均衡工具。点击 Trafik 下方的【转到】按钮即可访问 Traefik 控制台。

![traefik-1](../../../img-2.4/traefik.png)

##### 5.1.4.3 Webkubectl

KubeOperator 新增功能支持 Webkubectl 。在集群【概览】页最下面单击 WEBKUBECTL ，在弹出框中可以像在集群中节点执行命令，查询集群信息等操作。

![cluster-webkubectl](../../../img-2.4/webkubectl.png)


### 5.2 集群升级

KubeOperator 支持 K8s 升级。请注意由于 1.15 和 1.16 版本之后变化较大，目前不支持升级从 1.15 升级到 1.16 版本。

在集群列表中点击要进行升级的集群名称，点击【概览】页最下方的【升级】按钮进行 Kubernetes 集群的升级。

![cluster-upgrade-1](../../../img-2.4/upgrade-1.png)

单击【确认】后，系统自动跳转到【任务】页，可以看到升级进度和详细 log 信息。

![cluster-upgrade-2](../../../img-2.4/upgrade-2.png)

升级完成后，可以看到如下信息。

![cluster-upgrade-3](../../../img-2.4/upgrade-3.png)

同时在集群【历史】页，可以通过单击【详情】按钮查看升级的所有 log 信息。

![cluster-upgrade-4](../../../img-2.4/upgrade-4.png)

### 5.3 集群伸缩

此版本 KubeOperator 支持重点新功能：扩容 K8s 集群 worker 节点数量。

KubeOperator 控制台【集群】页，单击一个要扩容的集群名称，即【概览】页面，Worker 状态栏左下方单击【扩容】，在弹出框中选中扩容 worker 节点数量。

![cluster-expand-1](../../../img-2.4/expand-1.png)

确认后，会自动转到【任务】页面，实时查看扩容进度，完成后可以看到如下图所示信息。

![cluster-expand-2](../../../img-2.4/expand-2.png)

### 5.4 集群备份

KubeOperator 目前的备份功能支持三种不同种类的存储，即 AWS S3、aliyun oss 和 Azure 存储。为集群备份和恢复提供存储支持，实现备份和恢复功能。

添加备份账号之前，请首先自行准备好 AWS S3 ，aliyun oss 或者 Azure 存储账号信息，包括 AccessKey，SecretKey，endpoint 和桶/容器信息。
以添加 S3 为例，在【系统设置】的【备份】Tab 也中输入名称和 AccessKey，SecretKey 和端点（对应 AWS S3 系统里的 endpoint），单击【获取桶/容器】获取桶名称，建议在 S3 新建一个桶单独使用，最后提交。

![setting-2](../../../img-2.4/backup-1.png)

在集群【备份】页面，可以看到，KubeOperator 支持的自动备份策略和手动备份，自动备份包括备份间隔，复本保留份数以及可以开启户禁用备份策略，实现集群备份和恢复功能。

![cluster-backup](../../../img-2.4/backup-2.png)

手动备份需要先设置备份策略信息，包括备份间隔、保留份数、选择存储设备以及开启备份，然后单击【立即备份】后，可以在【任务】页看到备份进度。

![cluster-backup-1](../../../img-2.4/backup-3.png)