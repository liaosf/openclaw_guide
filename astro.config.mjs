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
						{ label: 'Moltbot 简介与快速开始', link: '/manual/01_introduction' },
						{ label: '核心配置与个性化', link: '/manual/02_configuration' },
						{ label: '技能扩展与自动化', link: '/manual/03_skills' },
						{ label: '高级部署与架构', link: '/manual/04_deployment' },
						{ label: '常用命令与故障排查', link: '/manual/05_reference' },
						{ label: '高阶玩法与深度集成', link: '/manual/06_advanced' },
						// { label: 'Day 1: 环境搭建', link: '/manual/day1' },
						// { label: 'Day 2: 基础配置', link: '/manual/day2' },
					],
				},
				{
					label: '🧩 部署 OpenClaw',
					items: [
						{ label: '简介', link: '/deploy/list' },
						{ label: '环境准备', link: '/deploy/01_environment' },
						{ label: '安装 OpenClaw', link: '/deploy/02_install' },
						{ label: '配置七牛大模型', link: '/deploy/03_qiniu' },
						{ label: '飞书配置', link: '/deploy/04_feishu' },
						{ label: '钉钉配置', link: '/deploy/05_dingtalk' },
						{ label: '企微配置', link: '/deploy/06_ewx' },
						{ label: '其他渠道配置', link: '/deploy/07_others' },
						{ label: '一键部署', link: '/deploy/onekeydeploy' },
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