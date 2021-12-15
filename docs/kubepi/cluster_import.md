
### Bearer Token

!!! warning "获取 apiserver 地址"
    cat ～/.kube/config | grep server: | awk '{print $2}'

    - 注意: 如果 server IP 为 127.0.0.1，需要将 IP 替换为集群 master 节点 IP

!!! warning "获取 Token"

    === "默认"

        !!! warning ""

            [KubeOperator][KubeOperator] 部署的 [Kubernetes][Kubernetes] 集群，可在集群任意节点上执行如下命令

            ```shell
            kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep ko-admin | awk '{print $1}') | grep token: | awk '{print $2}'
            ```

        !!! warning ""

            [Kubectl][Kubectl] 方式部署的 [KubePi][KubePi] 服务，在集群任意节点上执行如下命令

            ```shell
            kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kubepi-user | awk '{print $1}') | grep token: | awk '{print $2}'
            ```

    === "自定义"
        
        !!! warning ""
            创建 Service Account

            ```shell
            cat <<EOF > kubepi-serviceaccount.yaml
            apiVersion: v1
            kind: ServiceAccount
            metadata:
              name: kubepi-user
              namespace: kube-system
            EOF
            ```

            ```shell
            kubectl create -f ./kubepi-serviceaccount.yaml
            ```

        !!! warning ""
            创建 ClusterRoleBinding

            ```yaml
            cat <<EOF > kubepi-clusterrolebinding.yaml
            apiVersion: rbac.authorization.k8s.io/v1
            kind: ClusterRoleBinding
            metadata:
              name: kubepi-user
            roleRef:
              apiGroup: rbac.authorization.k8s.io
              kind: ClusterRole
              name: cluster-admin
            subjects:
              - kind: ServiceAccount
                name: kubepi-user
                namespace: kube-system
            EOF
            ```

            ```shell
            kubectl create -f ./kubepi-clusterrolebinding.yaml
            ```

        !!! warning ""
            获取 Token

            ```shell
            kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kubepi-user | awk '{print $1}') | grep token: | awk '{print $2}'
            ```

![cluster-import-token](../img/kubepi/cluster-import-token.png)

### kubeconfig 文件

!!! warning ""
    将任意集群节点 kubeconfig 文件拷贝到本机后导入（默认路径为: ～/.kube/config）

    - 注意: 如果 server IP 为 127.0.0.1，需要将 IP 替换为集群 master 节点 IP

![cluster-import-kubeconfig](../img/kubepi/cluster-import-kubeconfig.png)

### 证书

![cluster-import-certificate](../img/kubepi/cluster-import-certificate.png)

[KubePi]:https://github.com/KubeOperator/KubePi
[Kubectl]:https://github.com/KubeOperator/KubePi/tree/master/docs/deploy/kubectl
[KubeOperator]:https://github.com/KubeOperator/KubeOperator
[Kubernetes]:https://kubernetes.io