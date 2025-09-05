# Request 请求封装工具

基于 Axios 封装的功能完整的 HTTP 请求工具，提供了请求拦截、响应拦截、错误处理、Loading 状态管理等功能。

## 功能特性

- ✅ 基于 Axios 封装，支持所有 HTTP 方法
- ✅ 自动 Token 认证
- ✅ 请求/响应拦截器
- ✅ 全局 Loading 状态管理
- ✅ 统一错误处理
- ✅ 支持文件上传/下载
- ✅ 并发请求支持
- ✅ 请求取消支持
- ✅ TypeScript 类型支持
- ✅ 环境变量配置

## 安装依赖

```bash
npm install axios
```

## 环境配置

在 `.env` 文件中配置 API 基础地址：

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 基本使用

### 1. 导入请求工具

```typescript
import request from '@/utils/request'
```

### 2. GET 请求

```typescript
// 基础 GET 请求
const data = await request.get('/api/users')

// 带参数的 GET 请求
const users = await request.get('/api/users', { page: 1, size: 10 })

// 带配置的 GET 请求
const users = await request.get('/api/users', { page: 1 }, {
  showLoading: true,
  loadingText: '正在加载用户...'
})
```

### 3. POST 请求

```typescript
// 创建用户
const user = await request.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
}, {
  showLoading: true,
  showSuccess: true
})
```

### 4. PUT/PATCH 请求

```typescript
// 更新用户
const user = await request.put('/api/users/1', {
  name: '李四'
})

// 部分更新
const user = await request.patch('/api/users/1', {
  status: 1
})
```

### 5. DELETE 请求

```typescript
// 删除用户
await request.delete('/api/users/1', {
  showSuccess: true
})
```

## 高级功能

### 1. 文件上传

```typescript
// 上传单个文件
const result = await request.upload('/api/upload', file, {
  showLoading: true,
  loadingText: '正在上传...'
})

// 手动构建 FormData
const formData = new FormData()
formData.append('file', file)
formData.append('type', 'avatar')

const result = await request.post('/api/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

### 2. 文件下载

```typescript
// 下载文件
await request.download('/api/export', { type: 'excel' }, '导出数据.xlsx')

// 带参数的下载
await request.download('/api/users/export', {
  startDate: '2024-01-01',
  endDate: '2024-12-31'
}, '用户列表.xlsx')
```

### 3. 并发请求

```typescript
// 并发执行多个请求
const requests = [
  request.get('/api/users'),
  request.get('/api/roles'),
  request.get('/api/permissions')
]

const [users, roles, permissions] = await request.all(requests)
```

### 4. 取消请求

```typescript
// 创建取消令牌
const source = request.cancelToken()

// 发起可取消的请求
const promise = request.get('/api/data', undefined, {
  cancelToken: source.token
})

// 取消请求
source.cancel('用户取消了请求')
```

## 配置选项

### RequestConfig 接口

```typescript
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean    // 是否显示loading，默认false
  showError?: boolean      // 是否显示错误提示，默认true
  showSuccess?: boolean    // 是否显示成功提示，默认false
  loadingText?: string     // loading文本，默认"加载中..."
}
```

### 示例用法

```typescript
const data = await request.get('/api/users', {}, {
  showLoading: true,       // 开启loading
  showError: false,        // 不显示错误提示
  showSuccess: true,       // 显示成功提示
  loadingText: '正在获取用户列表...'
})
```

## API 服务封装示例

创建 API 服务文件 `src/api/user.ts`：

```typescript
import request from '@/utils/request'

export interface User {
  id: number
  username: string
  email: string
  status: number
}

export const userApi = {
  // 获取用户列表
  getList(params: any) {
    return request.get<User[]>('/api/users', params)
  },

  // 获取用户详情
  getDetail(id: number) {
    return request.get<User>(`/api/users/${id}`)
  },

  // 创建用户
  create(data: any) {
    return request.post<User>('/api/users', data, {
      showSuccess: true
    })
  },

  // 更新用户
  update(id: number, data: any) {
    return request.put<User>(`/api/users/${id}`, data, {
      showSuccess: true
    })
  },

  // 删除用户
  delete(id: number) {
    return request.delete(`/api/users/${id}`, {
      showSuccess: true
    })
  }
}
```

## 在 Vue 组件中使用

```vue
<template>
  <div>
    <el-button @click="loadUsers">加载用户</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userApi } from '@/api/user'

const users = ref([])

const loadUsers = async () => {
  try {
    const data = await userApi.getList({ page: 1, size: 10 })
    users.value = data
  } catch (error) {
    console.error('加载失败:', error)
  }
}
</script>
```

## 错误处理

### 全局错误处理

请求工具已经内置了全局错误处理，包括：

- **网络错误**：自动显示网络连接异常提示
- **HTTP 状态码错误**：根据状态码显示相应的错误信息
- **业务错误**：根据后端返回的错误码和消息显示提示
- **401 未授权**：自动清除 token 并跳转到登录页

### 自定义错误处理

```typescript
try {
  const data = await request.get('/api/users')
} catch (error) {
  // 自定义错误处理逻辑
  console.error('请求失败:', error)
}
```

### 禁用错误提示

```typescript
const data = await request.get('/api/users', {}, {
  showError: false // 不显示错误提示
})
```

## 响应数据格式

后端响应数据应遵循以下格式：

```json
{
  "code": 200,
  "data": {},
  "message": "success",
  "success": true
}
```

- `code`: 状态码，200 表示成功
- `data`: 实际数据
- `message`: 消息文本
- `success`: 是否成功

## 注意事项

1. **Token 管理**：Token 存储在 localStorage 中，key 为 'token'
2. **Loading 管理**：多个并发请求会正确管理 loading 状态
3. **错误处理**：401 错误会自动清除 token 并跳转登录页
4. **缓存防止**：GET 请求会自动添加时间戳参数防止缓存
5. **超时设置**：默认请求超时时间为 10 秒

## 环境变量

在不同环境文件中配置不同的 API 地址：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production  
VITE_API_BASE_URL=https://api.production.com

# .env.staging
VITE_API_BASE_URL=https://api.staging.com
```