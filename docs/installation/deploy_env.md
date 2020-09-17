
## 硬件要求

- 最小化配置:

<table>
    <tr>
        <td>角色</td>
        <td>CPU核数</td>
        <td>内存</td>
        <td>系统盘</td>
        <td>数量</td>
    </tr>
    <tr>
        <td>部署机</td>
        <td>4</td>
        <td>8G</td>
        <td>100G</td>
        <td>1</td>
    </tr>
    <tr>
        <td>Master</td>
        <td>2</td>
        <td>4G</td>
        <td>100G</td>
        <td>1</td>
    </tr>
    <tr>
        <td>Worker</td>
        <td>2</td>
        <td>4G</td>
        <td>100G</td>
        <td>3</td>
    </tr>
</table>

- 推荐配置:

<table>
    <tr>
        <td>角色</td>
        <td>CPU核数</td>
        <td>内存</td>
        <td>系统盘</td>
        <td>数量</td>
    </tr>
    <tr>
        <td>部署机</td>
        <td>4</td>
        <td>8G</td>
        <td>100G SSD</td>
        <td>1</td>
    </tr>
    <tr>
        <td>Master</td>
        <td>4</td>
        <td>8G</td>
        <td>100G SSD</td>
        <td>3</td>
    </tr>
    <tr>
        <td>Worker</td>
        <td>4</td>
        <td>8G</td>
        <td>系统盘: 100G<br>
            数据盘: 300G（/var/lib/docker）</td>
        <td>>3</td>
    </tr>
</table>

## 软件要求

> 注: 以下要求针对 kubeoperator 部署机

<table>
    <tr>
        <td>需求项</td>
        <td>具体要求</td>
        <td>参考（以CentOS7.6为例）</td>
    </tr>
    <tr>
        <td>操作系统</td>
        <td>支持 Docker 的 Linux OS</td>
        <td>cat /etc/redhat-release</td>
    </tr>
    <tr>
        <td>kernel版本</td>
        <td>>=Linux 3.10.0-957.el7.x86_64</td>
        <td>uname -sr</td>
    </tr>
    <tr>
        <td>swap</td>
        <td>关闭</td>
        <td>swapoff -a<br>
            sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab</td>
    </tr>
    <tr>
        <td>防火墙</td>
        <td>关闭</td>
        <td>systemctl stop firewalld && systemctl disable firewalld</td>
    </tr>
    <tr>
        <td>端口</td>
        <td>所有节点防火墙必须放通 SSH（默认22）、80、8081-8083端口</td>
        <td>firewall-cmd --zone=public --add-port=80/tcp --permanent</td>
    </tr>
    <tr>
        <td>SELinux</td>
        <td>关闭</td>
        <td>setenforce 0<br>
            sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config</td>
    </tr>
</table>

> 注: 以下要求针对 kubernetes 集群节点

<table>
    <tr>
        <td>需求项</td>
        <td>具体要求</td>
        <td>参考（以CentOS7.6为例）</td>
    </tr>
    <tr>
        <td>操作系统</td>
        <td>CentOS/RHEL 7.4 - 7.7<br>
            EulerOS 2.5（x86_64）<br>
            EulerOS 2.8（arm64）</td>
        <td>cat /etc/redhat-release</td>
    </tr>
    <tr>
        <td>kernel版本</td>
        <td>>=Linux 3.10.0-957.el7.x86_64</td>
        <td>uname -sr</td>
    </tr>
    <tr>
        <td>swap</td>
        <td>关闭。如果不满足，系统会有一定几率出现 io 飙升，造成 docker 卡死。kubelet 会启动失败(可以设置 kubelet 启动参数 --fail-swap-on 为 false 关闭 swap 检查)</td>
        <td>swapoff -a<br>
            sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab</td>
    </tr>
    <tr>
        <td>防火墙</td>
        <td>关闭。Kubernetes 官方要求</td>
        <td>systemctl stop firewalld && systemctl disable firewalld</td>
    </tr>
    <tr>
        <td>SELinux</td>
        <td>关闭</td>
        <td>setenforce 0<br>
            sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config</td>
    </tr>
    <tr>
        <td>时区</td>
        <td>所有服务器时区必须统一，建议设置为 Asia/Shanghai</td>
        <td>timedatectl set-timezone Asia/Shanghai</td>
    </tr>
</table>
