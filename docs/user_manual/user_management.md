## 用户管理

KubeOperator 系统中的【用户管理】功能模块可以添加用户，包括系统管理员用户和普通用户。而普通用户可以根据【项目】选择其作为项目管理员。实现不同用户对不同项目的使用权限的分级管理。

### Admin 用户

用户分为系统管理员用户和普通用户，系统管理员权限和系统默认账号 admin 权限完全相同。新建的系统管理员登录系统后可实现所有 admin 权限的操作。
【用户管理】页，可创建用户，单击【添加】，添加系统管理员时，需要输入用户名、邮箱、密码和开启系统管理员按钮，提交后可在用户列表看见该系统管理员用户。

![user-1](../img/user_manual/user_management/user-1.png)

### 普通用户

【用户管理】页，创建普通用户，普通用户初始状态没有任何权限。需要【项目】内添加成为项目管理员。单击【添加】后，需要输入用户名、邮箱、密码和默认关闭【系统管理员】按钮，提交后可在用户列表看见该普通用户。

![user-1](../img/user_manual/user_management/user-2.png)

admin 管理员可以删除、禁用和开启所有用户，新建系统管理员可以删除、禁用和开启除 admin 账号以外的所有用户，普通用户无上述权限。