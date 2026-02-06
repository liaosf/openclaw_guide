---
title: 05 - 钉钉配置
description: 本章节详细介绍如何配置钉钉 Channel，实现钉钉机器人功能。
---

## 功能特性

✅ **Stream 模式** - WebSocket 长连接，无需公网 IP
✅ **私聊支持** - 直接与机器人对话
✅ **群聊支持** - 在群里 @机器人
✅ **多种消息类型** - 文本、图片、语音、文件、Markdown
✅ **互动卡片** - AI 实时流式回复
✅ **完整 AI 对话** - 接入 OpenClaw 消息处理管道

## 前提条件

1. ✅ 钉钉企业账号
2. ✅ 创建企业内部应用
3. ✅ 获取必要的凭证

## 步骤一：创建钉钉应用

### 1. 访问钉钉开放平台

打开 [钉钉开发者后台](https://open-dev.dingtalk.com/)

### 2. 创建企业内部应用

1. 登录后进入「应用开发」→「企业内部应用」
2. 点击「创建应用」
3. 填写应用信息：
   - **应用名称**: OpenClaw Bot
   - **应用描述**: AI 私人助理
   - **应用图标**: 可选上传图标
4. 点击「创建」

### 3. 配置消息接收模式

1. 在应用管理页，点击「机器人」
2. 找到「消息接收模式」
3. 选择 **Stream 模式**（推荐）
4. 点击「保存」

### 4. 发布应用

1. 进入「版本管理与发布」
2. 点击「新建版本」
3. 填写版本号和描述
4. 点击「发布」
5. 等待发布完成

## 步骤二：获取必要凭证

在应用管理页面，找到以下信息：

| 凭证 | 说明 | 用途 |
|------|------|------|
| **Client ID** (AppKey) | 应用唯一标识 | 配置 OpenClaw |
| **Client Secret** (AppSecret) | 应用密钥 | 配置 OpenClaw |
| **Corp ID** (企业 ID) | 企业唯一标识 | 配置 OpenClaw |
| **Agent ID** | 应用 ID | 配置 OpenClaw |
| **Robot Code** | 机器人代码（与 Client ID 相同） | 配置 OpenClaw |

**保存这些信息**，我们稍后需要用到。

## 步骤三：配置权限管理

### 1. 进入权限管理

应用管理 → 左侧导航栏「权限管理」

### 2. 开启必要权限

搜索并勾选以下权限：

- ✅ **Card.Instance.Write** - 创建和投放卡片实例
- ✅ **Card.Streaming.Write** - 对卡片进行流式更新

**权限说明**：

| 权限 | 用途 |
|------|------|
| `Card.Instance.Write` | 创建和投放 AI 卡片 |
| `Card.Streaming.Write` | 流式更新卡片内容（AI 实时输出） |

### 3. 保存权限配置

点击「保存」

## 步骤四：安装钉钉插件

### 方法一：通过 npm 安装（推荐）

```bash
openclaw plugins install https://github.com/soimy/openclaw-channel-dingtalk.git
```

### 方法二：通过本地源码安装

```bash
# 克隆仓库
git clone https://github.com/soimy/openclaw-channel-dingtalk.git
cd openclaw-channel-dingtalk

# 安装依赖
npm install

# 以链接模式安装（方便开发调试）
openclaw plugins install -l .
```

### 方法三：手动安装

```bash
# 下载插件
# 将插件目录复制到 ~/.openclaw/extensions/dingtalk

# 验证安装
openclaw plugins list
# 应该看到 dingtalk 已在列表中
```

## 步骤五：配置 OpenClaw

### 1. 编辑配置文件

```bash
nano ~/.openclaw/openclaw.json
```

### 2. 添加钉钉配置

在 `channels` 部分添加：

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "clientId": "dingb5kjq6ikv2nh0nnx",
      "clientSecret": "你的AppSecret",
      "robotCode": "dingb5kjq6ikv2nh0nnx",
      "corpId": "ding00877920018f2505ffe93478753d9884",
      "agentId": "4241207929",
      "dmPolicy": "open",
      "groupPolicy": "open",
      "messageType": "markdown"
    }
  }
}
```

### 3. 配置说明

| 配置项 | 说明 | 可选值 |
|--------|------|--------|
| `enabled` | 是否启用 | `true` / `false` |
| `clientId` | 应用 AppKey | 从钉钉后台获取 |
| `clientSecret` | 应用 AppSecret | 从钉钉后台获取 |
| `robotCode` | 机器人代码 | 与 Client ID 相同 |
| `corpId` | 企业 ID | 从钉钉后台获取 |
| `agentId` | 应用 ID | 从钉钉后台获取 |
| `dmPolicy` | 私聊策略 | `open` / `pairing` / `allowlist` |
| `groupPolicy` | 群聊策略 | `open` / `allowlist` / `disabled` |
| `messageType` | 消息类型 | `markdown` / `card` |
| `cardTemplateId` | AI 卡片模板 ID | 仅 `messageType: card` 时需要 |
| `debug` | 调试模式 | `true` / `false` |

### 4. 配置 AI 互动卡片（可选）

如果使用 `messageType: card`，需要配置卡片模板：

1. 访问 [钉钉卡片平台](https://open.dingtalk.com/document/development/card)
2. 进入「我的模板」→「创建模板」
3. 场景选择「AI 卡片」
4. 直接保存（无需选择预设模板）
5. 复制模板 ID（格式：`xxxxx-xxxxx-xxxxx.schema`）

然后在配置文件中添加：

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "clientId": "dingb5kjq6ikv2nh0nnx",
      "clientSecret": "你的AppSecret",
      "robotCode": "dingb5kjq6ikv2nh0nnx",
      "corpId": "ding00877920018f2505ffe93478753d9884",
      "agentId": "4241207929",
      "dmPolicy": "open",
      "groupPolicy": "open",
      "messageType": "card",
      "cardTemplateId": "382e4302-551d-4880-bf29-a30acfab2e71.schema"
    }
  }
}
```

