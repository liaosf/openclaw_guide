---
title: 03 - 配置大模型（七牛云）
description: 本章节介绍如何配置七牛云（Qiniu）AI 大模型作为 OpenClaw 的默认模型。
---

## 前提条件

1. ✅ OpenClaw 已安装
2. ✅ 已有七牛云账号
3. ✅ 已创建 AI 应用并获取 API Key

## 步骤一：创建七牛云 AI 应用

### 1. 注册/登录七牛云

访问 [七牛云控制台](https://portal.qiniu.com/)

### 2. 创建 AI 应用

1. 登录后进入「AI 能力」页面
2. 点击「创建应用」
3. 选择「大模型服务」
4. 填写应用信息：
   - 应用名称: OpenClaw Bot
   - 选择模型: GLM-4.7-Flash (推荐)
5. 点击「创建」

### 3. 获取 API Key

1. 在应用详情页，找到「API 管理」
2. 点击「生成 API Key」
3. 复制保存：
   - **Access Key**: `sk-qXXXX...`
   - **Secret Key**: `xxxxxxxx...`

## 步骤二：配置 OpenClaw

### 方法一：通过配置文件

1. **编辑配置文件**

```bash
nano ~/.openclaw/openclaw.json
```

2. **添加大模型配置**

找到或添加 `agents.defaults.models` 部分：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "qiniu/glm-4.7-flash"
      },
      "models": {
        "qiniu/glm-4.7-flash": {
          "alias": "七牛GLM",
          "baseUrl": "https://ai.qiniu.com/v1",
          "apiKey": "你的七牛云API Key"
        },
        "zai/glm-4.7-flash": {
          "alias": "ZaiGLM"
        }
      }
    }
  }
}
```

3. **重启 Gateway**

```bash
openclaw gateway restart
```

### 方法二：使用 CLI 配置

```bash
openclaw config set agents.defaults.model.primary "qiniu/glm-4.7-flash"
```

### 方法三：交互式配置向导

```bash
openclaw configure
```

按照提示选择：

```
Choose AI provider: [qiniu]
Enter your Qiniu API key: [sk-qXXXX...]
```

## 步骤三：测试大模型配置

### 1. 检查配置状态

```bash
openclaw status
```

在「Agents」部分，应该显示：

```
Agents: 1 · 1 bootstrapping · sessions 1 · default main active
```

### 2. 测试对话

在 TUI 模式下测试：

```bash
openclaw tui
```

输入测试消息：
```
你好，请自我介绍一下。
```

## 配置多模型支持

### 场景：使用多个模型

**示例配置**：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "qiniu/glm-4.7-flash"
      },
      "models": {
        "qiniu/glm-4.7-flash": {
          "alias": "七牛GLM",
          "baseUrl": "https://ai.qiniu.com/v1",
          "apiKey": "你的七牛云API Key"
        },
        "zai/glm-4.7-flash": {
          "alias": "ZaiGLM",
          "baseUrl": "https://open.bigmodel.cn/api/paas/v4"
        },
        "openai/gpt-4": {
          "alias": "OpenAI-GPT4",
          "baseUrl": "https://api.openai.com/v1"
        }
      }
    }
  }
}
```

### 切换模型

在对话中使用 `/model` 命令切换：

```
/model zai/glm-4.7-flash  # 切换到 Zai GLM
/model qiniu/glm-4.7-flash  # 切换到七牛 GLM
```

## 配置模型参数

### 自定义模型参数

```json
{
  "models": {
    "qiniu/glm-4.7-flash": {
      "alias": "七牛GLM",
      "baseUrl": "https://ai.qiniu.com/v1",
      "apiKey": "sk-qXXXX...",
      "temperature": 0.7,
      "maxTokens": 2000
    }
  }
}
```

**参数说明**：

- `temperature`: 控制随机性 (0.0-1.0)
- `maxTokens`: 最大生成长度
- `topP`: 核采样参数

## 常见问题

### 1. API Key 无效

**问题**: `Invalid API Key`

**解决方案**:

1. 检查 API Key 是否正确复制
2. 确认七牛云应用已发布
3. 重启 Gateway

### 2. 模型调用失败

**问题**: `Model API call failed`

**解决方案**:

1. 检查网络连接
2. 验证 API Key 权限
3. 查看日志：`openclaw logs --follow`

### 3. API 调用限流

**问题**: `Rate limit exceeded`

**解决方案**:

1. 升级七牛云套餐
2. 使用缓存减少 API 调用
3. 配置并发限制

---

## 下一步

大模型配置完成后，继续配置消息渠道：

- [04 - 飞书配置](./04-飞书配置.md)
- [05 - 钉钉配置](./05-钉钉配置.md)

---

## 参考资源

- [七牛云 AI API 文档](https://ai.qiniu.com/docs/)
- [OpenClaw 模型配置](https://docs.openclaw.ai/concepts/models)
- [模型选择指南](https://docs.openclaw.ai/gateway/configuration-examples#model-configuration)
