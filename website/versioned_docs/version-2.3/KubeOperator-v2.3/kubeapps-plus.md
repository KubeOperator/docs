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

#### 主要功能

- 从 Helm Chart 仓库中浏览并部署 Helm Chart 应用；
- 集群中已有 Helm chart 应用的查看、升级和卸载；
- 支持自定义 Helm Chart 仓库（比如 ChartMuseum 和 JFrog Artifactory 等）；
- 基于 Kubernetes RBAC 的身份验证和授权；

![流程图](../../../img-kubeapps-plus/user-role-process-old.png)

## 2 安装指南

KubeApps Plus 安装分为两部分，首选安装 KubeApps Plus（自动或者手动安装），然后在 K8s 集群的 master 节点中安装 Helm Charts 离线包。下面分别介绍这两部分内容。

### 2.1 安装 KubeApps Plus

KubeApps Plus 的安装方式有两种，一种是作为 KubeOperator 的内置应用，在 KubeOperator 里面安装 K8s 集群时自动安装 KubeApps plus，这里不在赘述。另外一种是使用 Helm 图表手动安装到集群。下面仅简单介绍手动安装方法。

使用 Helm 图表安装最新版本的 KubeApps Plus: 

```bash
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps-plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

上面的命令会将 KubeApps Plus 部署到集群中的 `kubeapps-plus` 名称空间中，该安装过程可能需要几分钟。后面章节详述怎样登录 KubeApps Plus Web UI。 

### 2.2 安装Helm Charts 离线包

离线推送脚本，将 Kubeapps-plus 默认的 Chart 推送至指定的仓库。

默认使用本地 ChartMuseum 仓库，如果需要修改仓库地址，请修改 kubeappsctl.sh 文件里的 repo_url、repo_username、repo_password 等参数。

#### 使用方法:

```
# 首先登录 master 节点，其次进入 tmp (或其他自定义)目录
cd /tmp
wget http://172.16.10.63/kubeapps-plus/kubeapps-offline-scripts-v1.0-38.tar.gz
# 解压文件到本目录
tar zxvf kubeapps-offline-scripts-v1.0-38.tar.gz
# 解压后会出现一个 script 目录
cd script
# 执行 kubeappsctl.sh shell 文件,将会下载镜像并推送到本地(或自定义)仓库
./kubeappsctl.sh start
```

## 3 使用指南

### 3.1 登录 KubeApps Plus 

安装 KubeApps Plus 后, 在 KubeOperator 集群概览页获取 TOKEN ，保证将内置应用 KubeApps Plus web url 添加到本地host文件。

这将启动 HTTP 代理, 以安全地访问 KubeApps Plus 仪表板。 在您喜欢的网络浏览器中访问 `http://127.0.0.1:8080/` 以打开仪表板。 这是您应该看到的: 

![控制台登录页面](../../../img-kubeapps-plus/dashboard-login.png)

粘贴集群概览页获取的令牌以认证和访问 Kubernetes 的 KubeApps Plus 仪表板。

![仪表板主页](../../../img-kubeapps-plus/dashboard-home.png)

 ### 3.2 部署 WordPress

一旦 KubeApps Plus 仪表板启动并运行, 就可以开始将应用程序部署到群集中。

- 使用仪表板中的 “目录” 页面从任何已配置的Helm图表存储库中的图表列表中选择一个应用程序。 本示例假定您要部署 WordPress。

  ![WordPress图表](../../../img-kubeapps-plus/wordpress-search.png)

- 单击 “使用 Helm 部署”按钮。

  ![WordPress图表](../../../img-kubeapps-plus/wordpress-chart.png)

- 系统将提示您输入应用程序的发行名称和值。

  ![WordPress安装](../../../img-kubeapps-plus/wordpress-installation.png)

- 点击“提交”按钮。 该应用程序将被部署。 您将能够直接从浏览器跟踪新的 Kubernetes 部署。

  ![WordPress部署](../../../img-kubeapps-plus/wordpress-deployment.png)

要获取 WordPress 用户名和密码, 请参考部署页面的 “注释” 部分, 其中包含您需要运行以获取部署凭据的命令。

您也可以使用显示的URL直接访问应用程序。 
请注意, 根据您选择的云提供商的不同, 访问URL可能需要一些时间才能用于应用程序, 并且该服务将保持“待处理”状态, 直到分配了URL。 
如果使用 Minikube, 则需要在终端中运行 `minikube tunnel`, 以便将IP地址分配给您的应用程序。

![WordPress部署说明](../../../img-kubeapps-plus/wordpress-notes.png)

### 3.3 删除 WordPress

### 3.4 添加存储库

### 3.5 更新 namesapce
