---
id: version-2.3-nvidia-gpu
title: 九、GPU 与机器学习
original_id: nvidia-gpu
---

除了传统的无状态 Web 应用外，越来越多的数据库 Workload、实时计算 Workload、AI 机器学习 Workload 会跑在 K8s 之上。其中，尤其是 AI 机器学习，天然适合运行在 K8s 之上。对于一些用户，其构建 K8s 集群就是专门用来运行机器学习、通用 GPU、高性能计算，以及受益于专用硬件加速器的其他工作负载。

## 1 使用 Kubeoperator 部署带有 GPU 的 Kubernetes 集群

### 1.1 先决条件

- 至少一台 Worker 节点拥有 NVIDIA GPU 显卡设备
- Kubernetes 1.6.X: Package >= 1.16.4 
- Kubernetes 1.5.X: Package >= 1.15.7

### 1.2 集群规划

name | CPU (核心) |  内存 （GB） | 操作系统 | GPU (个) | 角色
-|-|-|-|-|-
master  | 4 | 8  | CentOS 7.6 | 0 | Master
worker1 | 4 | 20 | CentOS 7.6 | 1 | Worker
worker2 | 4 | 8  | CentOS 7.6 | 0 | Worker
nfs     | 1 | 2  | CentOS 7.6 | 0 | NFS

### 1.3 添加 GPU 主机

![gpu-host-list](../../../img-nivdia/gpu-host-list.jpg)

![gpu-host-detail](../../../img-nivdia/gpu-host-detail.png)

### 1.4 创建集群

部署步骤请参考在自行准备的主机上部署 k8s 集群。

### 1.5 验证 GPU 调度

使用 Webkubectl 进入集群 Terminal, 新建文件 gpu.yml 并输入以下内容:
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nvidia-deployment
spec:
  replicas: 2                # 创建POD副本数
  selector:
    matchLabels:
      name: nvidia-gpu-deploy
  template:
    metadata:
      labels:
        name: nvidia-gpu-deploy

    spec:
      containers:
      - name: cuda-container
        image: ubuntu
        command: ["sleep"]
        args: ["100000"]
        resources:
          limits:
            nvidia.com/gpu: 1       # 使用 GPU 卡的数量
```

```
kubectl apply -f gpu.yml

kubectl get pod

NAME                                READY   STATUS    RESTARTS   AGE
nvidia-deployment-64589d94d-8m6rd   1/1     Running   0          119s  # 获取到显卡 Running
nvidia-deployment-64589d94d-lzfph   0/1     Pending   0          86s   # 未获取到显卡 Pending

kubectl exec -it nvidia-deployment-64589d94d-8m6rd nvidia-smi

Mon Jan 13 08:16:36 2020
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 440.33.01    Driver Version: 440.33.01    CUDA Version: N/A      |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla P4            Off  | 00000000:00:06.0 Off |                    0 |
| N/A   33C    P8     7W /  75W |      0MiB /  7611MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
# POD 中已经可以访问到 GPU 设备

```

## 2.Tensorflow on Kubernetes 

### 2.1 关于 Tensorflow

[TensorFlow](https://www.tensorflow.org/) 是一个端到端开源机器学习平台。它拥有一个包含各种工具、库和社区资源的全面灵活生态系统，可以让研究人员推动机器学习领域的先进技术的发展，并让开发者轻松地构建和部署由机器学习提供支持的应用。

### 2.2 在 Kuberneters 中安装 Tensorflow

使用 Webkubectl 进入集群 Terminal, 新建文件 tensorflow.yml 并输入以下内容:
```

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: tensorflow-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tensorflow
spec:
  selector:
    matchLabels:
      k8s-app: tensorflow
  replicas: 1
  template:
    metadata:
      labels:
        k8s-app: tensorflow
    spec:
      containers:
      - name: tensorflow
        image: registry.cn-hangzhou.aliyuncs.com/tensorflow-samples/jupyter:1.1.0-devel-gpu
        imagePullPolicy: IfNotPresent
        env:
          - name: PASSWORD
            value: mypassw0rd
        resources:
          limits:
            nvidia.com/gpu: 1
        volumeMounts:
        - mountPath: /usr/local/nvidia
          name: nvidia
      volumes:
        - name: nvidia
          persistentVolumeClaim:
            claimName: tensorflow-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: tensorflow-svc
spec:
  type: NodePort
  ports:
    - name: tensorflow-port
      port: 80
      targetPort: 8888
  selector:
     k8s-app: tensorflow
```

```
kubectl apply -f tensorflow.yml

persistentvolumeclaim/tensorflow-pvc configured
deployment.apps/tensorflow configured
service/tensorflow-svc configured

kubectl get pod

NAME                                   READY   STATUS    RESTARTS   AGE
tensorflow-79c5f4c48c-94l82            1/1     Running   0          101s

kubectl get svc

NAME             TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
tensorflow-svc   NodePort   179.10.100.67   <none>        80:32604/TCP   2m15s

```
访问 http://NODE_IP:32604 访问 Jupyter

![jupter-login](../../../img-nivdia/tensorflow-login.png)



### 2.3 开始一个 Tensorflow 机器学习示例

#### 2.3.1 打开一个终端

![jupter-select-terminal](../../../img-nivdia/tensorflow-select-terminal.png)

![jupter-terminal](../../../img-nivdia/tensorflow-terminal.png)

#### 2.3.2 使用 PIP 下载 KERAS

```
pip install keras==2.0.6
```

#### 2.3.3 代码实现

```
import keras
from tensorflow.python.client import device_lib

# 获取 GPU 信息
num_gpus = sum([1 for d in local_device_protos if d.device_type == 'GPU'])
print("GPU : {}".format(num_gpus))

# 下载 MNIST 数据集
mnist = keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0


# 将模型的各层堆叠起来，以搭建 keras.Sequential 模型。为训练选择优化器和损失函数：
model = keras.models.Sequential([
  keras.layers.Flatten(input_shape=(28, 28)),
  keras.layers.Dense(128, activation='relu'),
  keras.layers.Dropout(0.2),
  keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# 训练并验证模型
model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test,  y_test, verbose=2)

```

#### 2.3.4 运行学习服务

```bash
python mnist.py

Epoch 1/5
60000/60000 [==============================] - 9s - loss: 0.2984 - acc: 0.9137     
Epoch 2/5
60000/60000 [==============================] - 7s - loss: 0.1422 - acc: 0.9575     
Epoch 3/5
60000/60000 [==============================] - 7s - loss: 0.1102 - acc: 0.9671     
Epoch 4/5
60000/60000 [==============================] - 7s - loss: 0.0885 - acc: 0.9728     
Epoch 5/5
60000/60000 [==============================] - 7s - loss: 0.0758 - acc: 0.9761 

[0.074264542010473084, 0.97750000000000004] #这个照片分类器的准确度已经达到 98%

```
