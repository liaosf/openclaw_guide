---
title: 第七章：一键部署篇 (One Key Deploy)
description: 本章节介绍如何一键部署 OpenClaw，让你快速开始使用 AI 助手。
---

本章节介绍如何**一键部署 OpenClaw**，让你快速开始使用 AI 助手。

## 部署时间：5 分钟

## 快速部署（推荐）

### 方法一：使用官方脚本（最简单）

```bash
# 运行一键部署脚本

curl -fsSL https://molt.bot/install.sh | bash
```

**自动完成**：
- ✅ 检测服务器环境
- ✅ 安装 Node.js
- ✅ 安装 OpenClaw
- ✅ 配置默认设置
- ✅ 启动 Gateway

### 方法二：手动一键部署

```bash
# 1. 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 22

# 2. 安装 OpenClaw
npm install -g openclaw

# 3. 启动 Gateway
openclaw gateway run
```

---

## 部署步骤

### 步骤 1：准备服务器

**最低配置**：
- CPU: 2 核
- 内存: 4GB
- 磁盘: 40GB
- 系统: Ubuntu 20.04+

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 检查网络
ping -c 3 8.8.8.8
```

### 步骤 2：安装 Node.js

**快速安装**：

```bash
# 安装 Node.js 22
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 22

# 验证
node -v  # v22.x.x
```

### 步骤 3：安装 OpenClaw

```bash
# 全局安装
npm install -g openclaw
```

### 步骤 4：启动 OpenClaw

```bash
# 前台运行（测试）
openclaw gateway run

# 后台运行（生产）
nohup openclaw gateway run > /tmp/openclaw.log 2>&1 &
```

### 步骤 5：验证部署

```bash
# 检查状态
openclaw status

# 测试 TUI
openclaw tui

# 在 TUI 中输入 "Hello"，应该收到回复
```

---

## 添加消息渠道

### 飞书（推荐）

```bash
# 安装飞书插件
openclaw plugins install @m1heng-clawd/feishu

# 配置飞书（编辑 ~/.openclaw/openclaw.json）
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "你的飞书App ID",
      "appSecret": "你的飞书App Secret"
    }
  }
}

# 重启
openclaw gateway restart
```

### 钉钉

```bash
# 安装钉钉插件
openclaw plugins install https://github.com/soimy/openclaw-channel-dingtalk.git

# 配置钉钉（编辑 ~/.openclaw/openclaw.json）
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "clientId": "你的钉钉App Key",
      "clientSecret": "你的钉钉App Secret",
      "corpId": "你的企业ID",
      "agentId": "你的应用ID"
    }
  }
}

# 重启
openclaw gateway restart
```

---

## 使用 systemd 管理

### 安装服务

```bash
# 安装 systemd 服务
openclaw daemon install

# 启动服务
openclaw daemon start

# 查看状态
openclaw daemon status

# 查看日志
openclaw logs --follow
```

---

## 更新 OpenClaw

```bash
# 更新到最新版本
openclaw update

# 或使用 npm
npm update -g openclaw
```

---

## 常见问题

### 1. 端口被占用

```bash
# 查看端口占用
sudo lsof -i :18789

# 杀掉进程
sudo kill -9 <PID>

# 或使用其他端口
openclaw gateway run --port 18790
```

### 2. 权限错误

```bash
# 使用 sudo
sudo npm install -g openclaw

# 或配置 npm 全局目录权限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## 下一步

- 📚 学习使用 OpenClaw
- 🔧 配置更多渠道
- 🚀 部署到生产环境

---

## 参考资源

- [OpenClaw 官方文档](https://docs.openclaw.ai)
- [快速部署脚本](https://github.com/molt-bot/deploy)
