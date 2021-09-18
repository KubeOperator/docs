
!!! warning ""
    - [WebKubectl][WebKubectl] 帮助您管理 [Kubernetes][Kubernetes] 集群的凭据，并在 Web 浏览器中运行 kubectl 命令，从而不必在本地 PC 或其他服务器上安装 kubectl。
    - [WebKubectl][WebKubectl] 也适用于团队多人同时使用，此外还可以使用 API 集成到您自己的应用中。

### UI 展示

![UI展示](https://raw.githubusercontent.com/KubeOperator/webkubectl/master/web-resources/webkubectl.gif)

### 技术优势

!!! warning ""
    - 支持多用户和多个 [Kubernetes][Kubernetes] 集群：一个 [WebKubectl][WebKubectl] 部署可用于一个团队，尽管团队各个成员都在同时连接不同的 [Kubernetes][Kubernetes] 集群、使用不同的 [Kubernetes][Kubernetes] 权限。
    - 会话隔离：所有的在线会话都是隔离的，每个会话都有自己的命名空间和存储空间，对其他存储空间不可见。
    - 支持 kubeconfig 文件和 bearer token：您可以提供 kubeconfig 文件或 bearer token 以通过 [WebKubectl][WebKubectl] 连接 [Kubernetes][Kubernetes] 集群。
    - 易于使用和集成：使用 [WebKubectl][WebKubectl] 首页可以快速入门，或者使用API与您的应用集成。
    - 管理 VPC 中的 [Kubernetes][Kubernetes] 集群：通过 [WebKubectl][WebKubectl] 您可以管理那些在 VPC 中、您自己的电脑无法直接连接的 [Kubernetes][Kubernetes] 集群。


```sh
_______________________________________________________________________
|   Local Network     |          DMZ           |      VPC/Datacenter  |
|                     |                        |                      |
|                     |    _______________     |   ----------------   |
|   ---------------   |    |             |  /~~~~~>| Kubernetes A |   |
|   | Your Laptop |~~~~~~~>| Web Kubectl | /   |   ----------------   |
|   ---------------   |    |             | \   |                      |
|                     |    ---------------  \  |   ----------------   |
|                     |                      \~~~~>| Kubernetes B |   |
|                     |                        |   ----------------   |
-----------------------------------------------------------------------
```

### 架构

!!! warning ""
    - [WebKubectl][WebKubectl] 使用 [webkubectl/gotty](https://github.com/KubeOperator/webkubectl/tree/master/gotty) 在 Web 浏览器中运行基于 JavaScript 的 Shell 终端。
    - 当打开一个新会话时，将为该会话创建一个临时 Linux 命名空间，以确保所有会话都是隔离的，每个会话都有自己的命名空间和存储，同时为当前会话生成 ~/.kube/config 文件。
    - 会话结束后，临时命名空间和存储将被删除。

### 安全

!!! warning ""
    - 终端 Token 验证：从 API 响应中获取的终端 Token 使用一次后将立即失效，如果一直不使用，则在5分钟后过期。
    - Authentication：默认情况下，无需进行任何身份验证即可访问所有资源，若要限制匿名访问，可以启用 gotty 的基本身份验证，请参见[操作方法](https://github.com/KubeOperator/webkubectl/blob/master/gotty/GOTTY_USAGE.md#options)。
    - SSL/TLS：默认情况下，服务器与客户端之间的所有流量均未加密，我们建议您启用 gotty 的 SSL / TLS选项，请参见[操作方法](https://github.com/KubeOperator/webkubectl/blob/master/gotty/GOTTY_USAGE.md#options)。或者，您可以在代理后面部署 [WebKubectl][WebKubectl] 并为该代理启用 SSL / TLS，请注意，您的代理需要支持 WebSocket 协议。

### 扩展

!!! warning ""
    - [kubectl插件](https://github.com/topics/kubectl-plugins): [ahmetb/kubectx](https://github.com/ahmetb/kubectx)
    - [ahmetb/kubectl-aliases](https://github.com/ahmetb/kubectl-aliases)
    - [derailed/k9s](https://github.com/derailed/k9s)
    - [helm/helm](https://github.com/helm/helm)

### 依赖

!!! warning ""
    - [webkubectl/gotty](https://github.com/KubeOperator/webkubectl/tree/master/gotty)
    - [ahmetb/kubectx](https://github.com/ahmetb/kubectx)
    - [ahmetb/kubectl-aliases](https://github.com/ahmetb/kubectl-aliases)
    - [junegunn/fzf](https://github.com/junegunn/fzf)
    - [derailed/k9s](https://github.com/derailed/k9s)
    - [helm/helm](https://github.com/helm/helm)

[WebKubectl]:https://github.com/KubeOperator/webkubectl
[Kubernetes]:https://kubernetes.io