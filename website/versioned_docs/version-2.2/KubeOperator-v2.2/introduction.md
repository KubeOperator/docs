---
id: version-2.2-introduction
title: 一、关于 KubeOperator
original_id: introduction
---

## 1 什么是 KubeOperator？

KubeOperator 是一个开源项目，在离线网络环境下，通过可视化 Web UI 在 VMware、Openstack 或者物理机上规划、部署和运营生产级别的 Kubernetes 集群。KubeOperator 是 [Jumpserver](https://github.com/jumpserver/jumpserver) 明星开源团队在 Kubernetes 领域的的又一全新力作。

![overview](../../../img/overview.png)

> 注： KubeOperator 已通过云原生基金会（CNCF）的 [Kubernetes 软件一致性认证](https://landscape.cncf.io/selected=kube-operator)。

## 2 KubeOperator 的整体架构

KubeOperator 使用 Terraform 在 IaaS 平台上自动创建主机（用户也可以自行准备主机，比如物理机或者虚机），通过 Ansible 完成自动化部署和变更操作，支持 Kubernetes 集群 从 Day 0 规划，到 Day 1 部署，到 Day 2 运营的全生命周期管理。

![architecture](../../../img/KubeOperator.jpeg)

## 3 KubeOperator 的技术优势

-  按需创建：调用云平台 API，一键快速创建和部署 Kubernetes 集群 (即 Kubernetes as a Service)；
-  按需伸缩：快速伸缩 Kubernetes 集群，优化资源使用效率；
-  按需修补：快速升级和修补 Kubernetes 集群，并与社区最新版本同步，保证安全性；
-  自我修复：通过重建故障节点确保集群可用性；
-  离线部署：持续更新包括 Kubernetes 及常用组件的离线包；
-  Multi-AZ 支持：通过把 Kuernetes 集群 Master 节点分布在不同的故障域上确保高可用；

## 4 KubeOperator 的功能列表

<table class="subscription-level-table">
    <tr class="subscription-level-tr-border">
        <td class="features-first-td-background-style" rowspan="13">集群 Day 0 规划</td>
        </td>
        <td class="features-third-td-background-style" rowspan="2">集群模式
        </td>
        <td class="features-third-td-background-style">1 个 Master 节点 n 个 Worker 节点模式：适合开发测试用途
        </td>       
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">3 个 Master 节点 n 个 Worker 节点模式：适合生产用途
        </td>
    </tr>    
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style" rowspan="3">计算方案
        </td>
        <td class="features-third-td-background-style">独立主机：支持自行准备的虚机和物理机
        </td>  
    </tr>    
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">vSphere 平台：支持自动创建主机（使用 Terraform）
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">Openstack 平台：支持自动创建主机 （使用 Terraform）
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style" rowspan="3">存储方案
        </td>
        <td class="features-third-td-background-style">独立主机：支持 NFS / Ceph RBD (通过 Rook) 
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">vSphere 平台：支持 vSphere Datastore （vSAN 及 vSphere 兼容的集中存储）
        </td>
    </tr> 
     <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">Openstack 平台：支持 Openstack Cinder （Ceph 及 Cinder 兼容的集中存储）
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style" rowspan="4">网络方案
        </td>
        <td class="features-third-td-background-style">支持 Flannel / Calico 网络插件
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">支持通过 F5 Big IP 对外暴露服务
        </td>
    </tr> 
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">支持 Traefik
        </td>
    </tr>    
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">支持 CoreDNS
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">操作系统
        </td>
        <td class="features-third-td-background-style">支持 CentOS 7.4 / 7.5 / 7.6 / 7.7
        </td>
    </tr>    
    <tr class="subscription-level-tr-border">
        <td class="features-first-td-background-style" rowspan="3">集群 Day 1 部署
        </td>
        <td class="features-third-td-background-style" rowspan="3">部署
        </td>  
        <td class="features-third-td-background-style">提供离线环境下的完整安装包
        </td>         
    </tr>
     <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">支持可视化方式展示部署过程
        </td>
    </tr>
     <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">支持一键自动化部署（使用 Ansible）
        </td>
    </tr> 
    <tr class="subscription-level-tr-border">
        <td class="features-first-td-background-style" rowspan="13">集群 Day 2 运营
        </td>
        <td class="features-third-td-background-style" rowspan="4">管理
        </td>  
        <td class="features-third-td-background-style">内置 K8s 官方的 Dashboard 管理应用
        </td>         
    </tr>
     <tr class="subscription-level-tr-border">
         <td class="features-third-td-background-style">内置 Weave Scope 管理应用
        </td>
    </tr>  
    <tr class="subscription-level-tr-border">
         <td class="features-third-td-background-style">提供 Web Kubectl 界面
        </td>
    </tr> 
    <tr class="subscription-level-tr-border">
         <td class="features-third-td-background-style">内置 Helm 
        </td>
    </tr>   
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style" rowspan="4">可观察性
        </td>
         <td class="features-third-td-background-style">内置 Promethus，支持对集群、节点、Pod、Container的全方位监控和告警
        </td>
    </tr>
     <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">内置 Loki 日志方案
        </td>
    </tr> 
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">内置 Grafana 作为监控和日志展示
        </td>
    </tr> 
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style"> 在 Web UI 上面查看集群事件，并可以通过钉钉、微信进行通知；
        </td>
    </tr>      
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">升级
        </td>
         <td class="features-third-td-background-style">支持集群升级
        </td>
    </tr> 
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">伸缩
        </td>
         <td class="features-third-td-background-style">支持增加或者减少 Worker 节点
        </td>
    </tr>
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">备份
        </td>
         <td class="features-third-td-background-style">支持 etcd 定期备份
        </td>
    </tr>  
    <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">合规
        </td>
         <td class="features-third-td-background-style">使用 Sonobuoy 进行合规检查并可视化展示结果
        </td>
    </tr>      
     <tr class="subscription-level-tr-border">
        <td class="features-third-td-background-style">应用商店
        </td>
         <td class="features-third-td-background-style">集成 KubeApps 应用商店
        </td>
    </tr>     
 </table>

具体版本路线图请参考：[Roadmap](https://github.com/KubeOperator/KubeOperator/blob/master/ROADMAP.md)