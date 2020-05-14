---
id: version-2.6-userguide-manual
title: 四、在自行准备的主机上规划、部署及运营 K8s 集群
original_id: userguide-manual
---

KubeOperator 支持两种 Kubernetes 集群部署方式，一种是手动模式，另外一种是自动模式。手动模式下，用户需要自行准备主机,如果使用 NFS 作为持久化存储还需要准备 NFS 存储主机。

手动模式下 Kubernetes 集群的规划、部署和管理包含以下内容：

- 集群规划 （ Day 0）
  - 系统设置 
  - 准备主机
  - 准备存储
- 集群部署（ Day 1）
  - 创建集群
  - 部署集群
  - 服务暴露
- 集群运营（Day 2）
  - 集群管理
  - 集群升级
  - 集群伸缩
  - 集群备份

本章节以手动模式部署一个开发测试用集群为例，需要准备三台主机，如果使用通过 Rook 支持 Ceph 存储方案，则不需要准备存储主机。每个主机的用途和需求是：

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
        <td>运行 etcd、kube-apiserver、kube-scheduler。</td>
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

在使用 KubeOperator 之前，必须先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

#### 1.1.1 主机 IP 、集群域名后缀 和 NTP Server

在左侧导航菜单中选择【系统设置】，默认显示系统页中，

本机 IP ：指安装 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

域名后缀：为集群节点默认访问地址的后缀，集群暴露出来的对外服务的 URL 都将以该域名后缀作为访问地址后缀，例如: grafana.apps.mycluster.fit2cloud.com。同时支持创建集群时修改域名后缀。

![setting-1](../../../img-2.4/system-1.png)

NTP Server ：用来实现集群所有主机时间同步，默认可以为空，也可以自建或网上查找公共的 NTP Server。

#### 1.1.2 凭据

凭据为 KubeOperator 连接主机资产的凭证。在左侧导航菜单中选择【系统设置】，进入【系统设置】页后点击【凭据】TAB 可以看到已添加凭据信息。

点击【添加】按钮添加 password 方式的凭据。

![key-1](../../../img-2.4/key-1.png)

凭据也可以使用密钥方式登录主机。单击【添加】按钮，选择 privatekey 方式登录目标主机，输入凭据名称和 root 账号，然后将 id_rsa 私钥内容复制到密钥框里，确认。

![key-2](../../../img-2.4/key-2.png)

> 注：密钥方法连接主机举例说明：在 KubeOperator 主机中首先生成 id_rsa 和 id_rsa.pub 密钥对，将 id_rsa.pub 公钥里面内容添加要连接的目标主机 authorized_keys 文件中，authorized_keys 文件权限需要设置为 600 。然后在 KubeOperator 控制台的【凭据】页面，将开始生成的 id_rsa 私钥文件内容复制到凭据的密钥框中。注意这里的账号需要 root 账号。

#### 1.1.3 LDAP 设置

通过使用 LDAP 统一认证服务可以简化用户管理过程。开启 LDAP ，输入已搭建好的 LDAP 服务信息后，LDAP 中用户将可以在【用户管理】页同步到 KubeOperator 环境中。
参考配置信息如下：

![ldap-1](../../../img-2.5/ldap-1.png)

#### 1.1.4 通知设置

本节通知中可以设置选择收到消息通知方式。获取消息通知除了在 KubeOperator 系统中【消息中心】页的的站内信以外，还支持包括邮件、企业微信和钉钉三种方式。具体设置方法参考如下截图信息。

![notify-1](../../../img-2.5/email.png)

![notify-2](../../../img-2.5/wechat.png)

企业微信相关参数概念请参考如下链接。

https://work.weixin.qq.com/api/doc/90000/90135/90665

![notify-3](../../../img-2.5/dingtalk.png)

钉钉相关参数概念请参考如下链接。
https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq/26eaddd5


### 1.2 准备主机

