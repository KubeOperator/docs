## 准备主机

我们将准备添加四台主机 一个 master、三个 worker，分别作为 master 节点、worker 节点。

### 添加主机

在左侧导航菜单中选择【主机】，进入【主机】页后可以看到已添加主机的详细信息，包括 IP、CPU、内存、操作系统等。
点击【添加】按钮添加主机。输入名称和 IP 地址、指定端口号、选择对应的凭据，最后点击【提交】按钮即可完成一台主机的添加。

> 注: 推荐使用全新的机器 <br/>
KubeOperator部署机不能作为kubernetes集群节点使用。

![host-1](../img/user_manual/hosts/hosts-1.png)