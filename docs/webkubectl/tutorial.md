
### 使用首页

!!! warning ""
    在浏览器中打开下方的网址。
    ```sh
    http://<webkubectl-address>:<port>
    ```
    在打开的页面中，您可以管理您自己的 kubeconfig 文件或 bearer token 凭据，这些凭据存储在您本地浏览器的 Local Storage 中。然后选择一个会话，单击“连接”在弹出的 Web 终端中使用 kubectl 命令。

![index](https://raw.githubusercontent.com/KubeOperator/webkubectl/master/web-resources/index.jpg)

![terminal](https://raw.githubusercontent.com/KubeOperator/webkubectl/master/web-resources/terminal.jpg)

### 使用 API

#### 通过Kubernetes API Server地址和bearer token获取终端Token

!!! warning ""
    ```sh
    $ curl http://<webkubectl-address>:<port>/api/kube-token -X POST -d '{"name":"gks-hk-dev","apiServer":"https://k8s-cluster:6443","token":"token-content"}'
    # response
    $ {"success":true,"token":"mkolj4hgbutfgy1thgp1","message":""}
    ```

!!! warning "请求参数"
    <table>
        <tr>
            <td>参数名</td>
            <td>参数类型</td>
            <td>参数描述</td>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>会话名称</td>
        </tr>
        <tr>
            <td>apiServer</td>
            <td>string</td>
            <td>Kubernetes API Server地址</td>
        </tr>
        <tr>
            <td>token</td>
            <td>string</td>
            <td>Kubernetes Bearer Token</td>
        </tr>
    </table>

!!! warning "响应结果"
    <table>
        <tr>
            <td>参数名</td>
            <td>参数类型</td>
            <td>参数描述</td>
        </tr>
        <tr>
            <td>success</td>
            <td>bool</td>
            <td>打开终端时使用的Token</td>
        </tr>
        <tr>
            <td>token</td>
            <td>string</td>
            <td>Kubernetes API Server地址</td>
        </tr>
        <tr>
            <td>message</td>
            <td>string</td>
            <td>错误信息</td>
        </tr>
    </table>

#### 通过kubeconfig文件获取终端Token

!!! warning ""
    ```sh
    $ curl http://<webkubectl-address>:<port>/api/kube-config -X POST -d '{"name":"k8s-cluster-bj1","kubeConfig":"<Kubernetes config file content base64 encoded>"}'
    # response
    $ {"success":true,"token":"mkolj4hgbutfgy1thgp1","message":""}
    ```

!!! warning "请求参数"
    <table>
        <tr>
            <td>参数名</td>
            <td>参数类型</td>
            <td>参数描述</td>
        </tr>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>会话名称</td>
        </tr>
        <tr>
            <td>kubeConfig</td>
            <td>string</td>
            <td>Base64编码后的kubeconfig文件内容</td>
        </tr>
    </table>

!!! warning "响应结果"
    <table>
        <tr>
            <td>参数名</td>
            <td>参数类型</td>
            <td>参数描述</td>
        </tr>
        <tr>
            <td>success</td>
            <td>bool</td>
            <td>打开终端时使用的Token</td>
        </tr>
        <tr>
            <td>token</td>
            <td>string</td>
            <td>Kubernetes API Server地址</td>
        </tr>
        <tr>
            <td>message</td>
            <td>string</td>
            <td>错误信息</td>
        </tr>
    </table>

#### 使用API响应中的Token打开终端

!!! warning ""
    ```sh
    http://<webkubectl-address>:<port>/terminal/?token=<API响应中的Token>
    ```