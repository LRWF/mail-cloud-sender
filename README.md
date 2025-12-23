## Mail-Cloud-Sender

在worker里使用smtp发送邮件

使用方法：

部署完成后，在 Worker 环境变量添加：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| 密钥 | API_TOKEN | xxxxxxxxxx |

发起请求：

**POST** https:\/\/\<your domain\>\/

Headers:

| Key | Value |
| --- | --- |
| Authorization | xxxxxxxxxxxxx |

Payload: JSON

```json
{
  "host": "<例如 smtp.larksuite.com>",
  "port": <例如 587>,
  "username": "<例如 hi@example.com>",
  "password": "<xxxxxxxxxxxxxxxx>",
  "name": "<Example（可选，去掉本行默认使用邮箱地址）>",
  "to": "<一个或者多个邮箱地址>",
  "subject": "测试邮件",
  "content": "这是一个测试邮件，可以是 HTML"
}
```
