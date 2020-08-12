## 集群运营

### 概览

【概览】页面，集中显示了集群基本信息、容量信息和统计信息。

![overview-1](../img/user_manual/cluster/overview-1.png)

KubeOperator 支持 Webkubectl。在集群【概览】页单击 连接 按钮，在输入框中就可以执行命令查询集群信息等操作。

![overview-2](../img/user_manual/cluster/overview-2.png)

### 节点

【节点】页面，显示了集群节点相关信息。并支持扩缩容 K8s 集群 worker 节点数量。

![node-1](../img/user_manual/cluster/node-1.png)

![node-2](../img/user_manual/cluster/node-2.png)

> 集群worker节点扩容

![node-3](../img/user_manual/cluster/node-3.png)

> 集群worker节点缩容

### 命名空间

【命名空间】页面，显示了集群中现有的namespace。

![namespace-1](../img/user_manual/cluster/namespace-1.png)

### 存储

【存储】页面，可以设置存储提供商（provisioner）、存储类（storageclass）、持久卷（PersistentVolume）。

![storage-1](../img/user_manual/cluster/storage-1.png)

#### 存储提供商

支持的类型有nfs、external-ceph、rook-ceph、vsphere。

!!! info "注意"
    rook-ceph: 集群所有节点都必须包含指定的磁盘。

    vsphere: 集群服务器必须在指定Folder中，并且服务器名称要和集群node节点名称保持一致。

#### 存储类

内置 local volume 存储提供商，如需添加其他类型，需要提前创建对应类型的存储提供商。

!!! info "注意"
        external-ceph: 需要在 kubernetes 中创建 admin 及 user 所需的 secret。

```
# 可在 ceph 服务端通过以下命令获得 secret key
ceph auth get-key client.admin

# 创建 admin secret
kubectl create secret generic ceph-admin-secret \
--namespace=kube-system \
--type=kubernetes.io/rbd \
--from-literal=key=AQCtabcdKvXBORAA234AREkmsrmLdY67i8vxSQ==
```

#### 持久卷

可添加 hostpath 和 local volume 两种类型的持久卷。

### 工具

【工具】页面，提供了 prometheus、chartmuseum、registry、dashboard和kubeapps 五种管理工具，可根据需要自定义安装。

![tools-1](../img/user_manual/cluster/tools-1.png)

点击启用按钮，可以设置参数，如: 是否启用存储、设置存储值、选择存储类等。

![tools-2](../img/user_manual/cluster/tools-2.png)

### 备份

【备份】页面，可以设置备份账号、状态来实现集群备份功能。选中备份记录，可以实现集群数据恢复功能。

![cluster-backup-1](../img/user_manual/cluster/cluster-backup-1.png)

### 历史

【历史】页面，可以查看针对集群的操作记录以及异常时的错误日志。

### 仓库

【仓库】页面，需要在【工具】页面安装镜像仓库(registry)、chart仓库(chartmuseum)后。

![repository-1](../img/user_manual/cluster/repository-1.png)

### 监控

【监控】页面，需要在【工具】页面安装 Prometheus 作为 Grafana 的默认数据源。

![monitor-1](../img/user_manual/cluster/monitor-1.png)
