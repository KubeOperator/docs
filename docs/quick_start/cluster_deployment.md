
### 集群信息

!!! warning ""
    - 项目: 选择集群所属项目
    - 供应商: 支持裸金属（手动模式）和部署计划（自动模式）
    - 版本: 支持版本管理中最新的两个 Kubernetes 版本 
    - 架构: 支持 AMD64 和 ARM64
    - Yum 仓库: 支持替换、共存和不操作三种类型

    !!! info "Yum 仓库"
        * 替换: 此操作将会对 K8S 节点服务器原始 yum repo 文件进行备份，之后生成并仅使用 KubeOperator 的 yum repo
        * 共存: 此操作将保持K8S节点服务器原始 yum repo 文件不变，同时生成并使用 kubeoperator 的 yum repo
        * 不操作: 此操作将保持使用 K8S 节点服务器原始 yum repo 文件，不对K8S节点服务器的 yum repo 做任何操作

![deploy-1](../img/user_manual/cluster/deploy-1.png)

### 集群设置

!!! warning ""
    - 容器网络: CIDR不能与目标IP段重叠，否则会造成初始化失败
    - POD 数量上限/节点: 默认 256
    - Service 数量上限/集群: 默认 256
    - proxy 模式: 支持 iptables 和 ipvs
    - dns 缓存: 支持开启 NodeLocal DNSCache
    - kubernetes 审计: 支持开启日志审计功能

![deploy-2](../img/user_manual/cluster/deploy-2.png)

### 运行时设置

!!! warning ""
    - 容器运行时: 支持 Docker 和 Containerd
    - Docker 数据路径: 默认 /var/lib/docker
    - Container 子网: 默认 172.17.0.1/16

![deploy-3](../img/user_manual/cluster/deploy-3.png)

### 容器网络设置

!!! warning ""
    - 网卡名称: 多网卡环境需要指定使用的网卡名称，单网卡环境可不填
    - 容器网络: 支持 flannel 、 calico 和 cilium

    !!! info "vxlan 和 ipip 网络模式"
        * 基于隧道，在任何网络环境下都可以正常工作
        * 优势是对物理网络环境没有特殊要求，只要宿主机IP层可以路由互通即可
        * 劣势是封包和解包耗费CPU性能，且额外的封装导致带宽浪费

    !!! info "host-gw 和 bgp 网络模式"
        * 基于路由，不适用于公有云环境
        * 优势是没有封包和解包过程，完全基于两端宿主机的路由表进行转发
        * 劣势是要求宿主机在2层网络是互通，且路由表膨胀会导致性能降低

    !!! info "cilium Overlay"
        * 支持 vxlan 和 geneve
        * 基于封装的虚拟网络，产生所有主机。目前 VXLAN 和 Geneve 已经完成，但可以启用 Linux 支持的所有封装格式
        * 此模式具有最小的基础设施和集成要求。它几乎适用于任何网络基础设施，因为唯一的要求是主机之间的IP连接，这通常已经给出

    !!! info "cilium Native Routing"
        * 使用 Linux 主机的常规路由表。网络必须能够路由应用程序容器的IP地址，此模式适用于高级用户，需要了解底层网络基础结构。
        * 适用于（1. 原生 IPv6 网络、2. 与云网络路由器配合使用、3. 如果您已经在运行路由守护进程）

![deploy-4](../img/user_manual/cluster/deploy-4.png)

### 组件设置

!!! warning ""
    - helm: 支持 v2 和 v3
    - ingress 类型: 支持 nginx-ingress 和 traefik-ingress
    - 安装 GPU 套件: 按需使用，默认选择禁用

![deploy-5](../img/user_manual/cluster/deploy-5.png)

### 节点信息

!!! warning ""
    * 根据不同的节点角色选择目标主机（手动模式）

![deploy-hosts](../img/user_manual/cluster/deploy-hosts.png)

!!! warning ""
    * 选择已授权部署计划，设置 Worker 节点数量（自动模式）

![deploy-plan](../img/user_manual/cluster/deploy-plan.png)

### 确认信息

![deploy-review](../img/user_manual/cluster/deploy-review.png)

### 日志

!!! warning ""
    集群创建过程中为 Initializing 状态，点击可查看集群安装进度并支持查看当前任务的实时日志（支持手动暂停任务日志输出）

![deploy-log](../img/user_manual/cluster/deploy-log.png)
