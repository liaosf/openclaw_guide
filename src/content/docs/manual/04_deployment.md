---
title: 第四章：高级部署与架构 (Deployment & Architecture)
description: 第四章：高级部署与架构 (Deployment & Architecture)
---

在前面的章节中，我们都是在本地笔记本上运行 Moltbot。但如果你希望它 24 小时待命，响应 Webhook 或执行定时任务，你需要将它部署在服务器上。

本章将介绍如何搭建一套“云端大脑 + 本地手脚”的高级架构。

## 1. 部署架构概览

### 1.1 为什么要部署到服务器？
*   **永远在线**：不会因为笔记本合盖休眠而停止 Cron 任务或错过消息。
*   **性能稳定**：VPS 或家庭服务器通常有更稳定的网络环境。
*   **统一大脑**：无论你在用手机、iPad 还是电脑，都连接同一个“大脑”。

### 1.2 推荐架构
*   **Server (Linux/VPS)**: 运行 **Gateway** 和 **Agent**。负责思考、记忆、调度。
*   **Client (Mac/PC)**: 运行 **Node**。负责提供浏览器环境、通过 USB 控制手机等。
*   **Network**: 使用 **Tailscale** 组网，无需暴露公网端口。

## 2. Linux 服务器部署指南

假设你拥有一台 Ubuntu/Debian 服务器。

### 2.1 环境准备
Moltbot 需要 Node.js环境。

```bash
# 1. 安装 Node.js (推荐 v20+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装 pnpm
npm install -g pnpm

# 3. 启用服务驻留 (防止退出 SSH 后进程被杀)
sudo loginctl enable-linger $USER
```

### 2.2 安装与启动
推荐使用源码部署或全局安装：

```bash
# 全局安装
pnpm install -g moltbot

# 初始化配置
moltbot setup

# 启动 Gateway (使用 PM2 守护进程)
npm install -g pm2
pm2 start moltbot -- gateway
pm2 save
```

## 3. 远程访问 (Tailscale)

为了安全地访问远端 Gateway 的控制台，我们强烈推荐使用 **Tailscale**。它能创建一个加密的虚拟局域网。

### 3.1配置 Tailscale Serve

在服务器上安装并登录 Tailscale 后，让 Moltbot 自动配置 Serve：

```bash
# 让 Gateway 在 Tailnet 内暴露仪表盘
moltbot gateway --tailscale serve
```

或者修改 `moltbot.json`:

```json5
gateway: {
  bind: "loopback", // 依然只监听本地，安全！
  tailscale: {
    mode: "serve"
  }
}
```

现在，你可以在 Tailnet 内的任意机器通过 MagicDNS 访问控制台：`https://myserver.tailnet.ts.net`。

## 4. 连接远程节点 (Remote Nodes)

如果你的大脑在服务器上，但想控制本地电脑的 Chrome 浏览器怎么办？

### 4.1 本地作为 Node 接入
在你的笔记本 (Mac/PC) 上：

1.  **加入同一个 Tailnet**。
2.  **启动 Node 模式**并指向服务器：

```bash
moltbot node run \
  --gateway ws://myserver.tailnet.ts.net:18789 \
  --token "your-gateway-token"
```

只要连接成功，服务器上的 Agent 就可以调用你本地的工具（如 Browser Skill），就像它们在同一台机器上一样。

---

**下一步**：在最后的[第五章](/manual/05_reference)中，我们将列出常用的 CLI 命令速查表和常见问题解答。
