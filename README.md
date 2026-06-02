# 🌿 给 Crazy 岛主 lazy 的一封情书

> 一个以「动物森友会」为主题风格的订婚邀请网站
>
> 🔗 **[0606.dokduk.cc](https://0606.dokduk.cc)**

---

## 预览

页面分为四个章节，随着滚动逐步展开故事：

| 章节 | 内容 |
|------|------|
| **Hero** | 全屏主视觉，动森场景背景 + 视差滚动 |
| **Phone** | 动森 NookPhone 动画，点击后展开城市回忆相册 |
| **Love** | 情诗章节 |
| **Letter** | 信纸风格情书 + 新人插图 |

---

## 技术栈

- **Vue 3** + TypeScript + Vite
- **GSAP** — 页面动画、ScrollTrigger 视差、卡片层叠切换
- **animal-island-vue** — 动森风格 UI 组件库（本地集成）
- **Less** — 样式预处理

---

## 本地运行

```bash
pnpm install
pnpm dev
```

---

## 构建与部署

```bash
pnpm build   # 产物输出至 dist/
```

CI/CD 通过 Jenkins 自动化部署到 VPS（1Panel 管理）：

- 每次推送 `main` 分支触发构建
- Docker 多阶段构建：`node:23-alpine` 编译 → `nginx:stable-alpine` 服务
- 容器端口映射：`5201:80`，由 OpenResty 反向代理到域名

---

## 项目结构

```
src/
├── sections/           # 页面章节组件
│   ├── HeroSection.vue
│   ├── PhoneSection.vue   # 手机动画 + 城市卡片轮播
│   ├── LoveSection.vue
│   └── ClosingSection.vue # 信纸情书
├── components/
│   └── FloatingPetals.vue # 飘落樱花动画
├── animal-island-vue/  # 本地 UI 组件库
└── App.vue             # Modal 开场 + Loading + iris-open 转场
```

---

*Made with 💚 · 己巳年 初夏*