我们将准备添加四台主机 一个 master、三个 worker、如果使用 NFS 持久化存储，还需要 NFS 存储主机(例如名称为 nfs-1)，分别作为 master 节点、worker 节点 及 NFS 存储。

#### 1.2.1 添加主机

在左侧导航菜单中选择【主机】，进入【主机】页后可以看到已添加主机的详细信息，包括 IP、CPU、内存、操作系统等。
点击【添加】按钮添加主机。输入名称和 IP 地址、指定端口号、选择对应的凭据，最后点击【提交】按钮即可完成一台主机的添加。同样地，依次添加 master-1，worker-1，worker-2，worker-3 和 nfs-1 三台主机。

> 注：推荐使用全新的机器 <br/>
KubeOperator部署机不能作为kubernetes集群节点使用。

![host-1](../../../img-2.4/master.png) 

#### 1.2.2 导入主机

还可以通过导入 Excel 格式支持一次添加超多主机，Excel 格式很简单，需要包括主机名称，主机 ip、端口和凭据名称即可。在主机导入弹出框中可以下载 Excel 模版。

【主机】页-【导入】-【添加】，选择要上传的 Excel 格式主机列表，再单击【上传】，上传进度完成后【确认】即可完成多个主机的添加。

![host-2](../../../img-2.5/import.png) 


### 1.3 准备存储

KubeOperator 支持自动创建 NFS 存储和添加自行准备的 NFS 存储以外，新增加支持云原生存储解决方案 Rook Ceph 。下面分别介绍如何添加 KubeOperator 为集群自动创建的 NFS 存储和外部 Ceph 存储。
  
#### 1.3.1 添加外部 NFS 存储
KubeOpeartor 控制台【存储】，单击【添加】，选中新建 NFS ，在主机下拉列表，选择上述 1.2 节添加的 NFS 主机 (名称为：nfs-1)，如果 NFS 无网络访问限制，白名单选项可以默认填 ” * “，挂载路径可按需填写，如 /nfs-1，点击【提交】。NFS 安装成功后，可以在 NFS 列表中看到该存储处于运行中状态。

添加成功后，创建集群时如果选择 NFS 存储，可以看到该 NFS 存储。

![storage-1](../../../img-2.4/nfs.png)

> 注：本小节是可选章节，如果使用 Rook Ceph 存储方案，则不需要事前准备 NFS 存储。
自行搭建的 NFS 服务仅适合在开发测试环境使用。KubeOperator 还支持录入已有的 NFS 存储（比如专业的 NAS 存储）。单击【添加】选中“录入 NFS” ，输入存储名称、白名单选项可以默认选项、服务地址、挂载路径，提交即可。需要注意另外一点添加 NFS 存储时，存储的名称不能和集群名称相同。

#### 1.3.2 添加外部 Ceph 存储

外部 Ceph 存储环境需要用户自行准备好 Ceph 存储资源，将存储配置信息添加到 KubeOperator 系统即可以在创建集群时选择该存储。

![storage-2](../../../img-2.4/ceph.png)

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

## 4 集群部署（Day 1）

### 4.1 创建集群

#### 4.1.1 基本信息

项目管理员账号登录 KubeOperator 系统后，点击【集群】页的【添加】按钮进行集群的创建。在【基本信息】里首先选择项目名称（该项目管理员可以是多个项目的管理员），然后输入集群的名称，选择该集群所要部署的 Kubernetes 版本，目前支持 K8s 最新版本为 1.16.7。

![cluster-1](../../../img-2.4/cluster-1.png)

> 注：集群名称不要和主机名称、存储节点名称相同。

#### 4.1.2 部署模型

选择 Kubernetes 集群的部署模型。KubeOperator 当前支持一主多节点和多主多节点。选择部署模型后，KubeOperator 将展示集群中各个角色节点的详细配置要求，目前支持操作系统包括 CentOS 7.4/7.5/7.6/7.7 和 Redhat 7.4/7.5/7.6/7.7.

