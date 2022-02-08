## 项目结构

### 后端
```
.
├── Dockerfile.amd64                                # 构建容器镜像使用的 dockerfile
├── Makefile                                        # 编译文件
├── LICENSE
├── README.md
├── ROADMAP.md
├── go.mod
├── pkg                                             # 主目录
├── locales                                         # 后端 i18n 翻译目录
├── docs                                            # REST Api 文档目录
├── migration                                       # 数据库变更文件目录
```

### 前端
```
.
├── Dockerfile                                      # 构建容器镜像使用的 dockerfile             
├── LICENSE
├── README.md
├── package.json                                    # 包管理文件
├── src                                             # 主目录
```

## 配置开发环境

### 后端

!!! warning ""
    - KubeOperator 后端使用 iris 框架，并使用 Go mod 作为项目管理工具
    - 开发环境 Golang 版本 >= 1.14

#### 初始化配置

##### 数据库初始化

!!! warning ""
    KubeOperator 使用 MySQL 数据库，推荐使用 MySQL 5.7 版本。同时 KubeOperator 对数据库部分配置项有要求，请参考下附的数据库配置，修改开发环境中的数据库配置文件

    !!! warning ""

        ```mysql
        [mysqld]
        datadir=/var/lib/mysql
        
        default-storage-engine=INNODB
        character_set_server=UTF8MB4
        table_open_cache=128
        max_connections=2000
        max_connect_errors=6000
        innodb_file_per_table=1
        innodb_buffer_pool_size=1G
        max_allowed_packet=64M
        transaction_isolation=READ-COMMITTED
        innodb_flush_method=O_DIRECT
        innodb_lock_wait_timeout=1800
        innodb_flush_log_at_trx_commit=0
        sync_binlog=0
        sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
        skip-name-resolve
        user=mysql
        
        [mysql]
        default-character-set=utf8
        
        [mysql.server]
        default-character-set=utf8
        ```

    请参考文档中的建库语句创建 KubeOperator 使用的数据库，server 服务启动时会自动在配置的库中创建所需的表结构及初始化数据。

    !!! warning ""

        ```mysql
        CREATE DATABASE `ko` /*!40100 DEFAULT CHARACTER SET utf8mb4 */
        ```

##### KubeOperator 配置文件

!!! warning ""
    KubeOperator 会默认加载该路径下的配置文件 /etc/ko/app.yaml，请参考下列配置创建对应目录及配置文件

    !!! warning ""

        ```yaml
        bind:
          host: 0.0.0.0
          port: 8080
        logging:
          level: info
          out_put: fileAndStd
          max_age: 2592000
          rotation: 86400
        # 数据库配置
        db:
          # mysql 服务地址，按需修改
          host: mysql
          port: 3306
          user: root
          # 明文密码：KubeOperator123@mysql
          password: U08BAQEBAQHNm6g24wOpMgv34sNpwR5aBVdvFeSE9+6bydHO/WZLvZXlX9rxiY4V
          name: ko
          max_open_conns: 200
          max_idle_conns: 10
        jwt:
          secret: iXDgDaEYBzIzustW
          exp: 480
        job:
          timeout: 60
        # kobe 组件配置
        kobe:
          # kobe 服务地址，按需修改
          host: kobe
          port: 8080
        # kotf 组件配置
        kotf:
          # kotf 服务地址，按需修改
          host: kotf
          port: 8080
        webkubectl:
          host: webkubectl
          port: 8080
        kubepi:
          host: kubepi
          port: 80
        cron:
          enable: true
        encrypt:
          multilevel:
            enable: true
            secret: WjgBAQEBAQG1bkw4r7ZuaKD1klBxrT+zrRk8KWl+7LE0dli3h+a8gl6er0u8Ks1w
            parts:
              - dP3hT7dBQhygBCYW
              - YIi2czL9wv4tQEZD
        ```

#### 运行后端服务

!!! warning ""
    主目录运行

    ```
    go run main.go
    ```

### 前端

!!! warning ""
    - KubeOperator 前端使用了 Vue.js 作为前端框架，ElementUI 作为 UI 框架，并使用 npm 作为包管理工具
    - 开发者请先下载 Node.js 作为运行环境（推荐版本：v14.x）

#### 运行步骤

!!! warning ""
    部署运行好 KubeOperator API 服务器（前置条件）

    ```bash
    1. 安装依赖
    $ npm install
    
    2. 运行
    $ npm run serve
    ```

### 组件

!!! warning ""
     [kobe](https://github.com/KubeOperator/kobe) 和 [kotf](https://github.com/KubeOperator/kotf) 为 grpc 协议组件，使用 protobuf 生成

#### 配置文件

##### kobe

!!! warning ""
    kobe 会默认加载该路径下的配置文件 /etc/kobe/app.yaml，请参考下列配置创建对应目录及配置文件

    ```yaml
    server:
      host: 0.0.0.0
      port: 8080
    app:
      worker: 10
      queue: 2000
    
    ansible:
      timeout: 10
      forks: 20
    ```

##### kotf

!!! warning ""
    kotf 会默认加载该路径下的配置文件 /etc/kotf/app.yaml，请参考下列配置创建对应目录及配置文件
    
    ```
    server:
      host: 0.0.0.0
      port: 8080
    ```

#### 组件启动

!!! warning ""
    ```bash
    go run cmd/server/*.go 
    ```