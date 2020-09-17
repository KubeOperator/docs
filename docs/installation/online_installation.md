    
## 安装步骤

### 执行安装脚本
> 以 root 用户 ssh 登录目标服务器, 执行如下命令

```sh
curl -sSL https://github.com/KubeOperator/KubeOperator/releases/latest/download/quick_start.sh -o quick_start.sh
bash quick_start.sh
```

> 注:安装脚本默认使用 /opt/kubeoperator 目录作为安装目录，KubeOperator 的配置文件、数据及日志等均存放在该安装目录。安装过程中也可手动指定安装目录


!!! warning "注意"
    安装完成后，安装过程中产生的离线文件可删除，离线文件存放在当前目录，目录名: kubeoperator-release-v3.x.y

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
# 升级到最新版本
koctl upgrade
# 升级到指定版本
koctl upgrade v3.x.y
```
