---
title: 06 - 其他渠道配置
description: 本文档介绍其他常用消息渠道的配置方法。
---

## 支持的渠道列表

- ✅ **Telegram** - 最流行的聊天应用之一
- ✅ **Discord** - 游戏/开发者社区常用
- ✅ **WhatsApp** - 全球最流行的消息应用
- ✅ **Signal** - 注重隐私的加密消息应用
- ✅ **Slack** - 企业团队协作平台
- ✅ **微信** - 中国最流行的社交应用（需特殊配置）

## 渠道对比

| 渠道 | 特点 | 适用场景 |
|------|------|----------|
| **Telegram** | 生态系统完善、API 文档丰富 | 个人用户、开发者 |
| **Discord** | 群组功能强大、Discord 机器人丰富 | 游戏社区、技术社区 |
| **WhatsApp** | 用户基数大、连接稳定 | 个人使用 |
| **Signal** | 重视隐私、端到端加密 | 注重隐私的用户 |
| **Slack** | 企业集成、插件丰富 | 企业团队 |
| **微信** | 中国用户基础、社交属性强 | 国内使用 |

## 配置通用步骤

### 1. 安装渠道插件

以 Telegram 为例：

```bash
openclaw plugins install @m1heng-clawd/telegram
```

其他渠道安装方法类似，插件名不同：

- Discord: `@m1heng-clawd/discord`
- WhatsApp: `@m1heng-clawd/whatsapp`
- Signal: `@m1heng-clawd/signal`
- Slack: `@m1heng-clawd/slack`

### 2. 获取必要的凭证

每个渠道需要不同的凭证：

**Telegram**：
- `botToken` - 从 @BotFather 获取

**Discord**：
- `token` - Discord Bot Token
- `clientId` - 应用 ID

**WhatsApp**：
- `phoneNumber` - 手机号码（带国家代码）
- `apiKey` / `session` - WhatsApp 会话

**Signal**：
- `deviceNumber` - 设备号码
- `apiServer` - API 服务器地址

**Slack**：
- `botToken` - Slack Bot Token
- `signingSecret` - 签名密钥

### 3. 配置 OpenClaw

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123:ABC-XYZ"
    },
    "discord": {
      "enabled": true,
      "token": "MTIxNTcy..."
    }
  }
}
```

### 4. 重启 Gateway

```bash
openclaw gateway restart
```

### 5. 测试配置

在对应的平台添加机器人，发送测试消息。

---

## Telegram 配置详解

### 1. 创建 Telegram Bot

1. 在 Telegram 搜索 `@BotFather`
2. 发送 `/newbot`
3. 按提示设置机器人名称和用户名
4. 复制返回的 token

### 2. 配置权限

进入 BotFather 设置：

```
/setprivacy - 群组隐私模式
/setjoingroups - 是否允许添加到群
```

### 3. 配置示例

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123456789:ABCdefGHIjklMNOpqrsTUVwxyz",
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist",
      "groups": {
        "*": {
          "requireMention": true
        }
      }
    }
  }
}
```

---

## Discord 配置详解

### 1. 创建 Discord Bot

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击「New Application」
3. 创建 Bot 账号
4. 复制 `TOKEN`
5. 生成 Client Secret
6. 在「OAuth2 → URL Generator」配置权限

### 2. 配置示例

```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "token": "MTIxNTcyMDAwMDAwMDQyMTY4OA.G...你的TOKEN",
      "dmPolicy": "open",
      "groupPolicy": "open",
      "capabilities": {
        "inlineButtons": "allowlist"
      }
    }
  }
}
```

---

## WhatsApp 配置详解

### 1. 安装依赖

```bash
npm install -g @whiskeysockets/baileys @adiwajshing/baileys
```

### 2. 配置示例

```json
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "phoneNumber": "8613800138000",
      "dmPolicy": "pairing"
    }
  }
}
```

---

## 配置最佳实践

### 1. 安全配置

**私聊策略**：
- 推荐：`pairing` - 需要配对验证
- 允许所有：`open` - 需要设置 `allowFrom: ["*"]`

**群聊策略**：
- 推荐：`allowlist` - 只允许特定群聊
- 禁用：`disabled` - 不响应任何群消息

### 2. 按需配置

**仅启用需要的渠道**：

```json
{
  "channels": {
    "feishu": {
      "enabled": true
    },
    "dingtalk": {
      "enabled": true
    }
    // 不需要的渠道不配置
  }
}
```

### 3. 日志配置

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123:ABC",
      "debug": true  // 开启调试日志
    }
  }
}
```

---

## 多渠道同时配置

### 示例配置

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "qiniu/glm-4.7-flash"
      }
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "123:ABC",
      "dmPolicy": "pairing"
    },
    "feishu": {
      "enabled": true,
      "appId": "cli_xxxxx",
      "appSecret": "your-secret"
    },
    "dingtalk": {
      "enabled": true,
      "clientId": "ding_xxxxx",
      "clientSecret": "your-secret"
    },
    "whatsapp": {
      "enabled": true,
      "phoneNumber": "8613800138000"
    }
  }
}
```

**效果**：
- 可以在所有渠道同时使用同一个 AI 助手
- 消息会在所有渠道同步

---

## 渠道集成管理

### 使用 `/model` 命令切换模型

```bash
/message set model zai/glm-4.7-flash  # 在 Telegram
/message set model qiniu/glm-4.7-flash  # 在飞书
/message set model dingtalk/glm-4.7-flash  # 在钉钉
```

### 使用 `/channels` 命令管理渠道

```bash
/channels list  # 列出所有渠道
/channels enable feishu  # 启用飞书
/channels disable dingtalk  # 禁用钉钉
```

---

## 常见问题

### 1. 渠道配置后不生效

**问题**: 配置了但机器人不工作

**解决方案**:
1. 重启 Gateway
2. 检查凭证是否正确
3. 查看日志：`openclaw logs | grep <channel>`

### 2. 消息在某个渠道收不到

**问题**: 其他渠道正常，只有某个渠道收不到

**解决方案**:
1. 检查该渠道的权限配置
2. 确认机器人已添加
3. 检查网络连接

### 3. 配置文件冲突

**问题**: 同时配置多个渠道，配置混乱

**解决方案**:
1. 使用 `$include` 拆分配置文件
2. 分离不同渠道的配置
3. 使用配置向导：`openclaw configure`

---

## 下一步

渠道配置完成后，继续阅读：

- [07 - 测试验证](./07-测试验证.md)
- [08 - 故障排查](./08-故障排查.md)

---

## 参考资源

- [OpenClaw 渠道文档](https://docs.openclaw.ai/channels)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Discord API](https://discord.com/developers/docs/intro)
- [WhatsApp Web API](https://faq.whatsapp.com/general/developers/connecting-to-the-whatsapp-business-api)
