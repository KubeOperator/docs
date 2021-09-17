
!!! warning ""
    [KubePi][KubePi] 可以使用 docker run 命令在容器内运行。它也可以使用 kubectl 安装在 [Kubernetes][Kubernetes] 集群上。

## 快速开始

=== "docker"

    !!! info ""
        ```sh
        # 安装
        sudo docker run -d --restart=unless-stopped -p 80:80 kubeoperator/kubepi-server
        ```

    !!! info "持久化部署"
        ```sh
        # 创建持久化目录
        mkdir -p /opt/kubepi

        # 安装
        sudo docker run -d -v /opt/kubepi:/var/lib/kubepi --restart=unless-stopped -p 80:80 kubeoperator/kubepi-server
        ```

    !!! info "登录"
        ```
        地址: http://localhost
        用户名: admin
        密码: kubepi
        ```

=== "kubectl"

    !!! info ""
        ```sh
        # 安装
        sudo kubectl apply -f https://raw.githubusercontent.com/KubeOperator/KubePi/master/docs/deploy/kubectl/kubepi.yaml
        ```

    !!! info "持久化部署"

        ```sh
        # 安装
        sudo kubectl apply -f https://raw.githubusercontent.com/KubeOperator/KubePi/master/docs/deploy/kubectl/kubepi-pvc.yaml
        ```

        !!! warning "注意"
            需要替换创建 pvc 时使用的 storageClass

    !!! info "获取访问地址"
        ```
        # 获取 NodeIp
        export NODE_IP=$(kubectl get nodes -o jsonpath="{.items[0].status.addresses[0].address}")
        
        # 获取 NodePort
        export NODE_PORT=$(kubectl -n kube-system get services kubepi -o jsonpath="{.spec.ports[0].nodePort}")
        
        # 获取 Address
        echo http://$NODE_IP:$NODE_PORT
        ```

    !!! info "登录"
        ```
        地址: http://$NODE_IP:$NODE_PORT
        用户名: admin
        密码: kubepi
        ```

[KubePi]:https://kubeoperator.io
[Kubernetes]:https://kubernetes.io