---
title: 搭建 OpenClaw - 多渠道配置
description: 本文档详细介绍如何搭建并配置一个功能完整的 OpenClaw 实例，包括多个消息渠道和七牛云大模型接入。
---

本文档详细介绍如何搭建并配置一个功能完整的 OpenClaw 实例，包括多个消息渠道和七牛云大模型接入。

## 目录

- [环境准备](./01_environment.md)
- [安装 OpenClaw](./02_install.md)
- [配置大模型（七牛云）](./03_qiniu.md)
- [配置飞书 Channel](./04_feishu.md)
- [配置钉钉 Channel](./05_dingtalk.md)
- [配置其他 Channel](./06_others.md)
- [测试验证](./07_test.md)
- [故障排查](./08_troubleshooting.md)

---

## 快速开始

1. **准备服务器** - 推荐配置见 [服务器选择篇](../5-服务器选择篇/README.md)
2. **安装 OpenClaw** - 参考本目录的安装指南
3. **配置渠道** - 按照本文档配置各种消息渠道
4. **测试运行** - 验证所有渠道是否正常工作

---

## 已完成配置

### ✅ 飞书配置

- **应用信息**: cli_a90b36dff778dcc8
- **应用名称**: OpenClaw 助手
- **权限配置**: 完整权限已配置
- **功能**: 私聊、群聊、文件上传

### ✅ 钉钉配置

- **应用信息**: dingb5kjq6ikv2nh0nnx
- **应用名称**: OpenClaw Bot
- **消息模式**: Stream 模式
- **功能**: 私聊、群聊、互动卡片

### ✅ 大模型配置

- **提供商**: 七牛云 (Qiniu)
- **模型**: zai/glm-4.7-flash
- **状态**: 已配置并测试通过

---

## 参考文档

- [七牛云 AI API 文档](https://ai.qiniu.com/)
- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [飞书开放平台](https://open.feishu.cn)
- [钉钉开放平台](https://open-dev.dingtalk.com)

---

## 下一步

- 📖 阅读 [服务器选择篇](../5-服务器选择篇/README.md) - 了解如何选择合适的服务器配置
- 🚀 查看 [一键部署篇](../7-一键部署篇/README.md) - 快速部署生产环境
- 📚 阅读 [从入门到精通手册](../README.md) - 全面了解 OpenClaw