![cluster-2](../../../img-2.6/cluster-3-new.png)

> KubeOperator 支持 MultiAZ（多故障域），多主多节点模式适 d合在  MultiAZ 下部署，实现双活环境下的高可用。

#### 4.1.3 配置节点

【添加主机】环节，把集群所需的主机添加到了 KubeOperator 中。在【配置节点】环节，可以根据需求选择 worker 节点数量，这里以一个 master 和三个 worker 节点为例。

![cluster-3](../../../img-2.4/cluster-3.png)

#### 4.1.4 选择节点

在【选择节点】环节，则可以根据不同的节点角色，在主机下拉列表中可列出该项目中所有被授权的主机。

![cluster-4](../../../img-2.4/cluster-4.png)

#### 4.1.5 配置网络

【配置网络】环节，选择集群的 kube-proxy 运行模式、 ingress 方式以及网络插件，当前 kube-proxy 运行模式支持 iptables 和 ipvs 两种；ingress 支持 trafik 和 nginx；网络插件支持 Flannel 和 Calico，这里我们分别选择 iptables、trafik、Flannel 三种方式。

> 如果集群节点全部都在同一个二层网络下，请选择"host-gw"。如果不是，则选择"vxlan"。"host-gw" 性能优于 "vxlan"。选项 Service CIDR 和 POD CIDR 保证不和已有主机节点 IP 段冲突即可使用。 

![cluster-5](../../../img-2.5/cluster-5.png)

#### 4.1.6 配置存储

【添加存储】环节，支持多种存储方案，包括 NFS 存储，新增加 Rook Ceph 存储方案，还有本地存储卷方式存储。

如果选择使用 Rook Ceph 存储时，需要设置存储介质和存储路径，存储介质使用推荐测试环境使用的配置，Path 使用推荐路径 /data/ceph，当然可以根据实际环境修改配置。
如何登录 Ceph 控制台查看存储监控信息，请参考第 5.1.2.1 节详细内容。

![cluster-6](../../../img-2.4/cluster-6.png)

如果选择 NFS 存储， NFS 主机的节点已经在 1.3 节添加到【存储】页面，选择外部持久化存储并授权给项目后，在下来菜单中会列出该节点。

![cluster-7](../../../img-2.4/cluster-7.png)

本次创建的集群选择 NFS 存储方案，继续后续步骤。

#### 4.1.7 配置检测

完成上述 6 个步骤后，KubeOperator 会对当前集群所选择的部署节点进行配置检测，包含 CPU、内存和操作系统的检测,检查是否满足节点最低配置要求。

![cluster-8](../../../img-2.4/cluster-8.png)

#### 4.1.8 其他设置

在【其他设置】中，我们增加了建议的可运行 POD 数量、Docker 数据目录、Docker0 默认网关设置、Prometheus 监控数据保留时长设置信息，用户可根据实际环境修改以上参数。

![cluster-9](../../../img-2.4/cluster-9.png)

#### 4.1.9 集群配置概览

所有步骤完成后，会有一个集群配置概览页对之前步骤所设参数进行汇总，用户可在此页进行集群配置的最后检查。

![cluster-10](../../../img-2.4/cluster-10.png)

### 4.2 部署集群

在集群列表中点击要进行部署的集群名称，默认展示的是该集群的【概览】信息。【概览】页中展示了 Kubernetes 集群的诸多详情，包括集群容量信息、统计信息、集群状态、Worker 状态，集群描述信息等。点击【概览】页上方的【安装】按钮进行 Kubernetes 集群的部署。

![cluster-deploy](../../../img-2.4/cluster-summary.png)

集群部署开始后，将会自动跳转到【任务】页。在【任务】页里可以看到集群部署当前所执行的具体任务信息。

![cluster-deploy-1](../../../img-2.4/cluster-install-1.png)

如果是内网环境的话，一个典型的 3 节点集群的部署大概需要 10 分钟左右的时间。在出现类似下图的信息后，表明集群已部署成功：

