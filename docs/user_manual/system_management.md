### 仓库

!!! warning ""
    - CPU 架构: 支持 x86_64 和 aarch64
    - 协议: 支持 http 和 https（需手动启用）
    - 地址: 默认为部署 KubeOperator 的服务器 IP（将使用 IP:8081 来访问 nexus 仓库）

#### 端口

!!! warning ""
    - 8081: nexus 仓库管理端口
    - 8082: docker group 仓库端口（适用于 docker pull 操作）
    - 8083: docker hosted 仓库端口（适用于 docker push 操作）
    !!! warning "开启/关闭"
        - 出于安全考虑，可以手动关闭 nexus 对外暴露的端口
        - ./kubeoperator/docker-compose.yml，将对应的端口注释，koctl restart 重启服务即可

#### 密码

!!! warning ""
    默认用户名/密码: admin/admin123（建议修改）
    !!! warning "修改密码"
        - 登录 nexus 系统修改默认密码
        - 将修改后的密码同步到 KubeOperator 仓库（KubeOperator 系统设置 - 仓库 - 编辑 - 修改密码）

#### group 仓库

!!! warning ""
    - 四个 proxy 仓库:
    !!! warning ""
        - docker hub: https://registry-1.docker.io
        - quay.io: https://quay.io
        - elastic: https://docker.elastic.co
        - aliyun: https://registry.cn-qingdao.aliyuncs.com
    - 一个 hosted 类型仓库:
    !!! warning ""
        - kubeoperator

#### hosted 仓库

!!! warning ""
    该类型仓库支持用户手动 push 镜像
    !!! warning "push 镜像"
        - docker login ip:8083 -u admin -p admin123
        - docker tag nginx:alpine ip:8083/nginx:alpine
        - docker push ip:8083/nginx:alpine

![registry](../img/user_manual/system_management/registry.png)

!!! warning "注意"
    如果部署K8S集群时需要K8S节点采用 x86_64 和 arm64 混合部署，则需要添加两个不同CPU架构的仓库

!!! warning "自定义 Nexus 仓库端口"
    - v3.9.0 版本开始，KubeOperator 支持用户自定义 Nexus 仓库端口
    - 修改 ./kubeoperator.conf 配置文件，koctl restart 重启服务后生效
    - 在 系统设置 - 仓库设置 的高级设置中完成仓库端口的变更

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

### LDAP

!!! warning ""
    LDAP 支持 使用 LADP 与 Windows AD 的用户作为 KubeOperator 登录用户。

!!! warning "选项说明"
    | name        | explain                                  |
    | :---------- | :----------------------------------------|
    | 地址         | serverurl                               |
    | 端口         | 389                                     |
    | 用户名       | CN=account,CN=Users,DC=ko,DC=com         |
    | 密码         | ********                                |
    | 用户过滤 DN   | dc=kubeoperator,dc=com                  |
    | 用户过滤器    | ((objectClass=organizationalPerson))    |
    | 用户属性映射  | {"Name": "cn", "Email": "mail"}          |

### 消息

!!! warning ""
    必须设置才能使用与消息订阅相关的功能

!!! warning "邮箱"
    | 名称 | 示例 | 备注 |
    | ---------- | ---------------- | ---------------------------------- |
    | SMTP地址   | smtp.qq.com      | 服务商提供的 smtp 服务器             |
    | 端口       | 25               | 通常是 `25`                         |
    | 用户名     | 296015668@qq.com | 通常是 `user@domain.com`            |
    | 密码       | **************** | 每次 `测试连接` 都需要重新输入密码    |
    | 测试用户    | 296015668@qq.com | `测试连接` 必须要输入                |

!!! warning ""
    - 企业微信: [企业微信基本概念](https://developer.work.weixin.qq.com/document/path/90665)
    - 钉钉: [钉钉机器人消息发送设置](https://open.dingtalk.com/document/group/assign-a-webhook-url-to-an-internal-chatbot)
