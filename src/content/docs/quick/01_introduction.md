---
title: 第一章：OpenClaw 快速开始
description: 第一章：OpenClaw 快速开始
---

欢迎来到 **OpenClaw** 的世界。本章将带你了解 OpenClaw 的核心理念，并手把手教你完成安装与初始化，让你在最快的时间内拥有一个属于自己的 AI 代理。

## 1. OpenClaw 有什么优势?

**OpenClaw** 不仅仅是一个聊天机器人，它是一个运行在你本地设备上的 **个人 AI 代理 (Personal AI Agent)**。

与传统的 ChatUI 不同，OpenClaw 拥有：
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

OpenClaw 的架构设计非常精妙，主要由以下几部分组成：

1.  **Gateway (守护进程)**：这是心脏。它维护与各大聊天软件 (Providers) 的连接，并暴露 WebSocket 接口给客户端。
2.  **Clients (客户端)**：你的操作界面。可以是 CLI 命令行，也可以是 Web 管理后台，或者是 macOS 的菜单栏应用。
3.  **Nodes (节点)**：扩展计算单元。你可以将家里的旧手机、iPad 或服务器作为 "Node" 接入，提供摄像头、传感器或算力支持。

---

## 2. OpenClaw 运行环境生态

OpenClaw 运行环境生态主要包括以下几个部分：

1.  **操作系统**：macOS, Linux, 或 Windows (强烈推荐使用 Ubuntu 环境)。
2.  **Node.js**：版本需 `>= 22`。
3.  **通讯软件**：WeChat, WhatsApp, Telegram, Discord 等，用于与 Agent 进行交互。
4.  **AI 模型**：推荐使用 **Anthropic API** 或 **OpenAI API**。
5.  **skill 插件**：根据你的需求，需要安装一些额外的 skill 插件。
6.  **浏览器**：推荐使用 Chrome 或 Firefox，用于访问 Web 管理后台。

可选依赖：
- **语音识别**：可选，推荐使用 **Whisper**。
- **视觉识别**：可选，推荐使用 **OpenAI Vision**。
- **语音合成**：可选，推荐使用 **OpenAI TTS**。
- **其他依赖**：根据你的需求，可能还需要安装其他工具，如 `ffmpeg` 等。

安装前，根据自己的需要先准备好相关的依赖项，如微信账号、OpenAI API Key等。

---

## 3. 快速开始 (High-Speed Onboarding)

目标：从零开始，在 5 分钟内完成安装并进行第一次对话。

### 3.1 环境准备

在开始之前，请确保你的机器满足以下要求：

*   **Node.js**: 版本需 `>= 22`。
*   **操作系统**: macOS, Linux, 或 Windows (强烈推荐使用 **WSL2** Ubuntu 环境)。
    *   *Windows 用户注意：原生 Windows 环境兼容性较差，请务必在 WSL2 中操作。*

### 3.2 一键安装

推荐使用官方提供的一键安装脚本，它会自动检测环境并安装 CLI 工具。

**Linux / macOS / WSL2:**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method git
```

**Windows (PowerShell):**

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

如果您偏好使用包管理器安装：

```bash
npm install -g openclaw
# 或者
pnpm add -g openclaw
```

### 3.3 初始化向导 (Onboarding Wizard)

OpenClaw 提供了一个极其强大的初始化向导，能帮你搞定 99% 的配置工作。

在终端运行：

```bash
openclaw onboard --install-daemon
```

向导会引导你完成以下核心配置：

1.  **模式选择**：一般选择 **Local** (本地模式)。
2.  **模型与认证 (Auth)**：
    *   **推荐**：使用 **Anthropic API Key** 或 **OpenAI Key**。
    *   向导会提示填入 Key，并保存到配置中。
3.  **工作区 (Workspace)**：
    *   默认路径为 `~/.openclaw/workspace`。这是 Agent 的"家"，存放所有记忆和文件。
    *   旧版/兼容路径如 ~/clawd 可能存在，但不是当前官方推荐。
4.  **Gateway 配置**：
    *   默认端口 `18789`。默认绑定地址是：127.0.0.1。
    *   建议保留默认 Token 认证以提高安全。
5.  **通讯渠道 (Channels)**：
    *   向导可以在安装时配置 WhatsApp/Telegram/Discord 等。
    *   初次也可以跳过，之后通过 CLI 追加。
6.  **后台服务 (Daemon)**：
    *   向导支持创建 `systemd` (Linux) 或 `launchd` (macOS)服务，让 Gateway 在后台运行。

### 3.4 验证安装

OpenClaw 是“分布式思维的单机系统”，安装完成后，需要从**服务、Gateway、Workspace、模型连接**四个层面分别验证：

#### 3.4.1 **查看服务状态**

Linux（systemd）
```bash
systemctl status openclaw
```

macOS（launchd）
```bash
launchctl list | grep openclaw
```

看到：`Active: active (running)` 或是 openclaw 相关条目。

#### 3.4.2 **验证 Gateway 是否监听**

```bash
ss -lntp | grep 18789
```

看到：`LISTEN 0.0.0.0:18789` 或 `:::18789` 表示 Gateway 正在监听端口 18789。

#### 3.4.3 **验证 Workspace 是否初始化成功**

```bash
ls ~/.openclaw/workspace
```

看到：`config.json` 等文件表示 Workspace 初始化成功。

#### 3.4.4 **验证模型 Provider 是否可用**

```bash
cat ~/.openclaw/config.json
```

确认至少存在：
 * provider（anthropic / openai）
 * apiKey / auth 配置

看启动日志文件里是否有模型报错：
```bash
journalctl -u openclaw -n 100
```
或 macOS：
```bash
log show --last 10m --predicate 'process contains "openclaw"'
```

确认没有错误信息。

#### 3.4.5 **验证 Token / Auth**

如果启用了 Gateway Token，执行以下命令测试：
```bash
curl http://127.0.0.1:18789
```

返回：
- 401 Unauthorized
- 或 missing token

这是**正确结果**，说明 Gateway 已启用认证，需要在请求头中添加 Token 才能访问。这样可以有效防止未授权访问。

#### 3.4.6 **验证 Agent 能否真正执行一次动作**

这是唯一能证明 OpenClaw 真正“活着”的方式。

```
openclaw run "hello"
```

确认返回：
- 200 OK
- 包含模型回复的 JSON 数据
说明 Agent 已成功加载模型，能够正常响应。

## 4. 第一次对话

一切就绪！现在你可以尝试与你的 Agent 对话了。

**方式一：CLI 命令行**

```bash
openclaw message send --message "Hello, OpenClaw! 介绍一下你自己。"
```

**方式二：Web Dashboard (推荐)**

1.  运行命令打开 Dashboard：
    ```bash
    openclaw dashboard
    ```
2.  浏览器会自动打开 `http://127.0.0.1:18789/` 并带上认证 Token。
3.  在网页中直接输入文字，开始与你的 AI 伙伴畅聊。

---

**下一步**：我们将深入了解如何配置 OpenClaw 的大脑，以及如何通过配置文件微调它的行为。
