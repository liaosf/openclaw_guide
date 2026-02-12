---
title: 第六章：常用命令与故障排查 (Reference)
description: 第六章：常用命令与故障排查 (Reference)
---

这是你的随身查阅手册。

## 1. CLI 命令速查表

| 场景 | 命令 | 说明 |
| :--- | :--- | :--- |
| **安装/初始化** | `openclaw setup` | 初始化配置和目录结构 |
| **网关管理** | `openclaw gateway start` | 启动网关服务 |
| | `openclaw gateway status` | 查看网关运行状态 |
| | `openclaw health` | 检查健康状况 (最常用) |
| **渠道管理** | `openclaw channels login` | 登录/连接各个聊天渠道 |
| | `openclaw channels list` | 列出已连接的渠道 |
| **定时任务** | `openclaw cron list` | 查看所有定时任务 |
| | `openclaw cron add ...` | 添加新任务 |
| **调试** | `openclaw logs` | 查看运行日志 |

## 2. 配置文件速查 (openclaw.json)

| 键名 (Key) | 作用 | 常见配置 |
| :--- | :--- | :--- |
| `agents.list` | 定义智能体 | 修改名字、头像、工作区路径 |
| `channels` | 渠道配置 | 设置 WhatsApp 白名单、Telegram Token |
| `gateway` | 网关设置 | 修改端口 (`port`)、认证 (`auth`) |
| `skills` | 技能配置 | 启用/禁用技能、设置 API Key |
| `cron` | 定时任务 | 启用/禁用调度器 |
| `logging` | 日志配置 | 修改日志级别、输出目标 |

## 3. 常见问题 (FAQ)

### Q: 启动时提示 "Port 18789 is already in use"
**A**: 说明 Gateway 已经在运行了。
*   尝试 `openclaw gateway status` 查看。
*   如果是意外残留，可以使用 `openclaw gateway stop` 或者手动 kill 掉进程。

### Q: 手机发消息给 Bot 没反应？
**A**:
1.  检查 Gateway 是否运行：`openclaw health`。
2.  检查是否开启了白名单 (`allowlist`)，而你的号码不在列表里。
3.  查看日志：`openclaw logs`，看是否有报错信息。

### Q: 远程连接不上 Gateway？
**A**:
1.  检查防火墙是否放行 18789 端口（如果直连）。
2.  推荐用 Tailscale，确认 MagicDNS 是否能 ping 通。
3.  检查 `openclaw.json` 里的 `gateway.bind` 是否设置为 `loopback` (也就是只允许本地)，即使是 Tailscale Serve 也推荐保持 loopback。
4.  如果是在服务器上运行，确认是否开启了 `systemd` 管理。

### Q: Linux 上退出 SSH 后 Bot 就挂了？
**A**: Systemd 默认会在用户退出时清理进程。
请执行：`sudo loginctl enable-linger $USER`，这样即使用户退出，后台服务也会继续运行。

## 4. 更多资源

*   **ClawdHub (技能商店)**: [https://clawdhub.ai](https://clawdhub.ai)
*   **GitHub 源码**: [https://github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
*   **官方文档**: [https://docs.openclaw.ai](https://docs.openclaw.ai)

---
