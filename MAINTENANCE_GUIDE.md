# OpenClaw Guide 维护指南

本文档旨在帮助开发者和内容创作者维护 OpenClaw Guide 网站内容。涵盖了页面修改、新增内容、路由配置及最佳实践。

## 目录结构概览

```
openclaw-guide/
├── src/
│   ├── components/      # 公共组件 (页头、页脚、通知栏等)
│   ├── content/
│   │   └── docs/        # 文档内容 (Markdown/MDX 文件)
│   ├── pages/           # 页面路由 (首页 index.astro)
│   └── styles/          # 全局样式 (Tailwind)
├── astro.config.mjs     # 配置文件 (侧边栏菜单配置)
└── public/              # 静态资源 (图片、图标)
```

## 1. 首页维护 (Landing Page)

首页是一个独立的 Astro 页面，不属于文档系统的一部分。

- **文件位置**: `src/pages/index.astro`
- **修改内容**:
  - 该文件包含完整的 HTML 结构和 Tailwind CSS 样式。
  - 修改文字、图片链接、布局结构直接编辑此文件即可。
- **组件**:
  - 首页引用的组件（如 `LandingHeader`, `LandingFooter`）位于 `src/components/` 目录下。
  - 如果需要修改导航栏菜单项或页脚链接，请去对应的组件文件中修改。

## 2. 文档内容维护 (Documentation)

文档系统基于 Starlight 构建，内容以 Markdown 或 MDX 格式存储。

### 新增文档页面

1.  **位置**: 进入 `src/content/docs/` 目录。
2.  **创建文件**: 新建 `.md` 或 `.mdx` 文件。
    - 示例: `src/content/docs/skills/gmail.md`
3.  **Frontmatter 配置**: 文件顶部必须包含 Frontmatter 信息：
    ```markdown
    ---
    title: 页面标题
    description: 页面简短描述
    ---

    这里是正文内容...
    ```

### 组织结构 (文件夹)

建议使用文件夹来组织相关的内容模块：

- `src/content/docs/guides/` - 用于存放教程、向导类文章。
- `src/content/docs/skills/` - 用于存放技能介绍、工具类文章。
- `src/content/docs/resources/` - 用于存放资源列表。

**注意**: 文件夹结构会直接反映在 URL 路径中。例如 `src/content/docs/skills/gmail.md` 的访问路径为 `/skills/gmail`。

## 3. 菜单与路由配置 (Sidebar & Routing)

Starlight 会自动处理页面路由，但**侧边栏菜单需要手动配置**。

- **配置文件**: `astro.config.mjs`
- **配置项**: `sidebar` 数组

### 如何新增菜单项

在 `sidebar` 数组中添加对象：

```javascript
// astro.config.mjs
sidebar: [
    // 分组 1
    {
        label: '🚀 快速开始',
        items: [
            { label: 'Day 1: 环境搭建', link: '/guides/day1' },
        ],
    },
    // 分组 2 (新增)
    {
        label: '🧩 精选技能',
        items: [
            // link 对应 src/content/docs/ 下的文件路径 (不带 .md)
            { label: '技能概览', link: '/skills/overview' },
            { label: 'Gmail 助手', link: '/skills/gmail' },
        ],
    },
],
```

### 菜单排序
菜单显示的顺序完全取决于 `sidebar` 数组中的顺序。你可以随意调整对象的位置。

## 4. 静态资源 (图片)

- **位置**: 将图片放入 `public/` 目录或 `src/assets/` 目录。
- **引用**:
  - 如果放在 `public/images/logo.png`，在 Markdown 中引用路径为 `/images/logo.png`。
  - 推荐在 `public` 下建立子目录分类，如 `public/images/guides/`。

## 5. 常见问题 (FAQ)

**Q: 我新建了文件，但访问 404？**
A:
1. 检查文件名是否包含特殊字符或空格（建议使用短横线命名，如 `my-page.md`）。
2. 检查 Frontmatter 是否包含 `title`。
3. 如果是在 `astro.config.mjs` 中配置了链接，确保 `link` 路径与文件路径一致（不需要 `/src/content/docs` 前缀，也不需要 `.md` 后缀）。

**Q: 如何修改侧边栏的标题？**
A: 修改 `astro.config.mjs` 中对应分组的 `label` 字段。

**Q: 首页的“开始学习”按钮链接错了怎么办？**
A: 去 `src/components/LandingHeader.astro` 和 `src/pages/index.astro` (Hero 区域) 中搜索该链接并修改。
