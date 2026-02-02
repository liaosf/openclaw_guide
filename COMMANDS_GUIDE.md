# OpenClaw Guide 常用指令手册

本项目的开发、构建和运行基于 npm 和 Astro CLI。以下是日常操作所需的指令清单。

## 环境要求
- **Node.js**: v18.14.1 或更高版本
- **包管理器**: npm (随 Node.js 安装)

## 1. 项目初始化

首次下载项目后，需要安装依赖：

```bash
npm install
```

## 2. 开发环境 (Development)

启动本地开发服务器，支持热重载（修改文件后浏览器自动刷新）。

```bash
npm run dev
```

- **默认地址**: `http://localhost:4321/`
- **局域网访问**: 如果需要让同一局域网下的手机或其他设备访问，使用：
  ```bash
  npm run dev -- --host
  ```

## 3. 构建与打包 (Build)

将项目编译为静态文件（HTML/CSS/JS），用于生产环境部署。

```bash
npm run build
```

- **输出目录**: `dist/`
- **说明**: 构建完成后，`dist/` 目录下的文件可以直接上传到任何静态网站托管服务（如 GitHub Pages, Vercel, Nginx 服务器等）。

## 4. 本地预览 (Preview)

在构建完成后，可以在本地预览生成的生产环境版本，用于检查构建结果是否正确。

```bash
npm run preview
```

- **注意**: 必须先运行 `npm run build` 生成 `dist/` 目录后，才能运行此命令。

## 5. 常用技巧与注意事项

### 清理缓存
如果遇到奇怪的样式问题或构建错误，可以尝试删除缓存目录和构建目录，然后重新安装依赖：

```bash
# Git Bash / Linux / Mac
rm -rf node_modules .astro dist
npm install
```

### 端口占用
如果默认端口 `4321` 被占用，Astro 会自动尝试下一个可用端口。你也可以手动指定端口：

```bash
npm run dev -- --port 8080
```

### 格式化代码
本项目集成了 Prettier (如果已配置)，通常可以通过编辑器保存自动格式化。如果没有，可以运行：

```bash
npx prettier --write .
```

## 6. 部署指南 (简述)

由于是纯静态网站，部署非常简单：

1. 运行 `npm run build`。
2. 将 `dist/` 文件夹中的所有内容上传到服务器的 Web 根目录。
3. 配置 Web 服务器（如 Nginx）指向该目录即可。
