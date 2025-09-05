# 环境变量配置文档

## 📖 概述

项目使用 Vite 的环境变量系统，支持不同环境的配置管理。所有环境变量必须以 `VITE_` 前缀开头才能在客户端代码中访问。

## 🗂️ 环境文件

| 文件名 | 环境 | 说明 |
|--------|------|------|
| `.env` | 所有环境 | 公共环境变量，所有环境都会加载 |
| `.env.development` | 开发环境 | 开发环境专用配置 |
| `.env.production` | 生产环境 | 生产环境专用配置 |
| `.env.staging` | 测试环境 | 测试环境专用配置 |
| `.env.local` | 本地环境 | 本地开发专用（不提交到版本控制） |

## 🔧 环境变量列表

### 应用基础配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `VITE_APP_TITLE` | string | Frontend Template | 应用标题 |
| `VITE_APP_VERSION` | string | 1.0.0 | 应用版本 |
| `VITE_APP_DESCRIPTION` | string | - | 应用描述 |
| `VITE_APP_ENV` | string | development | 当前环境 |

### API 配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `VITE_API_BASE_URL` | string | http://localhost:3000/api | API 基础地址 |
| `VITE_API_TIMEOUT` | number | 10000 | API 请求超时时间（毫秒） |

### 开发配置

| 变量名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `VITE_APP_PORT` | number | 5173 | 开发服务器端口 |
| `VITE_APP_OPEN_BROWSER` | boolean | true | 是否自动打开浏览器 |
| `VITE_APP_DEBUG` | boolean | false | 是否开启调试模式 |
| `VITE_APP_MOCK` | boolean | false | 是否开启 Mock 数据 |

## 💡 使用方法

### 1. 直接使用

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
const isDebug = import.meta.env.VITE_APP_DEBUG === 'true'
```

### 2. 使用工具类（推荐）

```typescript
import EnvUtil from '@/utils/env'

const apiUrl = EnvUtil.getApiBaseUrl()
if (EnvUtil.isDevelopment()) {
  console.log('当前为开发环境')
}
```

## 🚀 运行命令

```bash
# 开发环境
npm run dev

# 测试环境
npm run dev:staging

# 生产构建
npm run build

# 测试环境构建
npm run build:staging
```

## ⚠️ 注意事项

1. 必须以 `VITE_` 前缀开头
2. 不要存储敏感信息
3. `.env.local` 不提交到版本控制
4. 使用 TypeScript 类型声明确保类型安全