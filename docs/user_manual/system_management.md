
!!! warning "注意"
    在使用 KubeOperator 之前，必须先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问

### 仓库

!!! info ""
    * 仓库协议: 支持 http 和 https
    * 仓库 IP: 默认为部署 KubeOperator 的服务器 IP（将使用该 IP:8081 来访问 nexus 仓库）
    * CPU架构: 支持 x86_64 和 arm64

!!! info "帮助"
    * 8081: nexus 仓库默认管理端口
    * 8082: docker group 仓库端口（适用于 docker pull 操作）
    * 8083: docker hosted 仓库端口（适用于 docker push 操作）
    * 仓库默认用户名/密码: admin/admin123

![system](../img/user_manual/system_management/registry.png)

!!! warning "注意"
    如果部署K8S集群时需要K8S节点采用 x86_64 和 arm64 混合部署，则需要添加两个不同CPU架构的仓库

!!! warning "自定义 Nexus 仓库端口"
    * v3.9.0 版本开始，KubeOperator 支持用户自定义 Nexus 仓库端口
    * 修改安装目录中的 kubeoperator.conf 配置文件，重启 KubeOperator 服务后即可生效。之后需要在 系统设置 - 仓库设置 的高级设置栏目中完成 Nexus 仓库端口的变更

### 凭据

!!! warning ""
    * 凭据为 KubeOperator 连接主机资产的凭证。支持添加 password 和 privatekey 两种方式的凭据
    * 系统会初始化名称为 kubeoperator 的凭据作为自动模式所创建服务器的密码，默认密码为 KubeOperator@2019

![password](../img/user_manual/system_management/key-1.png)

![key](../img/user_manual/system_management/key-2.png)

!!! warning "密钥"
    在 KubeOperator 主机中首先生成 id_rsa 和 id_rsa.pub 密钥对，将 id_rsa.pub 公钥里面内容添加要连接的目标主机 authorized_keys 文件中，authorized_keys 文件权限需要设置为 600 。然后在 KubeOperator 控制台的【凭据】页面，将开始生成的 id_rsa 私钥文件内容复制到凭据的密钥框中。注意这里的账号需要 root 账号

### NTP

!!! info ""
    * NTP Server: 时间同步服务器，默认可以为空。也可以自建或使用公共 NTP Server
    
![system](../img/user_manual/system_management/ntp.png)

### 邮箱

!!! warning ""
    电子邮件服务器用于向重置密码和消息中心开启邮件功能的用户发送邮件

![email](../img/user_manual/system_management/email-1.png)

### 许可证

!!! warning ""
    支持 license 导入，启用 x-pack 功能

![license](../img/user_manual/system_management/license-1.png)
