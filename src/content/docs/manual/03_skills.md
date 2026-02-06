---
title: 第三章：技能扩展与自动化 (Skills & Automation)
description: 第三章：技能扩展与自动化 (Skills & Automation)
---

如果说 Gateway 是身体，Agent 是大脑，那么 **Skills** 就是让 Moltbot 与世界交互的“机械臂”。本章将教你如何让 Moltbot 具备超能力，并让它自动为你工作。

## 1. 技能 (Skills) 与 MCP

Moltbot 的技能系统兼容 **MCP (Model Context Protocol)** 标准。简单来说，任何遵循该标准的 Node.js 脚本目录都可以被 Moltbot 加载为一项技能。

### 1.1 获取技能的三种方式

1.  **ClawdHub (官方商店)**
    类似于 `npm install`，你可以从官方仓库直接下载技能：
    ```bash
    # 安装网络搜索技能
    moltbot skills install web-search
    ```

2.  **本地开发 (Local)**
    将你自己编写的 Skill 放入 `~/.clawdbot/skills/` 目录。
    *结构示例*：
    ```
    ~/.clawdbot/skills/
      └── my-custom-skill/
          ├── SKILL.md      # 定义技能元数据 (名称, 描述, 依赖)
          ├── index.js      # 核心逻辑
          └── package.json
    ```

3.  **工作区专用 (Workspace)**
    放在 `~/clawd/skills/` 下的技能仅对该 Agent 可见。

### 1.2 配置技能

在 `moltbot.json` 中，你可以为特定技能配置环境变量（如 API Key）：

```json5
tools: {
  entries: {
    "web-search": {
      env: {
        BING_API_KEY: "your-key-here"
      }
    }
  }
}
```

## 2. 定时任务 (Cron Jobs)

Moltbot 内置了一个强大的调度器，你不再需要 Linux 的 `crontab`。

### 2.1 添加一个提醒

让 Bot 在每天早上 9 点给你发早报：

```bash
moltbot cron add \
  --name "Morning Brief" \
  --cron "0 9 * * *" \
  --message "搜索今天的 AI 科技新闻，并总结成简报发送给我" \
  --channel whatsapp \
  --to "+8613800000000"
```

### 2.2 核心参数

*   `--cron`: Cron 表达式 (分 时 日 月 周)。
*   `--at`: 单次执行时间 (例如 "10m" 后，或 ISO 时间)。
*   `--session isolated`: **推荐**。在一个独立的会话中执行，完成后销毁，不污染主聊天记录。
*   `--deliver`: 执行完成后，将结果推送到指定渠道。

### 2.3 管理任务

```bash
moltbot cron list       # 列出所有任务
moltbot cron run <id>   # 立即手动触发一次
moltbot cron remove <id> # 删除任务
```

## 3. Webhooks (外部触发)

除了定时触发，Moltbot 还能响应外部事件（如 GitHub Push, IFTTT, Zapier）。

### 3.1 启用 Webhooks

在 `moltbot.json` 中配置：

```json5
hooks: {
  enabled: true,
  token: "set-a-secure-token", // 安全令牌
  path: "/hooks"
}
```

### 3.2 触发 Agent

向 Gateway 发送 POST 请求即可触发 Agent 执行任务：

**接口**: `POST http://localhost:18789/hooks/agent`
**Header**: `Authorization: Bearer set-a-secure-token`

**Body**:
```json
{
  "name": "GitHub Alert",
  "message": "刚刚收到一个 GitHub Issue，内容是：Server Crash... 请分析原因。",
  "deliver": true,
  "to": "+8613800000000"
}
```

---

**场景实战**：
你可以结合 **IFTTT** 监控 Gmail 邮件，收到老板邮件后调用 Webhook，让 Moltbot 总结邮件内容并推送到你的 Telegram。

**下一步**：在[第四章](/manual/04_deployment)中，我们将探讨如何将 Moltbot 部署在服务器上，并通过 Tailscale 实现远程访问。
