# Frontend Template

一个基于 Vue 3 + TypeScript + Vite 的现代前端开发模板，集成了常用的开发工具和组件库。

## 📋 项目简介

这是一个开箱即用的 Vue 3 前端项目模板，旨在为开发者提供快速启动现代前端开发的标准化基础架构。项目采用了最新的前端技术栈和最佳实践，帮助开发团队快速搭建高质量的前端应用。

## ⚡ 技术栈

- **框架**: Vue 3.5.18 (Composition API + `<script setup>`)
- **构建工具**: Vite 7.1.2
- **类型检查**: TypeScript 5.9.2
- **路由**: Vue Router 4.5.1
- **UI 组件库**: Element Plus 2.11.1
- **样式预处理**: SCSS 1.91.0
- **自动导入**: unplugin-auto-import + unplugin-vue-components

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发环境

```bash
# 启动开发服务器
npm run dev

# 或
yarn dev
```

### 构建生产版本

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
frontend-template/
├── src/
│   ├── components/          # 公共组件
│   │   ├── layouts/         # 布局组件
│   │   ├── common/          # 通用组件
│   │   └── CSearchTable/    # 表格组件
│   ├── pages/              # 页面组件
│   │   ├── Dashboard/       # 仪表板页面
│   │   ├── Login/          # 登录页面
│   │   └── User/           # 用户管理页面
│   ├── router/             # 路由配置
│   ├── styles/             # 样式文件
│   ├── App.vue             # 根组件
│   └── main.ts             # 应用入口
├── types/                  # TypeScript 类型声明
├── public/                 # 静态资源
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目配置
```

## 🎯 核心特性

### 🎨 现代化的 UI 设计
- 集成 Element Plus 组件库
- 响应式布局设计
- 主题定制支持
- SCSS 样式预处理

### 🔧 开发体验优化
- TypeScript 严格模式支持
- 自动导入组件和 API
- 热重载开发服务器
- ESLint + Prettier 代码规范

### 📦 组件化架构
- 可复用的业务组件
- 灵活的布局系统
- 标准化的表格组件
- 完整的路由管理

### 🎛️ 表格组件 (CSearchTable)
- 支持搜索、分页、排序
- 插槽化的灵活配置
- 智能高度计算
- 批量操作支持

## 📖 使用说明

### 路由配置

项目使用 Vue Router 4 进行路由管理，配置文件位于 `src/router/index.ts`。支持嵌套路由和路由守卫。

### 组件开发

- 页面组件放在 `src/pages/` 目录下
- 公共组件放在 `src/components/` 目录下
- 使用 `<script setup>` 语法和 Composition API

### 样式管理

- 全局样式在 `src/styles/` 目录下
- 支持 SCSS 预处理器
- 自动导入主题变量

## 🔗 相关链接

- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [TypeScript 文档](https://www.typescriptlang.org/zh/)

## 📄 许可证

MIT License
