## 项目管理

KubeOperator 系统中默认创建 KubeOperator 项目。
系统管理员（admin 账号和新建的系统管理员账号）可以创建多个项目，项目内可以部署多个集群，不同项目之间的集群除系统管理员以外账号是不可见的。
项目管理员管理该项目的集群，通过授权资源（包括主机，部署计划和备份账号）给项目，然后可以开始创建集群。

### 创建项目

【项目管理】页，点击【添加】，输入项目名称和描述信息提交，创建项目完成后并不能马上创建 K8s 集群，需要授权集群所需的资源。

![project-1](../img/user_manual/project/project-1.png)

### 添加成员

系统管理员账号可以分配一个或多个项目管理员角色给项目，项目管理员可以对该项目创建，安装，升级等等管理集群的操作。

![project-2](../img/user_manual/project/project-2.png)

![project-3](../img/user_manual/project/project-3.png)

### 资源授权

在 KubeOperator 环境中的资源需要系统管理员或项目管理员授权给项目后才可以使用，包括主机、备份账号等。
例如，在【项目管理】--【 qa 】项目--【资源】中，授权主机、备份账号等。

![project-4](../img/user_manual/project/project-4.png)

![project-5](../img/user_manual/project/project-5.png)

在选择该项目创建集群时，授权的资源在可选列表里面。所以创建手动模式集群，主机必须授权。