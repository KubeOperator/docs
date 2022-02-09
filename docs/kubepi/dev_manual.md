[KubePi](https://github.com/KubeOperator/KubePi) 是一个独立项目，不依赖 [KubeOperator](https://github.com/KubeOperator/KubeOperator) 可独立开发运行

## 项目结构

```
.
├── Dockerfile                                      # 构建容器镜像使用的 dockerfile
├── Makefile                                        # 编译文件
├── LICENSE
├── README.md
├── go.mod
├── conf                                            # 配置文件
├── pkg                                             # 主目录
├── interanl                                        # 私有业务代码
├── migrate                                         # 数据库变更文件目录
├── web
│   ├── dashboard                                   # 前端 dashboard 模块
│   ├── kubepi                                      # 前端管理模块
│   └── terminal                                    # terminal 模块   
```

## 配置文件

!!! warning ""
    [KubePi](https://github.com/KubeOperator/KubePi) 会默认加载该路径下的配置文件 /etc/kubepi/app.yaml，请参考下列配置创建对应目录及配置文件

    ```yaml
    apiVersion: v1
    kind: AppConfig
    spec:
      server:
        bind:
          host: 0.0.0.0
          port: 80
        ssl:
          enable: false
          certificate:
          certificateKey:
      db:
        path: /var/lib/kubepi/db/kubepi.db
    ```

## 数据库文件

!!! warning ""
    [KubePi](https://github.com/KubeOperator/KubePi) 使用 [BoltDB](https://github.com/etcd-io/bbolt) 作为底层数据存储，使用 [storm](https://github.com/asdine/storm) 作为上层 ORM 框架

    ```
    数据库文件地址 /var/lib/kubepi/db/kubepi.db
    ```

## 构建二进制文件

!!! warning "build"
    ```
    make build_web
    ```

## 启动后端服务

!!! warning ""
    ```
    在 cmd/server 目录运行    
    go run main.go
    ```

## 启动前端服务

!!! warning ""
    [KubePi](https://github.com/KubeOperator/KubePi) 的前端主要包括两部分，需要分别启动

!!! warning "管理模块"
    ```  
    在 web/kubepi 目录运行 
    npm install
    npm run serve
    ```

!!! warning "dashboard 模块"
    ```
    在 web/dashboard 目录运行
    npm install    
    npm run serve
    ```