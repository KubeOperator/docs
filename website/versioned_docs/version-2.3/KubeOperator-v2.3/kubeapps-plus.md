---
id: version-2.3-kubeapps-plus
title: 八、安装和使用应用商店
original_id: kubeapps-plus
---

## 1 什么是 KubeApps Plus ？

KubeApps Plus 是 KubeApps 的定制版本，基于 Web UI 界面在 Kubernetes 集群中部署和管理基于 Helm Chart 的应用程序。KubeApps 是由 Bitnami 发布的 Kubernetes 应用商店，KubeApps Plus 当前的主要定制包括前端重写、中文支持和纯离线支持。KubeApps Plus 使用 Apache License 2.0 许可, 与 KubeApps 相同。

KubeApps Plus 是 KubeOperator 内置的应用商店方案，目前应用商店中的应用（支持离线部署）包括：

DevOps 工具链应用：GitLab、Jenkins、Harbor、Sonarqube 等；
AI 深度学习应用：Tensorflow 等;
其他的应用可以通过自定义 Helm Chart 仓库进行安装。

## 2 安装 KubeApps Plus

### 2.1 自动安装

KubeApps Plus 是 KubeOperator 的一个内置应用。通过 KubeOperator 部署的 K8s 集群会自动安装上 KubeApps Plus；


### 2.2 手动安装

使用 Helm 图表安装最新版本的 KubeApps Plus: 

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps-plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

上面的命令会将 KubeApps Plus 部署到集群中的 `kubeapps-plus` 名称空间中。 执行可能需要几分钟。 部署完成并且 KubeApps Plus 容器运行后, 继续执行步骤2。

## 3 部署应用

### 3.1 登录 KubeApps Plus 

安装 KubeApps Plus 后, 在 KubeOperator 集群概览页获取 TOKEN ，保证将内置应用 KubeApps Plus web url 添加到本地host文件。

这将启动 HTTP 代理, 以安全地访问 KubeApps Plus 仪表板。 在您喜欢的网络浏览器中访问 `http://127.0.0.1:8080/` 以打开仪表板。 这是您应该看到的: 

![控制台登录页面](../../../img/dashboard-login.png)

粘贴集群概览页获取的令牌以认证和访问 Kubernetes 的 KubeApps Plus 仪表板。

![仪表板主页](../../../img/dashboard-home.png)

 ### 3.2 部署 WordPress

一旦 KubeApps Plus 仪表板启动并运行, 就可以开始将应用程序部署到群集中。

- 使用仪表板中的 “目录” 页面从任何已配置的Helm图表存储库中的图表列表中选择一个应用程序。 本示例假定您要部署 WordPress。

  ![WordPress图表](../../../img/wordpress-search.png)

- 单击 “使用 Helm 部署”按钮。

  ![WordPress图表](../../../img/wordpress-chart.png)

- 系统将提示您输入应用程序的发行名称和值。

  ![WordPress安装](../../../img/wordpress-installation.png)

- 点击“提交”按钮。 该应用程序将被部署。 您将能够直接从浏览器跟踪新的 Kubernetes 部署。

  ![WordPress部署](../../../img/wordpress-deployment.png)

要获取 WordPress 用户名和密码, 请参考部署页面的 “注释” 部分, 其中包含您需要运行以获取部署凭据的命令。

您也可以使用显示的URL直接访问应用程序。 
请注意, 根据您选择的云提供商的不同, 访问URL可能需要一些时间才能用于应用程序, 并且该服务将保持“待处理”状态, 直到分配了URL。 
如果使用 Minikube, 则需要在终端中运行 `minikube tunnel`, 以便将IP地址分配给您的应用程序。

![WordPress部署说明](../../../img/wordpress-notes.png)
