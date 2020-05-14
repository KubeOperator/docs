#!/bin/bash
# 执行脚步将会删除仓库所有应用
helm_repo=`helm repo list|awk '{print $2}'|grep -v URL`
helm_app=`curl  -X GET  http://chartmuseum.kubeapps.fit2cloud.com/api/charts|jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]"|awk -F= '{print $1}'`
for i in $helm_app
do
 a=`helm search $i|grep -v NAME|awk '{print $2}'|head -1`
 echo "开始删除>>>>>>>> $i/$a"
 curl -v -X DELETE  "http://chartmuseum.kubeapps.fit2cloud.com/api/charts/jenkins/$i/$a"
done
