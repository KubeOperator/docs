
!!! warning ""
    - 集群列表页点击授权按钮

![cluster-authorization](../img/kubepi/cluster-authorization.png)

### 成员

!!! warning ""
    - 将用户添加为集群成员并为其指定集群和命名空间角色

![cluster-authorization](../img/kubepi/cluster-authorization.png)

#### 集群角色

!!! warning ""
    - 管理员: 拥有集群所有资源的操作权限
    - 只读者: 拥有集群所有资源的只读权限
    - 自定义: 拥有集群指定资源的指定权限

#### 命名空间角色

!!! warning ""
    - 需要将集群角色选择为自定义

### 仓库

!!! warning ""
    将已创建的镜像仓库授权到目标集群

    - 注意: 创建工作负载时选择的镜像仓库需要在此处授权