
!!! warning ""
    - 支持 Harbor、Nexus、Docker Registry三种类型
    - 创建 Workloads 时可以选择镜像仓库中已有镜像

![registry](../img/kubepi/registry.png)

!!! warning "地址"
    镜像仓库服务地址，供 KubePi 调用仓库 Rest API 时使用

!!! warning "镜像库"
    - Nexus: 对应系统中 docker 类型的 repositories
    - Harbor: 对应系统中项目（Project）

!!! warning "镜像下载地址"
    镜像名称前缀，格式一般是 <域名/IP>[:端口号]

!!! warning "允许匿名docker pull"
    - 是: 创建 workload 时，不需要指定 docker registry 类型 secrets
    - 否: 创建 workload 时，系统会自动生成 docker registry 类型 secrets 并绑定到 workload