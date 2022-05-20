
### KubeOperator 的定位

!!! warning ""
    KubeOperator 是一个开源的轻量级 Kubernetes 发行版。与 OpenShift 等重量级 PaaS 平台相比，KubeOperator 只专注于解决一个问题，就是帮助企业规划（Day 0）、部署（Day 1）、运营（Day 2）生产级别的 Kubernetes 集群，并且做到极致。

![what-is-ko](img/faq/what-is-ko.png)

!!! warning ""
    云原生正在快速兴起，三个互相关联的领域在同步进化：  

    -  基础设施方面: 从 物理资源 到 虚拟化资源 到 容器化（ Kubernetes ）资源 的演进
    -  开发模式方面: 从 瀑布模型 到 敏捷开发 到 DevOps 的演进
    -  应用架构方面: 从 单体架构 到 多层次架构 到 微服务 的演进

### 与其他工具的区别

=== "差异"
    !!! warning ""
        KubeOperator 不仅提供 Day 1 部署功能，还提供 Day 2 的 K8s 集群升级、扩容、监控、检查、备份恢复等功能

        ![overview](img/faq/overview.png)

=== "优势"
    !!! warning ""
        KubeOperator 的优势包括:  

        -  提供可视化的 Web UI，大大降低部署和管理 Kubernetes 的门槛；
        -  提供离线的、经过全面验证和测试的安装包；
        -  与 VMware、Openstack 和 FusionCompute 等云平台紧密对接，能够实现一键虚机自动创建和部署（基于 Terraform 和 Ansible）；
        -  KubeOperator 会提供经过充分验证的成熟企业级存储和网络方案。

### Kubernetes 集群方案

!!! warning ""
    * 基于物理机部署大的 Kubernetes 集群: 通过 namespace 实现租户的隔离
    * 基于 IaaS 平台之上部署多个 Kubernetes 集群: 为每个租户分配独立的 Kubernetes 集群
    !!! warning ""
        这两种方案各有好处，在 Kubernetes 采纳初期，使用第二种方案更为理性，因为:
    
        * 如果是单一大集群，升级会影响所有租户，风险比较大；
        * IaaS 平台上有成熟的、基于软件定义的存储和网络方案，落地更容易和灵活；
        * KubeOperator 与 VMware、Openstack 等 IaaS 方案紧密集成，可以实现全栈的自动化，集群交付快，伸缩快。

### KubeOperator 部署方式

!!! warning ""
    基于 kubeadm 容器化部署 Kubernetes 集群

### 原生 Kubernetes 的好处