### 5. 配置说明 - 高级选项

**限制私聊发送者**：

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "clientId": "dingb5kjq6ikv2nh0nnx",
      "clientSecret": "你的AppSecret",
      "dmPolicy": "allowlist",
      "allowFrom": ["用户ID1", "用户ID2"]
    }
  }
}
```

**限制群聊**：

```json
{
  "channels": {
    "dingtalk": {
      "enabled": true,
      "clientId": "dingb5kjq6ikv2nh0nnx",
      "clientSecret": "你的AppSecret",
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

## 步骤六：重启 Gateway

```bash
openclaw gateway restart
```

## 步骤七：测试钉钉配置

### 1. 检查插件状态

```bash
openclaw status
```

在「Channels」部分，应该显示：

```
│ DingTalk │ ON      │ OK     │ configured
```

### 2. 添加机器人到钉钉

1. 打开钉钉 APP
2. 进入群聊
3. 点击群设置
4. 找到「群机器人」→「添加机器人」
5. 选择「自定义机器人」
6. 复制 Webhook URL（如果有）
7. 完成添加

### 3. 测试消息

在钉钉私聊或群聊中 @机器人，发送消息：

```
你好，请自我介绍一下。
```

### 4. 验证功能

- ✅ 能收到消息
- ✅ 能收到回复
- ✅ Markdown 渲染正常
- ✅ 文件上传下载正常
- ✅ AI 互动卡片正常（如果配置了）

## 配置对比：Markdown vs 卡片

### Markdown 模式

**优点**：
- 配置简单
- 适用于大多数场景
- 支持富文本格式

**缺点**：
- 不是真正的流式输出
- 视觉效果一般

**适用场景**：
- 简单对话
- 文本回复

### 卡片模式（AI 互动卡片）

**优点**：
- 真正的流式输出（实时显示）
- 更好的视觉体验
- 支持 Markdown 渲染

**缺点**：
- 需要配置卡片模板
- API 调用稍多

**适用场景**：
- AI 对话
- 实时生成内容
- 需要良好视觉展示

## 常见问题

### 1. 收不到消息

**问题**: 机器人能发消息但收不到

**解决方案**:

1. 确认消息接收模式是 Stream 模式
2. 检查权限是否配置正确
3. 重启 Gateway

### 2. 群消息无响应

**问题**: 在群里发送消息但机器人不回复

**解决方案**:

1. 确认机器人已添加到群
2. 确认正确 @机器人（使用机器人名称）
3. 确认群是企业内部群
4. 检查 Gateway 日志：`openclaw logs | grep dingtalk`

### 3. API 调用限流

**问题**: `Rate limit exceeded`

**解决方案**:

1. 升级钉钉应用套餐
2. 使用 Markdown 模式代替卡片模式
3. 监控 API 调用量

### 4. 卡片模板 ID 错误

**问题**: 卡片显示异常

**解决方案**:

1. 重新创建卡片模板
2. 确认模板 ID 格式正确
3. 检查权限配置

---

## 下一步

钉钉配置完成后，继续配置其他渠道：

- [06 - 其他渠道配置](./06-其他渠道配置.md)

---

## 参考资源

- [钉钉开放平台文档](https://open-dev.dingtalk.com/document/2-0/develop-dev-guide)
- [钉钉 Stream 模式](https://open-dev.dingtalk.com/document/2-0/develop-stream/接入-Stream-模式)
- [钉钉卡片平台](https://open.dingtalk.com/document/development/card)
- [OpenClaw 钉钉插件](https://github.com/soimy/openclaw-channel-dingtalk)
