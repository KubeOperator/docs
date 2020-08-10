## 系统设置

在使用 KubeOperator 之前，必须先对 KubeOperator 进行必要的参数设置。这些系统参数将影响到 Kubernetes 集群的安装及相关服务的访问。

### 主机 IP 和 NTP Server

在左侧导航菜单中选择【系统设置】，默认显示系统页中，

本机 IP ：指安装 KubeOperator 机器自身的 IP。KubeOperator 所管理的集群将使用该 IP 来访问 KubeOperator。

NTP Server ：用来实现集群所有主机时间同步，默认可以为空，也可以自建或网上查找公共的 NTP Server。

![setting-1](../img/user_manual/system_management/system-1.png)

### 凭据

凭据为 KubeOperator 连接主机资产的凭证。在左侧导航菜单中选择【系统设置】，进入【系统设置】页后点击【凭据】可以看到已添加凭据信息。

点击【添加】按钮添加 password 方式的凭据。

![key-1](../img/user_manual/system_management/key-1.png)

> 注：系统会初始化名称为kubeoperator的凭据作为自动模式所创建服务器的密码。

凭据也可以使用密钥方式登录主机。单击【添加】按钮，选择 privatekey 方式登录目标主机，输入凭据名称和 root 账号，然后将 id_rsa 私钥内容复制到密钥框里，确认。

![key-2](../img/user_manual/system_management/key-2.png)

> 注：密钥方法连接主机举例说明：在 KubeOperator 主机中首先生成 id_rsa 和 id_rsa.pub 密钥对，将 id_rsa.pub 公钥里面内容添加要连接的目标主机 authorized_keys 文件中，authorized_keys 文件权限需要设置为 600 。然后在 KubeOperator 控制台的【凭据】页面，将开始生成的 id_rsa 私钥文件内容复制到凭据的密钥框中。注意这里的账号需要 root 账号。

### 集群备份

KubeOperator 目前的备份功能支持三种不同种类的存储，即 AWS S3、aliyun oss 和 Azure 存储。为集群备份和恢复提供存储支持，实现备份和恢复功能。

添加备份账号之前，请首先自行准备好 AWS S3 ，aliyun oss 或者 Azure 存储账号信息，包括 AccessKey，SecretKey，endpoint 和桶/容器信息。
以添加 S3 为例，在【系统设置】的【备份】Tab 也中输入名称和 AccessKey，SecretKey 和端点（对应 AWS S3 系统里的 endpoint），单击【获取桶/容器】获取桶名称，建议在 S3 新建一个桶单独使用，最后提交。

![backup-1](../img/user_manual/system_management/backup-1.png)

### 许可
