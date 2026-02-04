---
title: 第六章：高阶玩法与深度集成 (Master Class)
description: 第六章：高阶玩法与深度集成 (Master Class)
---

恭喜你到达这里！本章将介绍 Moltbot 最硬核的功能。掌握这些，你不仅是用户，更是 Moltbot 的架构师。

## 1. Lobster: 确定性工作流引擎

LLM 有时会“幻觉”或不按步骤行事。为了解决这个问题，Moltbot 引入了 **Lobster** —— 一个内置的工作流运行时。

它允许你定义**“先做A，再做B，如果满足C，则等待用户批准后做D”**这样的严格逻辑。

### 1.1 启用 Lobster

Lobster 是一个可选插件工具：

```json5
// moltbot.json
tools: {
  alsoAllow: ["lobster"]
}
```

### 1.2 编写工作流 (.lobster)

Lobster 使用 YAML 定义流程。例如，一个“每日简报”工作流：

```yaml
# daily-brief.lobster
name: daily-brief
steps:
  - id: list_emails
    command: gog gmail list --newer-than 24h --json

  - id: summarize
    command: clawd.invoke --tool llm --prompt "Summarize these emails" --stdin $list_emails.stdout

  - id: approve_send
    command: echo "Ready to send summary?"
    approval: required # 关键：这里会暂停，等待你点击“批准”

  - id: send_whatsapp
    command: moltbot message send --to +8613800000000 --stdin $summarize.stdout
    condition: $approve_send.approved
```

### 1.3 运行

```bash
moltbot tools call lobster --params '{"action":"run", "pipeline":"/path/to/daily-brief.lobster"}'
```

## 2. Sub-agents: 子智能体并发

想让 Agent 一边帮你写代码，一边去查文档？**Sub-agents** 能让它“分身”。

### 2.1 什么是子智能体？

*   **独立会话**：每个子智能体有独立的记忆，不污染主会话。
*   **并发执行**：在后台运行，不阻塞你的主聊天窗口。
*   **结果汇报**：任务完成后，它会把结果“公告 (Announce)”回主群聊。

### 2.2 使用方法

**通过对话触发**：
> "请启动一个子智能体，帮我研究一下最新的 Next.js 14 的 Server Actions 特性，研究完告诉我。"

**通过斜杠命令管理**：
```bash
/subagents list       # 查看当前在跑的子任务
/subagents stop <id>  # 停止某个任务
```

## 3. Gmail Pub/Sub: 毫秒级邮件响应

普通的 Webhook 是被动的，但结合 Google Cloud Pub/Sub，你可以实现**实时**邮件处理。

### 3.1 架构原理

`Gmail (Google Cloud)` -> `Pub/Sub Push` -> `Tailscale Funnel (公网HTTPS)` -> `Moltbot Gateway`

### 3.2 快速配置

Moltbot 有专用的 Gmail 向导（需要安装 Google Cloud SDK）：

```bash
moltbot webhooks gmail setup --account your-email@gmail.com
```

它会自动：
1.  在 GCP 创建 Pub/Sub Topic。
2.  配置 Gmail Watch 监控收件箱。
3.  设置 webhook 映射，一旦有新邮件，Gateway 就会收到推送。

---

## 4. 自定义技能开发 (Developer SDK)

如果现有的 Skill 不满足需求，你可以用 Node.js 写一个。

**目录结构**: `~/.clawdbot/skills/my-super-skill/`

**SKILL.md** (元数据):
```markdown
---
name: my-super-skill
description: A custom skill that does magic
metadata:
  moltbot:
    requires:
      bins: ["python3"] # 依赖检查
---
```

**index.js** (核心逻辑):
你可以直接写一个标准的 MCP Server，或者简单的脚本。Moltbot 会自动识别并加载它。

---

## 5. Thinking Mode (思考与推理)

对于支持 Chain of Thought (CoT) 的模型（如 OpenAI o1/o3, Anthropic Claude 3.7+），你可以控制其思考深度。

**指令控制**:
*   `/think on` (或 `/t`): 开启推理。
*   `/think high`: 深度推理（消耗更多 Token）。
*   `/think off`: 关闭推理，节省成本。

**相关命令**:
*   `/verbose on`: 显示详细的 Agent 思考过程与工具调用参数。
*   `/reasoning stream`: 在聊天气泡中实时流式输出模型的推理过程（仅特定客户端支持）。

---

**终章寄语**：
Moltbot 是一个有生命的开源项目。你现在的配置，就是一个独一无二的 AI 伙伴。去探索，去创造，去赋予它更多能力吧！
