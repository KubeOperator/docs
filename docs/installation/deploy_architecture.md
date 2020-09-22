
## 总体架构

!!! tip ""
    KubeOperator 产品架构如下图所示

![Architecture](https://kubeoperator.io/images/screenshot/ko-framework.svg)

## 模块说明

!!! tip ""
    - kubeoperator_server: 提供平台业务管理相关功能的后台服务；
    - kubeoperator_ui: 提供平台业务管理相关功能的前台服务；
    - kubeoperator_kobe: 提供执行 Ansible 任务创建 Kubernetes 集群的功能；
    - kubeoperator_kotf: 提供执行 Terraform 任务创建虚拟机的功能；
    - kubeoperator_webkubectl: 提供在 Web 浏览器中运行 kubectl 命令的功能；
    - kubeoperator_nginx: 平台统一入口，并运行控制台的 Web 界面服务；
    - kubeoperator_mysql: 数据库管理组件；
    - kubeoperator_nexus: 仓库组件，提供 Docker、Helm、Raw、Yum等资源仓库功能；
    - kubeoperator_grafana: 监控组件，提供平台监控等相关功能；
