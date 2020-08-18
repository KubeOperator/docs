## 环境要求

!!! info "服务器要求"
    ### KubeOperator 部署服务器要求：
    * 操作系统: 任何支持 Docker 的 Linux x86_64
    * CPU/内存: 4核8G
    * 磁盘空间: 50G
    * 防火墙或安全组需开放端口: 80、8081-8083
    * 系统：关闭 selinux
    ### K8S 节点服务器要求：
    * 操作系统: CentOS/RHEL 7.4 及以上版本，EulerOS 2.5（X86），EulerOS 2.8（ARM64）
    * CPU/内存: 2核4G
    * 磁盘空间: 50G
    * 系统：关闭 selinux

    
## 下载安装包
> 请自行下载 KubeOperator 最新版本的离线安装包，并复制到目标机器的 /tmp 目录下

!!! tip ""
    安装包下载链接: https://github.com/KubeOperator/KubeOperator/releases

## 解压安装包
> 以 root 用户 ssh 登录到目标机器, 并执行如下命令

```sh
cd /tmp
# 解压安装包
tar zxvf KubeOperator-release-v3.x.y.tar.gz
```

## 执行安装脚本

```sh
# 进入安装包目录
cd KubeOperator-release-v3.x.y
# 运行安装脚本
/bin/bash install.sh
# 等待安装脚本执行完成后，查看 KubeOperator 状态
koctl status
```

!!! info "安装完成后，以下服务应都处于 healthy 状态。若有服务未正常启动，可以使用 koctl restart 命令进行重新启动"
    ```
    [root@kubeoperator ~]# koctl status
    
             Name                        Command                  State                                       Ports
    ------------------------------------------------------------------------------------------------------------------------------------------------
    kubeoperator_grafana      /run.sh                          Up (healthy)   3000/tcp
    kubeoperator_kobe         kobe-server                      Up (healthy)   8080/tcp
    kubeoperator_kotf         kotf-server                      Up (healthy)   8080/tcp
    kubeoperator_mysql        /entrypoint.sh mysqld            Up (healthy)   3306/tcp, 33060/tcp
    kubeoperator_nexus        sh -c ${SONATYPE_DIR}/star ...   Up             0.0.0.0:8081->8081/tcp, 0.0.0.0:8082->8082/tcp, 0.0.0.0:8083->8083/tcp
    kubeoperator_nginx        /docker-entrypoint.sh ngin ...   Up (healthy)   0.0.0.0:80->80/tcp
    kubeoperator_server       ko-server                        Up (healthy)   8080/tcp
    kubeoperator_ui           /docker-entrypoint.sh ngin ...   Up (healthy)   80/tcp
    kubeoperator_webkubectl   sh /opt/webkubectl/start-w ...   Up (healthy)
    ```
  
## 登录
> 安装成功后，通过浏览器访问，输入以下信息登录 KubeOperator。如果网络环境中有防火墙或安全组请开启 TCP/80,8081-8083 端口。
```
地址: http://目标服务器IP地址:80
用户名: admin
密码: kubeoperator@admin123
```
    
## 帮助
```
koctl --help
```

## 升级

```sh
# 进入项目目录
cd KubeOperator-release-v3.x.y
# 运行安装脚本
koctl upgrade
# 查看 KubeOperator 状态
koctl status
```
