
## 登录

> 安装成功后，通过浏览器访问如下页面登录 KubeOperator

```
地址: http://目标服务器IP地址:80
用户名: admin
密码: kubeoperator@admin123
```

## 系统设置

!!! info "注意"
    * 系统 IP: 部署 KubeOperator 的服务器 IP。将使用该 IP 来访问 KubeOperator
    * NTP Server: 时间同步服务器，默认可以为空。也可以自建或使用公共 NTP Server

![setting-1](./img/user_manual/system_management/system-1.png)

!!! info "注意"
    手动模式创建集群，需要提前设置好主机凭据

![key-1](./img/user_manual/system_management/key-1.png)

> 注: 系统会初始化名称为 kubeoperator 的凭据作为自动模式所创建服务器的密码，默认密码为 KubeOperator@2019

## 集群规划

!!! tip ""
    参考：[自动模式](./tutorial/automatic.md)

!!! tip ""
    参考：[手动模式](./tutorial/manual.md)

!!! tip ""
    参考：[公有云平台](./tutorial/public_cloud.md)

## 集群部署

!!! tip ""
    参考：[集群部署](./user_manual/cluster_deployment.md)

## 集群导入

!!! tip ""
    参考：[集群导入](./user_manual/cluster_import.md)

## 集群运营

!!! tip ""
    参考：[集群运营](./user_manual/cluster_operation.md)
