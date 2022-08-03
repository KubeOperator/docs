### 仓库

!!! warning ""
    - CPU 架构: 支持 x86_64 和 aarch64
    - 协议: 支持 http 和 https（需手动启用）
    - 地址: 默认为部署 KubeOperator 的服务器 IP（将使用 IP:8081 来访问 nexus 仓库）

![system](../img/user_manual/system_management/registry.png)

### 凭据

!!! warning ""
    - 凭据为 KubeOperator 连接主机资产的凭证。支持添加 password 和 privatekey 两种方式的凭据
    - 系统会初始化名称为 kubeoperator 的凭据（自动模式默认模版创建服务器的密码），默认密码为: KubeOperator@2019

!!! warning "密钥"
    - 1、在 KubeOperator 主机通过 ssh-keygen 命令生成 id_rsa 和 id_rsa.pub 密钥对
    - 2、将 id_rsa.pub 公钥内容添加到目标主机 .ssh/authorized_keys 文件中 
    - 3、将 id_rsa 私钥内容添加到凭据密钥框中

![password](../img/user_manual/system_management/key-1.png)

![key](../img/user_manual/system_management/key-2.png)

### NTP

!!! warning ""
    - 支持配置多个 NTP 服务器地址
    - 支持手动启用或禁用 NTP 服务器
    
![ntp](../img/user_manual/system_management/ntp.png)

### Dashboard

!!! warning ""
    此处为 admin 用户登录凭据，需要和 Dashboard 用户管理中设置的密码保持一致。
