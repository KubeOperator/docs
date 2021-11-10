
!!! info ""
    [KubePi][KubePi] 可以使用 docker run 命令在容器内运行。它也可以使用 kubectl 安装在 [Kubernetes][Kubernetes] 集群上。

## 安装说明

=== "docker"

    !!! info ""

        ```
        # 安装
        sudo docker run --privileged -d --restart=unless-stopped -p 80:80 kubeoperator/kubepi-server
        ```

    !!! info "持久化部署"

        ```
        # 创建持久化目录
        mkdir -p /opt/kubepi

        # 安装
        sudo docker run --privileged -d -v /opt/kubepi:/var/lib/kubepi --restart=unless-stopped -p 80:80 kubeoperator/kubepi-server
        ```

    !!! info "登录"

        ```
        地址: http://localhost
        用户名: admin
        密码: kubepi
        ```

=== "kubectl"

    !!! info ""

        ```
        # 安装
        sudo kubectl apply -f https://raw.githubusercontent.com/KubeOperator/KubePi/master/docs/deploy/kubectl/kubepi.yaml
        ```

    !!! info "持久化部署"

        ```
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

## 升级说明

=== "docker"

    !!! info "获取 CONTAINER ID"

        ```
        [root@kubepi ~]# docker ps -a | grep kubepi-server
        CONTAINER ID    IMAGE           COMMAND             CREATED         STATUS              PORTS                   NAMES
        -------------------------------------------------------------------------------------------------------------------------------
        a953fd099001    781302f01508    "kubepi-server"     12 days ago     Up 24 minutes       0.0.0.0:8080->80/tcp    trusting_snyder
        ```

    !!! info "获取 kubepi 持久化数据（持久化部署忽略此步骤）"

        ```
        # 创建持久化目录
        [root@kubepi ~]# mkdir -p /opt/kubepi/db

        # 拷贝容器内持久化文件
        # 注意：替换 kubepi_container_id
        [root@kubepi ~]# docker cp kubepi_container_id:/var/lib/kubepi/db/kubepi.db /opt/kubepi/db/
        ```

    !!! info "升级"

        ```
        # 下载最新镜像
        [root@kubepi ~]# docker pull kubeoperator/kubepi-server:latest

        # 停止 kubepi 服务（需要用到kubepi container id）
        # 注意：替换 kubepi_container_id
        [root@kubepi ~]# docker stop kubepi_container_id
        [root@kubepi ~]# docker rm kubepi_container_id

        # 启动服务
        [root@kubepi ~]# sudo docker run --privileged -d -v /opt/kubepi:/var/lib/kubepi --restart=unless-stopped -p 80:80 kubeoperator/kubepi-server
        ```

=== "kubectl"

    !!! info ""

        ```
        # 注意：确保 kubepi deployment 的镜像拉取策略为 imagePullPolicy: Always
        [root@kubepi ~]# kubectl -n kube-operator edit deployments.apps kubepi
        ```

        ```
        # 获取 kubepi pod 名称以及所在 namespace
        [root@kubepi ~]# kubectl get pod -n kube-operator | grep kubepi
        NAME                                       READY   STATUS    RESTARTS   AGE
        ---------------------------------------------------------------------------
        kubepi-6dc758d565-6l5zz                    1/1     Running   0          23h

        # 删除 Pod（重启服务）
        [root@kubepi ~]# kubectl -n kube-operator delete pod kubepi-6dc758d565-6l5zz
        ```

[KubePi]:https://github.com/KubeOperator/KubePi
[Kubernetes]:https://kubernetes.io