![cluster-deploy-2](../../../img-2.4/cluster-install-2.png)

> 注：集群默认不再安装 KubeApps Plus 应用商店，集群安装完成后，在该集群的概览页通过单击 “应用商店” 安装部署 KubeApps Plus。

### 4.3 服务暴露

#### 4.3.1 添加 F5 BIG-IP

在集群列表中点击集群名称，添加 F5 暴露服务，点击【F5 BIG-IP】添加 F5 BIG-IP，为 Kubernetes 配置 F5-BIGIP-CONTROLLER 后，我们可以通过 F5 BIGIP 设备向外网暴露服务。

![cluster-f5](../../../img-2.4/f5.png)

#### 4.3.2 更新 ApiServer 证书

通过自动更新配置 ApiServer 证书的功能，可以方便用户使用其他负载均衡设备对 Kubernetes 集群的 Master 节点配置高可用。默认情况下，使用 KubeOperator 创建的多 Master 节点的 Kubernetes 集群时，是通过 Haproxy 负载多个 Master 节点来提高可用性的。当然，真实环境中有成熟的、商业的负载均衡设备或者更好的解决方案时 ，可以使用外部的负载均衡设备来做高可用。配置过程中如果需要使用 HTTP/HTTPS 做七层负载，就需要 ApiServer 的证书文件。在 ApiServer 设置栏目，填写 VIP 地址（即负载均衡器的 IP），如下图所示，就可以自动为负载均衡器配置 ApiServer 的证书。证书文件将存放到 Master 节点的 /etc/kubernetes/ssl 目录。

![cluster-cert](../../../img-2.6/screenshot-cert.png)


![cluster-ssl](../../../img-2.6/cert-ssl.png)


### 4.4 CIS 安全扫描

KubeOperator 结合 kube-bench 实现了 CIS 安全扫描功能，通过 CIS 安全扫描功能，可以帮助集群管理员检查 Kubernetes 是否已安全部署。kube-bench 尽可能紧密地实现 CIS Kubernetes 基准，CIS Kubernetes 基准的详细信息可以通过下方链接查看：

https://www.cisecurity.org/benchmark/kubernetes/

![cluster-cis](../../../img-2.6/screenshot-cis.png)


## 5 集群运营（Day 2）

### 5.1 集群管理

超级管理员登录 KubeOperator 系统，在集群的【概览】页提供了 Grafana、Registry-console、应用商店三个管理系统快捷访问方式。其他应用可以通过 KubeApps Plus 应用商店自选安装。这三个系统的访问域名需要在 DNS 服务器中添加相应的域名记录。如没有使用 F5 BIG-IP 暴露服务，也可以通过修改本地主机的 hosts 文件来达到相同的作用。如果创建集群时选择 Rook Ceph 存储方案，访问 Ceph 控制台前也需要添加该域名解析规则。

eg: 

``` bash
# 编辑 /etc/hosts
testerdeMacBook-Pro:~ tester$sudo vim /etc/hosts
# 替换 WORKER_IP 为任意 worker 节点 IP 地址
WORKER_IP grafana.apps.mycluster.fit2cloud.com
WORKER_IP prometheus.apps.mycluster.fit2cloud.com
WORKER_IP registry-ui.apps.mycluster.fit2cloud.com
WORKER_IP kubeapps-plus.apps.mycluster.fit2cloud.com
```
以上文本也可以直接单击【域名解析】复制域名解析规则。

#### 5.1.1 Dashboard

##### 5.1.1.1 KubeOperator Dashboard

KubeOperator 中【概览】页，该页面集中显示了集群相关的统计信息，包括集群状态，容量信息，Nodes 数量、Namespaces 数量、Pods 数量等，还包括异常日志，异常 Pod 的信息统计。

![dashboard-1](../../../img-2.4/ko-dashboard.png)

##### 5.1.1.2 K8s Dashboard

