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
						{ label: 'Day 1: 环境搭建', link: '/guides/day1' },
						{ label: 'Day 2: 基础配置', link: '/guides/day2' },
					],
				},
				{
					label: '🧩 精选技能',
					items: [
						{ label: '技能概览', link: '/skills/overview' },
						{ label: 'Gmail 助手', link: '/skills/gmail' },
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