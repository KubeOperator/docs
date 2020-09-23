
### 基本信息

!!! warning ""
    输入要导入集群的名称、Api Server、Router、Token

![deploy-1](../img/user_manual/cluster/cluster-import.png)

!!! info "示例"
    * Api Server: https://172.16.10.100:8443
    * Router: 装有 kube-proxy 的任意节点的且可以被访问到的 IP 地址
    * Token: 要具有 cluster-admin 权限

    ```vi
    # 获取 cluster-admin 权限的 token
    kubectl -n kube-system describe secrets kubeoperator-admin-token-m7srm
    Name:         kubeoperator-admin-token-m7srm
    Namespace:    kube-system
    Labels:       <none>
    Annotations:  kubernetes.io/service-account.name: kubeoperator-admin
                  kubernetes.io/service-account.uid: d3f3622-a5cb-4ad1-ab2e-53887c59007

    Type:  kubernetes.io/service-account-token

    Data
    ====
    ca.crt:     1038 bytes
    namespace:  11 bytes
    token:      eyJhbGciOiJSUzI1NiIsImtcZCI6Ik9GN2U0SXhybVFVRV9JaFJYSTBzdXQ2Mi1WZmRHcXpIOXNDb2Rqemt0MjAifQ.eyJpc3MiOiJrdWJlcm5ldGVzL1NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pxy9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrby1hZG1pbi10b2tlbi1tN3NybSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJrby1hZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImQzZjM2MzIyLWE1Y2ItNGFkMS1hYjJlLTUzODg3Y2E1OTAwNyIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTprby1hZG1pbiJ9.HvpDTAgn0nHu0ZnyPgxOFwWKiwtyYEqWaBWTrSV7EjRcToVIrN2eR8t9kw_RiDEI93S_Nnfjw-Xj1RTRsQEkRASx5uuXMAbELWnFo-rGLR8qs0ct-1t2jGkhgBQ2WtiCqczSG-o91N7PqqYa6RMebUTjy2M7bnybKGxSq0G-StH_JrgOGLHROtvV7U9JWiv32akGXqliK09YfVY6Ykv9kg4z6MeHWvpfCBTmR0qKn9wY2qC2DHynw2Nd_5LxtHeCJGYcvflaR_kcOP4bhzqxMbtGSf0xd5GXYa1iNKGm3Hu8-FtPiDc9BuViQIzR6PvsjzaIBWVRYOxD5zf0jUz_zw
    ```

### 使用工具

!!! info "示例"
    * 工具中所涉及到的镜像默认使用 KubeOperator 镜像仓库，在启用工具前，需要在 Kubernetes 节点配置私有仓库的可信任设置可以通过HTTP直接访问
    ```
    vim /etc/docker/daemon.json
    {
        "insecure-registries" : [ "...", "kubeoperator-ip:8082", "..." ]
    }
    # kubeoperator-ip 为 KubeOperator 部署机 IP

    # 为了使得配置生效，需要重新启动 docker 服务
    systemctl restart docker.service
    ```

!!! warning ""
    * KubeOperator 不能针对导入的集群进行扩缩容、备份等集群运营操作
