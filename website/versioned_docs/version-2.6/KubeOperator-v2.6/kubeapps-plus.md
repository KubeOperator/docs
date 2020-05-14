---
id: version-2.6-kubeapps-plus
title: 八、KubeApps Plus 应用商店使用指南
original_id: kubeapps-plus
---

## 1 什么是 KubeApps Plus ？

KubeApps Plus 是 KubeApps 的定制版本，基于 Web UI 界面在 Kubernetes 集群中部署和管理基于 Helm Chart 的应用程序。KubeApps 是由 Bitnami 发布的 Kubernetes 应用商店，KubeApps Plus 当前的主要定制包括前端重写、中文支持和纯离线支持。KubeApps Plus 使用 Apache License 2.0 许可, 与 KubeApps 相同。

KubeApps Plus 是 KubeOperator 内置的应用商店方案，通过应用商店向企业提供覆盖 CI/CD、数据库服务、AI 服务、无服务器计算等场景的云原生解决方案。

![kubeapps-plus](../../../img-2.4/kubeapps-plus.png)

#### KubeApps Plus 的主要功能

- 从 Helm Chart 仓库中浏览并部署 Helm Chart 应用；
- 集群中已有 Helm chart 应用的查看、升级和卸载；
- 支持自定义 Helm Chart 仓库（比如 ChartMuseum 和 JFrog Artifactory 等）；
- 基于 Kubernetes RBAC 的身份验证和授权；

## 2 安装指南

KubeApps Plus 安装分为两个步骤，首选安装 KubeApps Plus（自动或者手动安装），然后在 K8s 集群的 master 节点中安装 Helm Charts 离线包。下面分别介绍这两部分内容。

### 2.1 安装 KubeApps Plus
> 注：目前仅 K8s 1.16.4 以上版本支持 KubeApps Plus。默认 KubeApps Plus 应用商店安装完成后，里面的应用默认为空，可以根据下方文档 2.2 中的安装步骤选择你需要的应用镜像上传使用，同时也支持配置连接外部应用商店仓库。


KubeApps Plus 的安装方式有两种，一种是在 KubeOperator 系统安装 K8s 集群时作为内置应用自动安装 KubeApps plus，这里不在赘述。

在 K8s 集群概览页可以看到 Kubeapps Plus 应用商店。

![kubeapps-plus](../../../img-2.4/screenshot-8.png)


另外一种是使用 Helm 图表手动安装到集群。下面仅简单介绍手动安装方法。

```bash 
# 登录 K8s 集群的 master 节点
git clone https://github.com/KubeOperator/kubeapps-plus.git
cd kubeapps-plus
helm install --name kubeapps-plus --namespace kubeapps-plus ./chart
```

上面的命令会将 KubeApps Plus 部署到集群中的 `kubeapps-plus` 命名空间中，该安装过程可能需要几分钟。后面章节详述怎样登录 KubeApps Plus Web UI。 

### 2.2 安装 Helm Charts 离线包

Helm Chart 离线包包括两个离线包，一个是集群相关的应用 CI / CD 应用离线包,包括 Argo CD、Gitlab、Harbor、Jenkins、Sonarqube、Kubernetes Dashboard 和 Weave Scope，另外一个是 AI 机器学习应用包括 Tensorflow-notebook 和 Tensorflow-serving，用户可以根据需要下载并安装。
请自行下载 Chart 离线包，并复制到目标机器的 /tmp 目录下。

- 下载链接: https://github.com/KubeOperator/kubeapps-plus/releases

默认使用本地 ChartMuseum 仓库，安装过程中需要手动输入的信息，选择默认值，即选择不使用外部 Docker Image registry 和不使用外部 Chart 仓库。

#### 安装步骤:

```bash
# 首先登录 master 节点，进入 tmp (或其他自定义)目录,将 CI 和 AI 的包拷贝到该目录中。
cd /tmp
# 解压文件到本目录
tar zxvf kubeapps-plus-package-v1.2-xx.tar.gz
# 解压后会出现一个 kubeapps-plus-CI 目录
cd kubeapps-plus-package
# 执行 kubeappsctl.sh shell 文件,将会下载镜像并推送到本地(或自定义)仓库
./kubeappsctl.sh start
```
相同地，如果用户选择安装 AI 离线包，安装过程和上述步骤相同。

