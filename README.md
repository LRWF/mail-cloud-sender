## Mail-Cloud-Sender

在worker里使用smtp发送邮件

使用方法：

**POST** https:\/\/\<your domain\>\/

Payload: JSON

```json
{
  "host": "smtp.larksuite.com",
  "port": 587,
  "username": "<your full email address>",
  "password": "xxxxxxxxxxxxxxxx",
  "name": "<your name （可选，不填默认使用邮箱地址）>",
  "to": "<一个或者多个邮箱地址>",
  "subject": "测试邮件",
  "content": "这是一个测试邮件，可以是 HTML"
}
```
