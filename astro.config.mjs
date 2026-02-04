import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	site: 'https://example.com', // 随便写一个，部署时再改
	integrations: [
		starlight({
			title: 'OpenClaw 101',
			defaultLocale: 'zh-CN', // 设置中文
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: '开始',
					items: [
						{ label: '简介', link: '/intro' },
					],
				},
				{
					label: '🚀 快速开始',
					items: [
						{ label: 'Moltbot 简介与快速开始', link: '/guides/01_introduction' },
						{ label: '核心配置与个性化', link: '/guides/02_configuration' },
						{ label: '技能扩展与自动化', link: '/guides/03_skills' },
						{ label: '高级部署与架构', link: '/guides/04_deployment' },
						{ label: '常用命令与故障排查', link: '/guides/05_reference' },
						{ label: '高阶玩法与深度集成', link: '/guides/06_advanced' },
						// { label: 'Day 1: 环境搭建', link: '/guides/day1' },
						// { label: 'Day 2: 基础配置', link: '/guides/day2' },
					],
				},
				{
					label: '🧩 精选技能',
					items: [
						{ label: '技能概览', link: '/skills/overview' },
						{ label: 'Gmail 助手', link: '/skills/gmail' },
					],
				},
				{
					label: '🧩 资源',
					items: [
						{ label: '2026 国内服务器选购', link: '/resources/mainland-server' },
						{ label: '2026 海外服务器选购', link: '/resources/overseas-server' },
					],
				},
			],
		}),
		tailwind({
			// Disable the default base styles if they conflict with Starlight
			applyBaseStyles: false,
		}),
	],
});