K8s Dashboard 对应的是 Kubernetes 的控制台，使用 KubeOperator 2.5 版本以上用户可以在 Kubeapp Plus 应用商店中自选安装该应用。安装部署成功后，访问 K8s Dashboard Web UI 的方式是以 NodePort 方式。还包括 Argo CD 和 Harbor 应用也是 以 NodePort 方式访问。安装部署过程详情请参考 KubeApps Plus 应用商店使用指南部分内容。

从浏览器中访问 Kubernetes 控制台需要用到【令牌】。点击【概览】页上方的【TOKEN】按钮获取令牌信息，将令牌信息复制到粘贴板。

![dashboard-2](../../../img-2.4/k8s-dashboard.png)

输入令牌信息后，点击【登录】，则可进入 Kubernetes 控制台。

![dashboard-3](../../../img-2.4/k8s-dashboard-1.png)

#### 5.1.2 集群监控

##### 5.1.2.1 访问 Ceph 控制台

KubeOperator 支持云原生存储解决方案 Rook Ceph，当创建手动模式集群，存储方案选择 Rook Ceph 时 ，在集群【概览】页，描述信息存储类型中可以通过 Rook Ceph 图标链接跳转至 Ceph 控制台。

Ceph 控制台用户名是 admin，密码需要通过执行命令方式获取。获取方式如下：

``` bash
#此命令可以在集群概览页下面的 WebKubectl 中或者在集群中任意节点中执行。
$ kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo

```
![grafana-2](../../../img-2.4/rook-ceph-3.png)

登录 Ceph 控制台后，可以看到集群存储的监控信息。

![grafana-3](../../../img-2.4/rook-ceph-2.png)

##### 5.1.2.2 集群事件

KubeOperator 支持获取 K8s 事件，实时更新在 KubeOperator 集群事件页面，包括正常和异常事件，可搜索过去一天/周/月的 Normal 和 Warning 事件，同时支持关键字搜索事件。事件内容和 K8s Dashboard 的 Event 一致，通过 KubeOperator 控制台能够更加直观快速的看到集群的状态信息。

![event-1](../../../img-2.4/event-1.png)

在集群【事件】页，单击信息列的事件，可以获取事件详情信息。

![event-2](../../../img-2.4/event-2.png)

##### 5.1.2.3 访问 Grafana

Grafana 对 Prometheus 采集到的监控数据进行了不同维度的图形化展示，更方便用户了解整个 Kubernetes 集群的运行状况。集群概览页单击【监控/日志】按钮访问 Grafana 控制台。

集群级别的监控面板：

![grafana-3](../../../img-2.4/grafana-1.png)

节点级别的监控面板：

![grafana-4](../../../img-2.4/grafana-2.png)

#### 5.1.2.4 访问 Weave Scope

Weave Scope 用来监控、可视化和管理 Kubernetes 集群。使用 KubeOperator 2.5 版本以上用户可以在 Kubeapp Plus 应用商店中自选安装该应用。安装部署该应用请参考 KubeApps Plus 应用商店使用指南部分。 点击控制台的顶部【Pod】，会自动生成容器之间的关系图，方便理解容器之间的关系，也方便监控容器化和微服务化的应用。Weave Scope 默认的用户名是 admin，密码是 admin123。

![weave-scope-1](../../../img-2.4/weave-scope-2.png)

点击顶部的【Host】，可以远程shell登录各个节点，还可以看到主机的详细信息。

![weave-scope-2](../../../img-2.4/weave-scope-1.png)

##### 5.1.2.5 组件状态

在 K8s 集群【组件状态】栏，可以看到整体的集群状态，具体包括核心组件 Control Manager，Schedule，etcd 状态和系统组件实时健康状态。

![cluster-healthy](../../../img-2.5/module-status.png)


#### 5.1.3 集群日志

KubeOperator 系统新增加支持获取 KubeOperator 系统日志和 K8s 集群日志功能。

##### 5.1.3.1 系统日志

