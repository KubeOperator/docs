
### 01-KubeOperator 的定位是什么？

!!! question ""
    KubeOperator 是一个开源的轻量级 Kubernetes 发行版。与 OpenShift 等重量级 PaaS 平台相比，KubeOperator 只专注于解决一个问题，就是帮助企业规划（Day 0）、部署（Day 1）、运营（Day 2）生产级别的 Kubernetes 集群，并且做到极致

![what-is-ko](img/faq/what-is-ko.png)

!!! question ""
    云原生正在快速兴起，三个互相关联的领域在同步进化:

    -  基础设施方面: 从 物理资源 到 虚拟化资源 到 容器化（ Kubernetes ）资源 的演进
    -  开发模式方面: 从 瀑布模型 到 敏捷开发 到 DevOps 的演进
    -  应用架构方面: 从 单体架构 到 多层次架构 到 微服务 的演进

### 开源版和企业版的区别？

!!! question ""
    * 和同属飞致云旗下的 JumpServer 开源堡垒机一样，KubeOperator 的核心功能全部开源，坚持按月发布新版本，永久免费使用
    * 相比 KubeOperator 开源版，KubeOperator 企业版提供面向企业级应用场景的 X-Pack 增强包，以及高等级的原厂企业级支持服务，有效助力企业构建并运营生产级别的 K8s 集群
    
    !!! info "X-Pack"
        * 自定义 Logo 和 配色
        * 对接 LDAP
        * 增加消息中心
        * 支持邮箱、钉钉、企业微信告警
        * 集群健康评估
        * 对接 F5
        * 多集群配置管理

### 02-KubeOperator 与 Kubespray 等部署工具的区别是什么？

!!! question ""
    KubeOperator 不仅提供 Day 1 部署功能，还提供 Day 2 的 K8s 集群升级、扩容、监控、检查、备份恢复等功能

![overview](img/faq/overview.png)

!!! question ""
    KubeOperator 不仅支持安装程序本身，还提供了一组工具来监视 Kubernetes 集群的持续运行。KubeOperator 的优势包括:

    -  提供可视化的 Web UI，大大降低部署和管理 Kubernetes 的门槛；
    -  提供离线的、经过全面验证和测试的安装包；
    -  与 VMware、Openstack 和 FusionCompute 等云平台紧密对接，能够实现一键虚机自动创建和部署（基于 Terraform 和 Ansible）；
    -  KubeOperator 会提供经过充分验证的成熟企业级存储和网络方案。

### 03-Kubernetes 集群应该部署在物理机上面，还是 IaaS 平台上面？

!!! question ""
    总的来说，企业有两种方案选择:

    - 基于物理机部署大的 Kubernetes 集群: 通过 namespace 实现租户的隔离；
    - 基于 IaaS 平台之上部署多个 Kubernetes 集群: 为每个租户分配独立的 Kubernetes 集群。

!!! question ""
    这两种方案各有好处，在 Kubernetes 采纳初期，使用第二种方案更为理性，因为:

    - 如果是单一大集群，升级会影响所有租户，风险比较大；
    - IaaS 平台上有成熟的、基于软件定义的存储和网络方案，落地更容易和灵活；
    - KubeOperator 与 VMware、Openstack和 FusionCompute 等 IaaS 方案紧密集成，可以实现全栈的自动化，集群交付快，伸缩快。

### 04-KubeOperator 是否使用二进制方式部署 Kubernetes？

!!! question ""
    否。是基于 kubeadm 容器化部署 Kubernetes 集群。

### 05-采用原生 Kubernetes 有什么好处？

!!! question ""
    总的来说，相对于发行版，采纳原生 Kubernetes 有两个好处:

    - Kubernetes 迭代很快，且只维护最新的三个大版本。如果采纳其他发行版，可能很容易出现和原生版本脱节的情况。
    - 由于 Operator 和 Helm 等日趋成熟，很多发行版的功能，比如 CI/ CD, Istio 等都可以通过 addon 方式部署到 Kubernetes 集群里面。Kubernetes 集群及其里面的应用应该是分离的，各自迭代升级。

### 06-KubeOperator 支持哪些持久化存储？