!!! warning ""
    * KubeOperator 已经通过云原生基金会的 [Kubernetes 软件一致性认证](https://landscape.cncf.io)。
    * Kubernetes 迭代很快，且只维护最新的三个大版本。如果采纳其他发行版，可能很容易出现和原生版本脱节的情况。
    * 由于 Operator 和 Helm 等日趋成熟，很多发行版的功能，比如 CI/ CD, Istio 等都可以通过 addon 方式部署到 Kubernetes 集群里面。Kubernetes 集群及其里面的应用应该是分离的，各自迭代升级。

### KubeOperator 支持的存储

=== "NFS"
    !!! warning ""
        手动模式和自动模式下的集群都支持 NFS 作为持久化存储

=== "LocalStorage"
    !!! warning ""
        本地持久化存储

=== "External Ceph"
    !!! warning ""
        创建成功之后，会在集群中初始化 ceph provisioner 相关 pod

=== "Rook-Ceph"
    !!! warning ""
        需要指定 ceph 集群所需磁盘（集群所有节点都必须包含指定的磁盘，如sdb,sdc...）

=== "vSphere"
    !!! warning ""
        集群服务器必须在指定 Folder 中（自动模式创建集群默认 Folder 为 kubeoperator），并且服务器名称要和集群 node 节点名称保持一致

=== "[OceanStor](https://github.com/Huawei/eSDK_K8S_Plugin/tree/master/docs/zh)"

!!! warning "Static and Dynamic PVs 的支持情况取决于所选择的存储。以 vSphere 平台为例，[各种存储选项可以参考此文章](https://docs.vmware.com/en/VMware-Enterprise-PKS/1.5/vmware-enterprise-pks-15/GUID-vsphere-persistent-storage.html)"

### Kubernetes 软件一致性认证

!!! warning ""
    是的。KubeOperator 已经通过认证，具体请参加: https://landscape.cncf.io

### KubeOperator 部署机的推荐配置

!!! warning ""
    KubeOperator 部署机配置取决于初始化 k8s 集群节点数量，推荐配置参考如下:
    <table>
        <tr>
            <td>集群节点数量</td>
            <td>部署机推荐配置</td>
        </tr>
        <tr>
            <td>1-5</td>
            <td>2C 4G</td>
        </tr>
        <tr>
            <td>6-10</td>
            <td>4C 8G</td>
        </tr>
        <tr>
            <td>11-50</td>
            <td>8C 16G</td>
        </tr>
        <tr>
            <td>51-100</td>
            <td>16C 32G</td>
        </tr>
        <tr>
            <td>101-200</td>
            <td>32C 64G</td>
        </tr>
        <tr>
            <td>> 200</td>
            <td>64C 128G</td>
        </tr>
    </table>

### K8s master 节点的推荐配置

!!! warning ""
    Kubernetes 集群中 master 节点配置取决于 worker 节点数量，推荐配置参考如下:
    <table>
        <tr>
            <td>worker 节点数量</td>
            <td>master 推荐配置</td>
        </tr>
        <tr>
            <td>1-5</td>
            <td>1C 4G</td>
        </tr>
        <tr>
            <td>6-10</td>
            <td>2C 8G</td>
        </tr>
        <tr>
            <td>11-100</td>
            <td>4C 16G</td>
        </tr>
        <tr>
            <td>101-250</td>
            <td>8C 32G</td>
        </tr>
        <tr>
            <td>251-500</td>
            <td>16C 64G</td>
        </tr>
        <tr>
            <td>> 500</td>
            <td>32C 128G</td>
        </tr>
    </table>

### KubeOperator 其他说明

!!! warning ""
    * KubeOperator 自身重启、升级或者挂掉不会影响其创建和管理的 Kubernetes 集群（KubeOperator 是一个 100% 旁路系统，其与被管 Kubernetes 集群完全解耦）
    * 重启 Kubernetes 集群节点后，Kubernetes 等服务会自动恢复正常

### Harbor 访问故障

!!! warning ""
    可以通过 Web UI 访问，但是 docker login 不成功

=== "第一步"
    !!! warning ""
        开启 TLS，修改 enable = true
    ![harbor_tls_enable](./img/faq/harbor-tls.jpg)

=== "第二步"
    !!! warning ""
        配置一个固定的 NodePort 端口，端口不要和现有环境冲突即可
    ![harbor_tls_enable](./img/faq/harbor-nodeport.jpg)

=== "第三步"
    !!! warning ""
        修改 externalURL: https://worker:port , 如图: 172.16.10.100是 worker 节点的IP，30003 是第二个步骤中为 NodePort 设置的固定端口
    ![harbor_tls_enable](./img/faq/harbor-externalurl.jpg)

!!! warning ""
    点击右上角“部署”按钮，进行部署

!!! warning ""
    在本地 Docker 客户端配置 daemon.json,使之信任 Harbor 私有仓库
    ```yaml
    {
      ...
      "insecure-registries" : [
        "172.16.10.100:30003"
      ]
      ...
    }
    ```

!!! warning ""
    重启 docker 服务后执行 docker login 命令，输入正确的用户名和密码进行登录
    ```sh
    $ systemctl restart docker
    $ docker login 172.16.10.100:30003
    Username: admin
    Password:
    Login Succeeded
    ```

!!! warning "不论用 Ingress 还是 ClusterIP 对 Harbor 进行服务暴露，externalURL 一定要和实际访问 Harbor 时的 URL 一致，否则 docker login 认证时将会失败"