【系统日志】页支持查找 KubeOperator 系统相关的日志信息， 日志类型包括 info、debug 和 error 日志，还可以用关键字搜索日志等等日志信息。

![log-1](../../../img-2.4/systemlog.png)

##### 5.1.3.2 集群日志

K8s 集群日志使用 Grafana 日志聚合工具 Loki。Loki 是Grafana Labs 团队的开源项目，它的设计非常经济高效且易于操作，特别适合存储 Kubernetes Pod 日志。

通过访问 Grafana 控制台看到 Loki 日志。

![log-2](../../../img-2.4/loki-2.png)


#### 5.1.4 集群管理
 
##### 5.1.4.1 访问 Registry

Registry 则用来存放 Kubernetes 集群所使用到的 Docker 镜像。Registry 默认的用户名是 admin，密码是 admin123。

![regsitry-1](../../../img-2.4/registry-1.png)

##### 5.1.4.2 Webkubectl

KubeOperator 支持 Webkubectl 。在集群【概览】页单击 WEBKUBECTL ，在弹出框中可以像在集群中节点执行命令，查询集群信息等操作。

![cluster-webkubectl](../../../img-2.4/webkubectl.png)


### 5.2 集群升级

KubeOperator 支持 K8s 升级。目前支持 K8s 1.16.9 以下版本。请注意由于 1.15 和 1.16 版本之后变化较大，目前不支持升级从 1.15 升级到 1.16 版本。

在集群列表中点击要进行升级的集群名称，点击【概览】页最上方的【升级】按钮进行 Kubernetes 集群的升级。

![cluster-upgrade-1](../../../img-2.4/upgrade-1.png)

单击【确认】后，系统自动跳转到【任务】页，可以看到升级进度和详细 log 信息。

![cluster-upgrade-2](../../../img-2.4/upgrade-2.png)

升级完成后，可以看到如下信息。

![cluster-upgrade-3](../../../img-2.4/upgrade-3.png)

同时在集群【历史】页，可以通过单击【详情】按钮查看升级的所有 log 信息。

![cluster-upgrade-4](../../../img-2.4/upgrade-4.png)

### 5.3 集群伸缩

KubeOperator 支持扩缩容 K8s 集群 worker 节点数量。

KubeOperator 控制台【集群】页，单击一个要扩容的集群名称，即【概览】页面，Worker 状态栏右下方单击【扩容】，在弹出框中选中要扩容的节点，支持同时扩容多个节点。

![expand-1](../../../img-2.4/expand-1.png)

确认后，会自动转到【任务】页面，实时查看扩容进度，完成后可以看到如下图所示信息。

![expand-2](../../../img-2.4/expand-2.png)

### 5.4 集群备份

KubeOperator 目前的备份功能支持三种不同种类的存储，即 AWS S3、aliyun oss 和 Azure 存储。为集群备份和恢复提供存储支持，实现备份和恢复功能。

添加备份账号之前，请首先自行准备好 AWS S3 ，aliyun oss 或者 Azure 存储账号信息，包括 AccessKey，SecretKey，endpoint 和桶/容器信息。
以添加 S3 为例，在【系统设置】的【备份】Tab 也中输入名称和 AccessKey，SecretKey 和端点（对应 AWS S3 系统里的 endpoint），单击【获取桶/容器】获取桶名称，建议在 S3 新建一个桶单独使用，最后提交。

![setting-2](../../../img-2.4/backup-1.png)

在集群【备份】页面，可以看到，KubeOperator 支持的自动备份策略和手动备份，自动备份包括备份间隔，复本保留份数以及可以开启户禁用备份策略，实现集群备份和恢复功能。

![cluster-backup](../../../img-2.4/backup-2.png)

手动备份需要先设置备份策略信息，包括备份间隔、保留份数、选择存储设备以及开启备份，然后单击【立即备份】后，可以在【任务】页看到备份进度。

![cluster-backup-1](../../../img-2.4/backup-3.png)


