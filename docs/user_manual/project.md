
> KubeOperator 系统自带一个默认项目。除默认项目外，系统管理员（admin 账号和新建的系统管理员账号）可以创建其他项目，项目内可以部署多个集群，不同项目之间的集群除系统管理员以外账号是不可见的。项目管理员管理该项目的集群，通过授权资源（包括主机，部署计划和备份账号）给项目，然后可以开始创建集群。

### 创建项目
> 创建项目完成后需要授权集群所需的资源，然后创建 Kubernetes 集群

![project-1](../img/user_manual/project/project-1.png)

### 添加成员
> 系统管理员账号可以分配一个或多个项目管理员角色给项目，项目管理员可以对该项目创建、安装、升级等管理操作

![project-2](../img/user_manual/project/project-2.png)

![project-3](../img/user_manual/project/project-3.png)

### 资源授权
> 在 KubeOperator 环境中的资源需要系统管理员或项目管理员授权给项目后才可以使用，包括主机、备份账号等

![project-4](../img/user_manual/project/project-4.png)

![project-5](../img/user_manual/project/project-5.png)

> 注: 创建手动模式集群，必须要先将 Kubernetes 节点主机授权到目标项目
