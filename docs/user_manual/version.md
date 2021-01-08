
### 版本详情

!!! warning ""
    点击详情按钮，支持查看 Kubernetes 及各个组件的版本信息

!!! info "核心"
    * [kubernetes](https://github.com/kubernetes/kubernetes) v1.18.14
    * [etcd](https://github.com/coreos/etcd) v3.4.14
    * [docker](https://www.docker.com/) 19.03.9
    * [containerd](https://containerd.io/) 1.4.3

!!! info "网络"
    * [calico](https://github.com/projectcalico/calico) v3.16.5
    * [flanneld](https://github.com/coreos/flannel) v0.13.0

!!! info "应用"
    * [coredns](https://github.com/coredns/coredns) 1.8.0
    * [traefik](https://github.com/containous/traefik) v2.2.1
    * [ingress-nginx](https://github.com/kubernetes/ingress-nginx) 0.33.0
    * [metrics-server](https://github.com/kubernetes-sigs/metrics-server) v0.3.6
    * [helm-v2](https://github.com/helm/helm) v2.17.0
    * [helm-v3](https://github.com/helm/helm) v3.4.1

### 版本启用

!!! warning ""
    开启目标版本后，才支持创建该版本 k8s 集群

![region-1](../img/user_manual/version/version-1.png)

### 构建离线包

!!! warning ""
    离线包中 Kubernetes 默认只携带最新的两个版本。如果当前是离线环境，需要执行脚本生成旧版本 k8s 离线包，并推送至 nexus 仓库

#### 构建离线包

!!! warning ""
    执行构建离线包的服务器需要能够访问互联网

!!! warning ""
    ```sh
    # 下载脚本
    wget https://github.com/KubeOperator/KubeOperator/releases/latest/download/K8SVersionManage.tar.gz
    # 解压并执行生成离线包脚本
    tar zxvf K8SVersionManage.tar.gz
    cd K8SVersionManage
    # 例：打包 v1.18.10 版本的离线包 
    bash build.sh v1.18.10
    ```
!!! warning ""
    build 完成后，会生成类似 v1.18.10_offline.tar.gz的离线包

#### 推送离线包

!!! warning ""
    将生成的目标版本离线包上传至 KubeOperator 部署机，运行上传脚本。

!!! warning ""
    ```sh
    # 解压离线包
    tar zxvf v1.18.10_offline.tar.gz
    # 执行上传脚本
    cd v1.18.10_offline
    # 例：推送 v1.18.10 版本的离线包 
    bash upload.sh
    ```

!!! warning ""
    - 仓库地址：KubeOperator 默认仓库地址（registry.kubeoperator.io）
    - 仓库用户名：KubeOperator 默认仓库用户名（admin）
    - 仓库密码：KubeOperator 默认仓库密码（admin123）