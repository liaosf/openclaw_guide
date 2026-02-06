---
title: 01 - 环境准备
description: 本文档详细介绍了搭建 OpenClaw 实例所需的环境准备，包括服务器配置、操作系统要求和必要软件。
---

## 推荐服务器配置

### 低配版（测试/开发）

- **CPU**: 2 核
- **内存**: 4GB
- **磁盘**: 40GB SSD
- **带宽**: 5Mbps

### 标准版（推荐）

- **CPU**: 4 核
- **内存**: 8GB
- **磁盘**: 80GB SSD
- **带宽**: 10Mbps

### 高配版（生产环境）

- **CPU**: 8 核
- **内存**: 16GB
- **磁盘**: 160GB SSD
- **带宽**: 20Mbps

### 腾讯云部署建议

如果使用腾讯云部署，可以直接在控制台选择：

```
应用模板：AI智能体-openclaw
```

安装后：
1. 点击「管理实例」
2. 点击「应用管理」
3. 点击「配置大模型」

## 操作系统要求

- **推荐**: Ubuntu 20.04+ / CentOS 7+
- **Node.js**: 20+ (推荐 Node 22)
- **系统**: Linux x64

## 必要软件

### 1. Git

```bash
sudo apt update
sudo apt install git -y
```

### 2. Node.js (通过 NVM)

**国内用户（推荐）**：

```bash
# 安装 NVM (使用 gitee 镜像)
curl -o- https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh | bash

# 重新加载环境变量
source ~/.bashrc

# 安装 Node.js 22
nvm install 22

# 验证版本
node -v  # 应输出 v22.x.x
```

**国外用户**：

```bash
# 安装 NVM (官方源)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 重新加载环境变量
source ~/.bashrc

# 安装 Node.js 22
nvm install 22
```

### 3. 其他工具

```bash
# 预安装工具（安装 OpenClaw 时会自动处理）
sudo apt install -y curl npm
```

---

## 验证环境

### 1. 检查系统信息

```bash
uname -m  # 应输出 x86_64
```

### 2. 检查 Node.js 版本

```bash
node -v  # 应输出 v22.x.x
npm -v   # 应输出 10.x.x 或更高
```

### 3. 检查 Git 版本

```bash
git --version  # 应输出 git version 2.x.x 或更高
```

### 4. 检查网络连接

```bash
# 测试网络连通性
ping -c 3 8.8.8.8
curl -I https://registry.npmjs.org
```

---

## 配置 NPM 镜像（可选，推荐国内用户）

### 使用淘宝镜像

```bash
npm config set registry https://registry.npmmirror.com
```

### 验证镜像配置

```bash
npm config get registry
# 应输出 https://registry.npmmirror.com
```

---

## 下一步

环境准备完成后，请继续阅读：

- [02 - 安装 OpenClaw](./02-安装OpenClaw.md)

---

## 常见问题

### 1. NVM 安装失败

**问题**: `curl: (7) Failed to connect to raw.githubusercontent.com`

**解决方案**: 使用国内镜像

```bash
curl -o- https://gitee.com/RubyMetric/nvm-cn/raw/main/install.sh | bash
```

### 2. Node.js 版本不兼容

**问题**: Node 22 与某些组件不兼容

**解决方案**: 安装 Node 20

```bash
nvm install 20
nvm use 20
```

### 3. 网络连接问题

**问题**: 无法访问 npm registry

**解决方案**: 配置 npm 镜像

```bash
npm config set registry https://registry.npmmirror.com
```

---

## 节省空间的清理

```bash
# 清理 NVM 缓存的旧版本
nvm cache clean

# 清理 npm 缓存
npm cache clean --force
```
