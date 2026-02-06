---
title: 第二章：核心配置与个性化
description: 第二章：核心配置与个性化
---

安装完成后，你可能希望让 Moltbot 更符合你的使用习惯，比如给它起个名字、换个头像，或者限制只有你自己能跟它说话。本章将深入解析 Moltbot 的配置系统。

## 1. 配置文件概览

Moltbot 的所有配置都存储在用户目录下的一个 JSON5 文件中：

**位置**：`~/.clawdbot/moltbot.json`

> **提示**：JSON5 格式支持注释 (`//`) 和尾部逗号，比标准 JSON 更人性化。

### 1.1 基础结构

一个典型的配置文件包含以下四大板块：

```json5
{
  // 1. Agent 设定：定义智能体的行为、工作区和身份
  agents: {
    defaults: {
      workspace: "~/clawd", // 记忆存储位置
      model: "anthropic/claude-3-5-sonnet-latest" // 默认模型
    },
    list: [
      {
        id: "main",
        identity: {
          name: "Jarvis", // 名字
          emoji: "🤖",    // 头像/Emoji
          theme: "helpful assistant"
        }
      }
    ]
  },

  // 2. 渠道配置：连接 WhatsApp, Telegram 等
  channels: {
    whatsapp: {
      allowFrom: ["+8613800000000"] // 白名单
    },
    telegram: {
      botToken: "123456:ABC-DEF..."
    }
  },

  // 3. 网关设置：端口与安全
  gateway: {
    port: 18789,
    auth: { token: "your-secured-token" }
  },

  // 4. 工具与技能：扩展能力
  tools: {
    web: { search: { apiKey: "..." } }
  }
}
```

## 2. 打造你的专属 Agent (Identity)

让 AI 变得有"人味"，关键在于身份定义。

### 2.1 修改名字与头像

在 `agents.list` 中配置 `identity` 字段：

```json5
identity: {
  name: "Molt",         // 聊天时显示的名称
  emoji: "🦞",          // 用于通过 Reacji (Emoji回应) 确认收到消息
  avatar: "http://..."  // 自定义头像 URL
}
```

### 2.2 塑造灵魂 (Bootstrap Files)

Moltbot 启动时会读取工作区 (`~/clawd`) 下的特制 Markdown 文件来注入人设。你可以直接编辑这些文件：

*   **`SOUL.md`**: 定义性格、说话语气、价值观。（例如：“你是一个说话风趣的程序员...”）
*   **`AGENTS.md`**: 定义核心指令和长期记忆。
*   **`USER.md`**: 告诉 Agent 关于**你**的信息。（例如：“用户喜欢简短的回答。”）

## 3. 安全与权限 (Auth & Security)

既然 Moltbot 运行在你本地，安全至关重要。

### 3.1 限制聊天对象 (Allowlist)

默认情况下，Moltbot 可能会对未知来源的私聊 (DM) 发起配对 (Pairing) 请求。为了安全，建议开启白名单模式：

```json5
channels: {
  whatsapp: {
    dmPolicy: "allowlist", // 仅允许白名单号码
    allowFrom: ["+8613900000000"]
  },
  telegram: {
    dmPolicy: "allowlist",
    allowFrom: ["tg:12345678"] // 使用 Telegram User ID
  }
}
```

### 3.2 群聊策略 (Group Chat)

想把 Moltbot 拉进群里？

*   **Mention (默认)**: 只有 @它 或者提到它的名字（在 `mentionPatterns` 定义）时它才会回复。
*   **Self-Chat (自聊模式)**: 如果你把自己加到 `allowFrom`，你在群里发的消息它也会看（像你的嘴替）。

推荐配置（防止他在群里乱说话）：

```json5
agents: {
  list: [{
    id: "main",
    groupChat: {
      mentionPatterns: ["@bot", "助手"] //只有听到这些词才唤醒
    }
  }]
}
```

## 4. 多 Agent 路由 (Advanced)

Moltbot 支持在一个网关内运行多个“人格”。

例如，你可以创建一个 "Work Bot" (工作用，严肃) 和一个 "Life Bot" (生活用，活泼)。

```json5
agents: {
  list: [
    { id: "work", workspace: "~/clawd-work" },
    { id: "life", workspace: "~/clawd-life" }
  ]
},
// 绑定规则
bindings: [
  { match: { channel: "slack" }, agentId: "work" }, // Slack 消息给 Work Bot
  { match: { channel: "telegram" }, agentId: "life" } // Telegram 消息给 Life Bot
]
```

---

**下一步**：配置好了大脑和身体，接下来我们要给它安装“机械臂”。在[第三章](/manual/03_skills)中，我们将学习如何使用 Skills 让 Moltbot 具备联网搜索、操作文件等超能力。
