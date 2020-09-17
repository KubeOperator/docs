
### 集群信息

![deploy-1](../img/user_manual/cluster/deploy-1.png)

- 供应商: 支持裸金属（手动模式）和部署计划（自动模式）
- 架构: 支持 AMD64 和 ARM64

### 高级选项

![deploy-2](../img/user_manual/cluster/deploy-2.png)

- 容器运行时: 支持 Docker 和 Containerd（注意: ARM64 架构下，容器运行时不支持 Containerd）
- Docker 数据路径: 默认 /var/lib/docker
- 容器网络: 支持 flannel 和 calico
- 网络模式: flannel 支持 host-gw 和 vxlan、calico 支持 bgp 和 ipip
- Pod 子网: 默认 179.10.0.0/16
- Service 子网: 默认 179.20.0.0/16
- Container 子网: 默认 179.30.0.0/16
- 最大 POD 数量: 默认 110
- kube-proxy 模式: 支持 iptables 和 ipvs
- ingress 类型: 支持 nginx-ingress 和 traefik-ingress
- kubernetes 审计: 支持开启日志审计功能

!!! info "vxlan 和 ipip 网络模式"
    * 基于隧道，在任何网络环境下都可以正常工作
    * 优势是对物理网络环境没有特殊要求，只要宿主机IP层可以路由互通即可
    * 劣势是封包和解包耗费CPU性能，且额外的封装导致带宽浪费

!!! info "host-gw 和 bgp 网络模式"
    * 基于路由，不适用于公有云环境
    * 优势是没有封包和解包过程，完全基于两端宿主机的路由表进行转发
    * 劣势是要求宿主机在2层网络是互通，且路由表膨胀会导致性能降低

### 节点信息

> 注: 根据不同的节点角色选择目标主机（手动模式）

![deploy-3](../img/user_manual/cluster/deploy-3.png)

> 注: 选择已授权部署计划，设置 Worker 节点数量（自动模式）

![deploy-6](../img/user_manual/cluster/deploy-6.png)

### 确认信息

![deploy-4](../img/user_manual/cluster/deploy-4.png)
