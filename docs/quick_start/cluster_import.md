
### 基本信息

!!! warning ""
    * 支持导入非 KubeOperator 创建的集群
    * 导入集群版本要在 KubeOperator 支持的版本范围内，参考: [版本管理](../user_manual/version.md#_4)

![cluster-import](../img/user_manual/cluster/cluster-import.png)

!!! warning "获取架构"
    选择集群节点的 CPU 架构类型（支持 amd64、arm64 和混合架构三种类型）

!!! warning "获取 Api Server"
    ```shell
    cat /root/.kube/config | grep server: | awk '{print $2}'
    ```

    注意：如果 server IP 为 127.0.0.1，需要将 IP 替换为任意 master 节点 IP

!!! warning "获取 Router"
    装有 kube-proxy 的任意 K8s 集群节点的 IP 地址

    ```shell
    kubectl -n kube-system get pod -o wide | grep kube-proxy
    ```

    注意：获取任意 IP 地址

!!! warning "获取 Token"

    === "KubeOperator 创建集群"

        ```shell
        kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep ko-admin | awk '{print $1}') | grep token: | awk '{print $2}'
        ```

    === "自建集群"
        
        !!! warning ""
            创建 Service Account

            ```yaml
            apiVersion: v1
            kind: ServiceAccount
            metadata:
              name: kubeoperator-user
              namespace: kube-system
            ```

        !!! warning ""
            创建 ClusterRoleBinding

            ```yaml
            apiVersion: rbac.authorization.k8s.io/v1
            kind: ClusterRoleBinding
            metadata:
              name: kubeoperator-user
            roleRef:
              apiGroup: rbac.authorization.k8s.io
              kind: ClusterRole
              name: cluster-admin
            subjects:
              - kind: ServiceAccount
                name: kubeoperator-user
                namespace: kube-system
            ```

        !!! warning ""
            获取 Token

            ```shell
            kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kubeoperator-user | awk '{print $1}') | grep token: | awk '{print $2}'
            ```

### 使用工具

!!! warning "仓库配置"
    - 工具中所涉及到的镜像默认使用 nexus 镜像仓库。在启用工具之前，需要在所有 K8s 集群节点对 nexus 镜像仓库进行授信。
    - 不能针对导入的自建集群进行扩缩容、备份等 Day2 操作

    ```shell
    vim /etc/docker/daemon.json
    ```
    
    ```json
    {
        ...
        "insecure-registries" : [ "...", "kubeoperator-ip:8082", "..." ]
        ...
    }

    注意：kubeoperator-ip 为 KubeOperator 部署机 IP
    ```

    ```shell
    # 重新启动 docker 服务使得配置生效
    systemctl restart docker.service
    ```

### 容器运行时参数

!!! warning "Docker"
    ```shell
    # 集群任意节点执行
    cat /etc/docker/daemon.json
    ```

    ```json
    {
        ...
        "bip": "172.17.0.1/16", # Container 子网
        "data-root": "/var/lib/docker", # Docker 数据路径
        ...
    }
    ```

!!! warning "Containerd"

    ```shell
    # 集群任意节点执行
    cat /etc/containerd/config.toml
    ```

    ```yaml
    ...
    root = "/var/lib/containerd" # Containerd 数据路径
    ...
    ```

### 容器网络参数

!!! warning ""

    === "flannel"

        !!! warning "网络模式"

            ```shell
            # 集群任意节点执行
            kubectl -n kube-system get cm kube-flannel-cfg -o yaml
            ```

            ```json
            {
                ...
                net-conf.json: |
                {
                  "Network": "10.0.0.0/14",
                  "Backend": {
                    "Type": "vxlan" # 网络模式为 vxlan
                  }
                }
                ...
            }
            ```

        !!! warning "多网络设置"

            ```shell
            # 集群任意节点执行
            kubectl -n kube-system get daemonsets.apps kube-flannel-ds -o yaml
            ```

            ```yaml
            ...
            containers:
            - args:
              - --ip-masq
              - --kube-subnet-mgr
              - --iface=ens192 # 多网络设置为启用，网卡名称为 ens192
            ...
            ```

    === "calico"

        !!! warning "网络模式"

            ```shell
            # 集群任意节点执行
            kubectl -n kube-system get cm calico-config -o yaml
            ```

            ```yaml
            ...
            containers:
            - env:
              - name: CALICO_IPV4POOL_IPIP
                value: "off" # off 代表网络模式为 bgp，Always 代表网络模式为 ipip
            ...
            ```

        !!! warning "多网络设置"

            ```shell
            # 集群任意节点执行
            kubectl -n kube-system get daemonsets.apps calico-node -o yaml
            ```

            ```yaml
            ...
            containers:
            - env:
              - name: DATASTORE_TYPE
                value: kubernetes
              - name: IP_AUTODETECTION_METHOD
                value: interface=ens192 # 多网络设置为网卡，网卡名称为 ens192
                value: cidr=192.168.64.0/24 # 多网络设置为网段，网段为 192.168.64.0/24
            ...
            ```    
