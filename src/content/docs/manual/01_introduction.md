---
title: 第一章：Moltbot 简介与快速开始
description: 第一章：Moltbot 简介与快速开始
---

欢迎来到 **Moltbot** 的世界。本章将带你了解 Moltbot 的核心理念，并手把手教你完成安装与初始化，让你在最快的时间内拥有一个属于自己的 AI 代理。

## 1. 什么是 Moltbot?

**Moltbot** 不仅仅是一个聊天机器人，它是一个运行在你本地设备上的 **个人 AI 代理 (Personal AI Agent)**。

与传统的 ChatUI 不同，Moltbot 拥有：
-   **身体 (Gateway)**：一个长驻后台的网关，负责连接世界。
-   **耳朵 (Channels)**：不仅能听懂你的指令，还能通过 WhatsApp, Telegram, Discord 等渠道随时随地响应你。
-   **双手 (Tools/Skills)**：它可以执行命令、浏览网页、操作文件，甚至编写代码。
-   **记忆 (Workspace)**：拥有独立的工作目录，记录与你的每一次交互，并从中学习。

### 1.1 核心特性

*   **全渠道支持 (Omnichannels)**：你可以在终端 (CLI)、Web 界面、甚至手机上的通讯软件 (如 WhatsApp, Telegram) 与你的 Agent 对话。
*   **本地优先与隐私安全**：核心逻辑运行在本地 (Localhost)，支持 Docker 和沙箱环境，数据完全掌握在你手中。
*   **高度可扩展 (Skills)**：兼容 MCP (Model Context Protocol) 协议，支持加载各种自定义技能（Node.js 脚本）。
*   **多模态交互**：支持文本、语音 (通过 Whisper)、甚至视觉识别 (Vision)。

### 1.2 架构一览

Moltbot 的架构设计非常精妙，主要由以下几部分组成：

1.  **Gateway (守护进程)**：这是心脏。它维护与各大聊天软件 (Providers) 的连接，并暴露 WebSocket 接口给客户端。
2.  **Clients (客户端)**：你的操作界面。可以是 CLI 命令行，也可以是 Web 管理后台，或者是 macOS 的菜单栏应用。
3.  **Nodes (节点)**：扩展计算单元。你可以将家里的旧手机、iPad 或服务器作为 "Node" 接入，提供摄像头、传感器或算力支持。

---

## 2. 快速开始 (High-Speed Onboarding)

目标：从零开始，在 5 分钟内完成安装并进行第一次对话。

### 2.1 环境准备

在开始之前，请确保你的机器满足以下要求：

*   **Node.js**: 版本需 `>= 22`。
*   **操作系统**: macOS, Linux, 或 Windows (强烈推荐使用 **WSL2** Ubuntu 环境)。
    *   *Windows 用户注意：原生 Windows 环境兼容性较差，请务必在 WSL2 中操作。*

### 2.2 一键安装

推荐使用官方提供的一键安装脚本，它会自动检测环境并安装 CLI 工具。

**Linux / macOS / WSL2:**

```bash
curl -fsSL https://molt.bot/install.sh | bash
```

**Windows (PowerShell):**

```powershell
iwr -useb https://molt.bot/install.ps1 | iex
```

如果您偏好使用包管理器安装：

```bash
npm install -g moltbot@latest
# 或者
pnpm add -g moltbot@latest
```

### 2.3 初始化向导 (Onboarding Wizard)

Moltbot 提供了一个极其强大的初始化向导，能帮你搞定 99% 的配置工作。

在终端运行：

```bash
moltbot onboard --install-daemon
```

向导会引导你完成以下核心配置：

1.  **模式选择**：一般选择 **Local** (本地模式)。
2.  **模型与认证 (Auth)**：
    *   **推荐**：使用 **Anthropic API Key** 或 **OpenAI Key**。
    *   向导会询问你是否有 API Key，直接粘贴即可。系统会将其安全存储。
3.  **工作区 (Workspace)**：默认路径为 `~/clawd`。这是 Agent 的"家"，存放所有记忆和文件。
4.  **Gateway 配置**：默认端口 `18789`。为了安全，建议保留默认的 Token 认证。
5.  **通讯渠道 (Channels)**：
    *   **WhatsApp**: 支持扫码登录 (类似微信 PC 版)。
    *   **Telegram/Discord**: 需要填入 Bot Token。
    *   *初次安装可以先跳过，稍后通过 `moltbot configure` 追加。*
6.  **后台服务 (Daemon)**：向导会自动配置 `systemd` (Linux) 或 `launchd` (macOS)，让 Moltbot 开机自启。

### 2.4 验证安装

安装完成后，你可以通过以下命令检查 Agent 的健康状态：

```bash
# 查看服务状态
moltbot status

# 深度健康检查 (检查各组件连接)
moltbot health

# 安全审计
moltbot security audit --deep
```

### 2.5 第一次对话

一切就绪！现在你可以尝试与你的 Agent 对话了。

**方式一：CLI 命令行**

```bash
moltbot message send --message "Hello, Moltbot! 介绍一下你自己。"
```

**方式二：Web Dashboard (推荐)**

1.  运行命令打开 Dashboard：
    ```bash
    moltbot dashboard
    ```
2.  浏览器会自动打开 `http://127.0.0.1:18789/` 并带上认证 Token。
3.  在网页中直接输入文字，开始与你的 AI 伙伴畅聊。

---

**下一步**：在[第二章](/manual/02_configuration)中，我们将深入了解如何配置 Moltbot 的大脑，以及如何通过配置文件微调它的行为。