!!! question "KubeOperator 支持三类存储"
    - nfs: 手动模式和自动模式下的集群都支持 NFS 作为持久化存储
    - local storage: 本地持久化存储
    - external-ceph: 创建成功之后，会在集群中初始化 ceph provisioner 相关 pod
    - rook-ceph: 需要指定 ceph 集群所需磁盘（集群所有节点都必须包含指定的磁盘，如sdb,sdc...）
    - vsphere: 集群服务器必须在指定 Folder 中（自动模式创建集群默认 Folder 为 kubeoperator），并且服务器名称要和集群 node 节点名称保持一致
    - oceanstor: 参考文档: https://github.com/Huawei/eSDK_K8S_Plugin/tree/master/docs/zh

    !!! warning ""
        Static and Dynamic PVs 的支持情况取决于所选择的存储。以 vSphere 平台为例，[各种存储选项可以参考此文章](https://docs.vmware.com/en/VMware-Enterprise-PKS/1.5/vmware-enterprise-pks-15/GUID-vsphere-persistent-storage.html)"

### 07-KubeOperator 自身重启、升级或者挂掉会影响其创建和管理的 Kubernetes 集群吗？

!!! question ""
    不会有任何影响。KubeOperator 是一个 100% 旁路系统，其与被管 Kubernetes 集群完全解耦。

### 08-重启 KubeOperator 部署的 Kubernetes 集群的节点后，比如 Master 或者 Worker 节点，会自动恢复正常吗？

!!! question ""
    会自动恢复正常。

### 09-KubeOperator 支持的 vSphere 版本是什么？

!!! question ""
    - 如果是手动部署模式 + NFS，支持 vSphere 5.5 及以上版本。
    - 如果是自动模式 + vSAN，支持 vSphere 6.5 及以上版本

### 10-KubeOperator 仅支持 CentOS 7.6 Minimal 及以上版本作为 Kubernetes 节点的操作系统吗？

!!! question ""
    是。KubeOperator 的管理范围包括操作系统，比如操作系统补丁升级，其提供的离线包包括操作系统（自动模式）及其 RPM 包，一个离线包版本代表一个终态，并被充分测试和验证。

    !!! warning ""
        注: KubeOperator 不支持 CentOS 8，目前支持的版本是 CentOS 7.4+。

### 11-KubeOperator 是否已通过云原生基金会的 Kubernetes 软件一致性认证？

!!! question ""
    是的。KubeOperator 已经通过认证，[具体请参加此处](https://landscape.cncf.io)

### 12-KubeOperator 和 Rancher 有什么区别？

!!! question ""
    Rancher 是完整的容器管理平台，KubeOperator 仅专注于帮助企业规划、部署和运营生产级别的 Kubernetes 集群，和 KubeOperator 有可比性的是 Rancher RKE，而不是 Rancher 全部。

    !!! warning ""
        KubeOperator 推荐企业采纳解耦的方式来实现云原生之路，也就是说容器云平台与其之上的 DevOps 平台、微服务治理平台、AI 平台、应用商店等是解耦的。

### 13-是否支持在公有云平台上规划、部署 Kubernetes 集群？

!!! question ""
是的。注意事项：仓库 IP 和 主机IP 需要填写内网IP。

### 14-KubeOperator 部署机的推荐配置？

!!! question ""
    KubeOperator 部署机配置取决于初始化 k8s 集群节点数量，推荐配置参考如下:

    | 集群节点数量 | 部署机推荐配置 |
    | ---- | ---- |
    | 1-5 | 2C 4G |
    | 6-10 | 4C 8G |
    | 11-50 | 8C 16G |
    | 51-100 | 16C 32G |
    | 101-200 | 32C 64G |
    | > 200 |64C 128G |

### 15-Kubernetes 集群中的 master 节点的推荐配置？

!!! question ""
    Kubernetes 集群中 master 节点配置取决于 worker 节点数量，推荐配置参考如下:

    | worker 节点数量 | master 推荐配置 |
    | ---- | ---- |
    | 1-5 | 2C 4G |
    | 6-10 | 4C 8G |
    | 11-100 | 8C 16G |
    | 101-250 | 16C 32G |
    | 251-500 | 32C 64G |
    | > 500 | 64C 128G |

### 16-应用商店部署的 Harbor，可以通过 Web UI 访问，但是 docker login 不成功

!!! question "以默认的 NodePort 访问为例:"
    - 上传 Harbor 离线应用到应用商店
    - 点击 Harbor 进行部署
    - 部署前对 value.yaml 做以下修改
        1. 开启 TLS，修改 enable = true
      ![harbor_tls_enable](./img/faq/harbor-tls.jpg)
        2. 配置一个固定的 NodePort 端口，端口不要和现有环境冲突即可
      ![harbor_tls_enable](./img/faq/harbor-nodeport.jpg)
        3. 修改 externalURL: https://worker:port , 如图: 172.16.10.100是 worker 节点的IP，30003 是第二个步骤中为 NodePort 设置的固定端口
      ![harbor_tls_enable](./img/faq/harbor-externalurl.jpg)
        4. 点就右上角“部署”按钮，进行部署

    - 在本地 Docker 客户端配置 daemon.json,使之信任 Harbor 私有仓库
    ```yaml
    {
      ...
      "insecure-registries" : [
        "172.16.10.100:30003"
      ]
      ...
    }
    ```
    - 在本地进行 docker login ，使用正确的用户名和密码进行登录
    ```sh
    $ docker login 172.16.10.100:30003
    Username: admin
    Password:
    Login Succeeded
    ```

    !!! warning ""
        注意: 不论你是用 Ingress 还是 ClusterIP 对 Harbor 进行服务暴露，externalURL 一定要和实际访问 Harbor 时的 URL 一致，否则 docker login 认证时将会失败。
