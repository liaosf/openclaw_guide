---
title: 04 - 飞书配置
description: 本章节详细介绍如何配置飞书 Channel，实现飞书机器人功能。
---

## 功能特性

✅ **Stream 模式连接** - WebSocket 长连接，无需公网 IP
✅ **私聊支持** - 直接与机器人对话
✅ **群聊支持** - 在群里 @机器人
✅ **消息回复** - 支持文本、卡片、富文本
✅ **媒体支持** - 图片、文件上传和下载
✅ **权限管理** - 完整的权限配置

## 步骤一：创建飞书应用

### 1. 访问飞书开放平台

打开 [飞书开放平台](https://open.feishu.cn/app)

### 2. 创建自建应用

1. 点击「创建应用」
2. 选择「企业自建应用」
3. 填写应用信息：
   - **应用名称**: OpenClaw 助手（或其他你喜欢的名字）
   - **应用描述**: AI 私人助理
   - **应用图标**: 可选上传图标
4. 点击「创建」

### 3. 发布应用

1. 在应用列表，点击新创建的应用
2. 进入「版本管理与发布」
3. 点击「新建版本」
4. 填写版本号和描述
5. 点击「发布」
6. 等待发布完成

## 步骤二：配置权限

### 1. 添加机器人能力

1. 在应用管理页，左侧导航栏找到「添加应用能力」
2. 选择「机器人」
3. 点击「添加」

### 2. 配置必需权限

进入「权限管理」→「批量导入权限」，复制以下 JSON：

```json
{
  "scopes": {
    "tenant": [
      "contact:user.base:readonly",
      "im:chat",
      "im:chat:read",
      "im:chat:update",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.p2p_msg:readonly",
      "im:message:send_as_bot",
      "im:resource"
    ],
    "user": []
  }
}
```

**权限说明**：

| 权限 | 用途 |
|------|------|
| `im:message` | 发送和接收消息 |
| `im:message.p2p_msg:readonly` | 读取私聊消息 |
| `im:message.group_at_msg:readonly` | 接收群聊 @消息 |
| `im:message:send_as_bot` | 以机器人身份发送消息 |
| `im:resource` | 上传下载图片/文件 |
| `contact:user.base:readonly` | 获取用户信息 |

3. 点击「导入」
4. 等待权限审核通过

## 步骤三：配置事件订阅

**⚠️ 重要：事件订阅是机器人接收消息的关键配置！**

### 1. 进入事件配置页面

应用管理 → 左侧导航栏「事件与回调」

### 2. 配置事件订阅方式

- **订阅方式**: 选择「长连接」（推荐）
- **保存配置**

### 3. 添加事件

点击「添加事件」，勾选以下事件：

- ✅ `im.message.receive_v1` - 接收消息（必需）
- ✅ `im.message.message_read_v1` - 消息已读回执
- ✅ `im.chat.member.bot.added_v1` - 机器人进群
- ✅ `im.chat.member.bot.deleted_v1` - 机器人被移出群

### 4. 验证配置

确保所有事件订阅的权限已申请并通过审核。

## 步骤四：获取应用凭证

在「凭据与基础信息」页面，复制以下信息：

| 凭证 | 说明 | 用途 |
|------|------|------|
| **App ID** | cli_xxxxx | 配置 OpenClaw 时使用 |
| **App Secret** | xxxxxxx | 配置 OpenClaw 时使用 |

**保存这些信息**，我们稍后需要用到。

## 步骤五：安装飞书插件

### 方法一：通过 npm 安装

```bash
openclaw plugins install @m1heng-clawd/feishu
```

### 方法二：手动安装

```bash
# 克隆插件仓库
git clone https://github.com/m1heng/clawdbot-feishu.git

# 复制到插件目录
cp -r clawdbot-feishu ~/.openclaw/extensions/feishu

# 重启 Gateway
openclaw gateway restart
```

## 步骤六：配置 OpenClaw

### 1. 编辑配置文件

```bash
nano ~/.openclaw/openclaw.json
```

### 2. 添加飞书配置

在 `channels` 部分添加：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "你的App_ID",
      "appSecret": "你的App_Secret",
      "connectionMode": "websocket",
      "dmPolicy": "open",
      "groupPolicy": "open",
      "requireMention": true,
      "mediaMaxMb": 30,
      "renderMode": "auto"
    }
  }
}
```

### 3. 配置说明

| 配置项 | 说明 | 可选值 |
|--------|------|--------|
| `enabled` | 是否启用 | `true` / `false` |
| `appId` | 飞书 App ID | 从飞书后台获取 |
| `appSecret` | 飞书 App Secret | 从飞书后台获取 |
| `connectionMode` | 连接模式 | `websocket` / `webhook` |
| `dmPolicy` | 私聊策略 | `open` / `pairing` / `allowlist` |
| `groupPolicy` | 群聊策略 | `open` / `allowlist` / `disabled` |
| `requireMention` | 群聊是否需要 @ | `true` / `false` |
| `mediaMaxMb` | 媒体文件大小限制 | MB |

### 4. 高级配置（可选）

**允许特定用户**：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_xxxxx",
      "appSecret": "your-secret",
      "dmPolicy": "allowlist",
      "allowFrom": ["ou_xxxxx", "ou_yyyyy"]
    }
  }
}
```

**限制群聊响应**：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "appId": "cli_xxxxx",
      "appSecret": "your-secret",
      "groupPolicy": "allowlist",
      "groups": {
        "*": {
          "requireMention": true
        },
        "群聊ID": {
          "requireMention": false
        }
      }
    }
  }
}
```

## 步骤七：重启 Gateway

```bash
openclaw gateway restart
```

## 步骤八：测试飞书配置

### 1. 检查插件状态

```bash
openclaw status
```

在「Channels」部分，应该显示：

```
│ Feishu   │ ON      │ OK     │ configured
```

### 2. 添加机器人到飞书

1. 打开飞书 APP
2. 进入「工作台」
3. 找到你的 OpenClaw 应用
4. 点击进入
5. 发送测试消息：「你好」

### 3. 验证功能

- ✅ 能收到消息
- ✅ 能收到回复
- ✅ 能发送文件
- ✅ 群聊 @机器人正常

## 常见问题

### 1. 收不到消息

**问题**: 机器人能发消息但收不到

**解决方案**:

1. 确认事件订阅配置正确（必须用长连接）
2. 检查权限是否审核通过
3. 重启 Gateway

### 2. 403 错误

**问题**: `Access denied. im:message:send_as_bot`

**解决方案**:

1. 确认 `im:message:send_as_bot` 权限已开启
2. 权限需要审核，等待审核通过

### 3. 机器人找不到

**问题**: 在飞书搜索不到机器人

**解决方案**:

1. 确认应用已发布（至少测试版）
2. 搜索机器人名称
3. 如果仍然找不到，检查应用的可用范围

---

## 下一步

飞书配置完成后，继续配置钉钉：

- [05 - 钉钉配置](./05-钉钉配置.md)

---

## 参考资源

- [飞书开放平台文档](https://open.feishu.cn/document/server-docs)
- [飞书机器人配置指南](https://open.feishu.cn/document/server-docs/bot-v3/using-bot-v3)
- [OpenClaw 飞书插件](https://github.com/m1heng/clawdbot-feishu)
