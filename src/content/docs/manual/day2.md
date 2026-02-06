---
title: Day 2 - 基础配置
description: 学习如何配置 OpenClaw 的核心参数
---

## 配置文件详解

在完成 Day 1 的环境搭建后，今天我们将深入了解 OpenClaw 的配置文件。

### 核心配置项

```yaml
# config.yaml 示例
server:
  port: 8080
  host: "0.0.0.0"
```

### 任务

1. 找到项目根目录下的 `config.yaml`
2. 修改默认端口
3. 重启服务验证
