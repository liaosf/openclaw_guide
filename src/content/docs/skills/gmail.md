---
title: Gmail 邮件助手
description: 自动分类和回复邮件
---

## 功能介绍

Gmail 助手可以帮助你：
1. 自动归档垃圾邮件
2. 提取发票信息
3. 根据优先级排序收件箱

## 配置方法

```yaml
skills:
  - name: gmail-assistant
    config:
      auth_token: ${GMAIL_TOKEN}
```