安装完成后，大概十分钟后，以上仓库中应用会更新到 KubeApps Plus 仪表板的应用商店中。

## 3 使用指南

### 3.1 登录 KubeApps Plus 

安装 KubeApps Plus 后, 在 KubeOperator 集群概览页获取 TOKEN ，保证将内置应用 KubeApps Plus Web URL 添加到本地 Host 文件中。

 在 KubeOperator 集群【概览】页，单击 KubeApps 应用商店链接，可以安全地访问 KubeApps Plus 仪表板。

![控制台登录页面](../../../img-kubeapps-plus/dashboard-login.jpeg)

粘贴集群概览页获取的令牌以认证和访问 Kubernetes 的 KubeApps Plus 仪表板。

![仪表板主页](../../../img-kubeapps-plus/dashboard.png)

 ### 3.2 部署 GitLab 应用

登录 KubeApps Plus 仪表板后, 就可以开始将应用程序部署到集群中。

在仪表板中的【应用商店】页中可以看到系统默认自带的六个应用（假设用户安装完成 apps 和 AI 离线包），可选择一个应用程序部署。 本文以部署 GitLab 应用为例说明。

![gitlab-1](../../../img-kubeapps-plus/gitlab-apps.png)

首选根据用户需要选择一个 namespace，这里选择 kube-system namespace，然后单击部署应用，可以看到【应用商店】里面目前支持的应用列表。选择 GitLab 应用后,在应用页面右侧单击 “部署” 按钮。

![gitlab-2](../../../img-kubeapps-plus/gitlab-deploy.png)

系统将提示输入应用程序的名称，还可以看到目前版本，以及 GitLab 应用 YAML 配置文件，用户可根据自身需求修改该配置文件。

```bash
#建议修改以下参数,并且 externalUrl 和 url 保持相同。
externalUrl: http://gitlab.apps.fit2cloud.com/
gitlabRootPassword:********
url: gitlab.apps.fit2cloud.com
```

![gitlab-3](../../../img-kubeapps-plus/gitlab-config.png)

在最下面点击“提交”按钮。 该应用程序将被部署。 部署成功后，应用变为就绪状态。

![gitlab-4](../../../img-kubeapps-plus/gitlab-submmit.png)

要获取 GitLab 用户名和密码, 请参考部署页面的 “描述” 部分, 其中包含 GitLab 的 URL、账号及密码信息。注意要将该 URL 添加到本地 host 解析。

通过该 URL 登录 GitLab 应用系统。 

![gitlab-5](../../../img-kubeapps-plus/gitlab-dashboard.png)

### 3.3 删除应用

部署完成的应用如果要删除，可以在【我的应用】进入 GitLab 应用后，单击右侧 “删除” 按钮确定即可删除。

![delete-app](../../../img-kubeapps-plus/gitlab-delete.png)

### 3.4 添加存储库

KubeApps Plus 支持添加外部应用仓库，在【配置】下拉菜单“应用存储库“页面，单击“添加应用仓库”。

![addchart](../../../img-kubeapps-plus/add-chart.png)

输入仓库名称和网址，提交后在应用商店页使用新添加仓库里面的应用。

![addchart](../../../img-kubeapps-plus/chart-infor.png)

### 3.5 更新命名空间

如果在 K8s 集群中用户新建了 namespace, KubeApps Plus Web 端需要手动更新 namespace, 即在首页【配置】下拉菜单“更新命名空间”。

![update-namespace](../../../img-kubeapps-plus/update-namespace.png)

更新成功后，在 namespace 列表中可以看到集群中所有的 namespace。

![namespace-list](../../../img-kubeapps-plus/namespace-list.png )

> 注：kube-operator 和 kubeapps-plus namespace 是 KubeOperator 系统安装内置应用使用的，仅支持查看应用，不能部署新应用和删除应用。



