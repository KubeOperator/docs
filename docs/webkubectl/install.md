
!!! warning "快速开始"
    docker run --name="webkubectl" -p 8080:8080 -d --privileged kubeoperator/webkubectl

!!! warning "高级环境变量"
    <table>
        <tr>
            <td>ENV</td>
            <td>Type</td>
            <td>Default Value</td>
            <td>Description</td>
        </tr>
        <tr>
            <td>SESSION_STORAGE_SIZE</td>
            <td>string</td>
            <td>10M</td>
            <td>单会话的存储大小限制</td>
        </tr>
        <tr>
            <td>KUBECTL_INSECURE_SKIP_TLS_VERIFY</td>
            <td>bool</td>
            <td>true</td>
            <td>kubectl命令是否跳过tls验证</td>
        </tr>
        <tr>
            <td>GOTTY_OPTIONS</td>
            <td>string</td>
            <td>--port 8080 --permit-write --permit-arguments</td>
            <td>查看 [Gotty Options](https://github.com/KubeOperator/webkubectl/blob/master/gotty/GOTTY_USAGE.md#options)</td>
        </tr>
        <tr>
            <td>WELCOME_BANNER</td>
            <td>string</td>
            <td>Welcome to Web Kubectl, try kubectl --help.	</td>
            <td>Web终端打开后的欢迎横幅</td>
        </tr>
    </table>