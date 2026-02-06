---
title: 02 - 安装 OpenClaw
description: 本文档详细介绍了安装 OpenClaw 的两种方法：官方安装脚本和手动安装。
---

## 方法一：官方安装脚本（推荐）

OpenClaw 提供了一键安装脚本，支持自动检测和配置。

### 安装步骤

1. **运行安装脚本**

```bash
curl -fsSL https://molt.bot/install.sh | bash
```

2. **选择配置选项**

脚本会显示以下选项（使用空格键选择，回车键确认）：

```
Do you want to install OpenClaw? (Y/n) [Y] → 按回车
```

```
Installation mode: [QuickStart] → 选择 QuickStart
```

```
Install method: [NPM] → 选择 NPM
```

```
Select openRouter as default model: [Y/n] → 按回车
```

```
Enter your API key: [sk-or-...] → 输入你的 API Key
```

```
Configure messaging app? [Y/n] → 选择 n（我们手动配置）
```

```
Configure hooks? [Y/n] → 选择 n
```

3. **等待安装完成**

安装完成后，会显示以下选项：

```
You can now:
- Start OpenClaw in the background: openclaw daemon start
- Run OpenClaw in TUI mode: openclaw tui
- View logs: openclaw logs --follow
```

## 方法二：手动安装

如果需要更精细的控制，可以使用手动安装方式。

### 1. 安装 OpenClaw

```bash
# 全局安装
npm install -g openclaw
```

### 2. 初始化配置

```bash
# 运行配置向导
openclaw configure
```

向导会引导你完成以下配置：

- Gateway 端口（默认 18789）
- 认证方式（推荐 token）
- 代理设置
- 插件配置

## 验证安装

### 1. 检查 OpenClaw 版本

```bash
openclaw -v
# 应输出: OpenClaw 2026.2.1 (ed4529e)
```

### 2. 检查 Gateway 状态

```bash
openclaw gateway status
```

预期输出：

```
Gateway: local · ws://127.0.0.1:18789 · reachable
Agent: 1 active
```

### 3. 测试 TUI 模式

```bash
openclaw tui
```

在弹出的界面中输入 "Hello"，按回车，应该能看到回复。

## 启动 Gateway

### 方式一：使用 systemd（推荐生产环境）

```bash
# 安装 systemd 服务
openclaw daemon install

# 启动服务
openclaw daemon start

# 查看状态
openclaw daemon status

# 查看日志
openclaw logs --follow
```

### 方式二：前台运行（测试/开发）

```bash
# 直接运行
openclaw gateway run

# 或使用 TUI 模式
openclaw tui
```

### 方式三：后台运行

```bash
# 后台运行并输出日志
nohup openclaw gateway run > /tmp/openclaw.log 2>&1 &

# 查看进程
ps aux | grep openclaw

# 查看日志
tail -f /tmp/openclaw.log
```

## 配置文件位置

- **主配置**: `~/.openclaw/openclaw.json`
- **会话数据**: `~/.openclaw/agents/<agent_id>/sessions/`
- **日志文件**: `/tmp/openclaw/openclaw-YYYY-MM-DD.log`
- **插件目录**: `~/.openclaw/extensions/`

## 更新 OpenClaw

```bash
# 更新到最新版本
openclaw update

# 或使用 npm
npm update -g openclaw
```

## 卸载 OpenClaw

```bash
# 停止服务
openclaw daemon stop

# 卸载
npm uninstall -g openclaw

# 删除配置（可选）
rm -rf ~/.openclaw
```

---

## 下一步

安装完成后，请继续阅读：

- [03 - 配置大模型（七牛云）](./03-配置大模型.md)
- [04 - 飞书配置](./04-飞书配置.md)
- [05 - 钉钉配置](./05-钉钉配置.md)

---

## 常见问题

### 1. 安装时出现权限错误

**问题**: `EACCES: permission denied`

**解决方案**: 使用 sudo 或配置 npm 全局目录权限

```bash
sudo npm install -g openclaw

# 或
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 2. Gateway 启动失败

**问题**: Gateway 无法启动

**解决方案**: 检查端口占用和日志

```bash
# 检查端口是否被占用
sudo lsof -i :18789

# 查看详细日志
openclaw logs --follow
```

### 3. 插件无法加载

**问题**: 安装后插件不生效

**解决方案**: 重启 Gateway

```bash
openclaw gateway restart
```

---

## 参考资源

- [OpenClaw 安装文档](https://docs.openclaw.ai/start/install)
- [官方安装脚本说明](https://github.com/molt-bot/install)
