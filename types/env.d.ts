/// <reference types="vite/client" />

// Vue 文件模块声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  // 应用基础配置
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_APP_ENV: 'development' | 'production' | 'staging'

  // API 配置
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string

  // 应用配置
  readonly VITE_APP_PORT: string
  readonly VITE_APP_OPEN_BROWSER: string
  readonly VITE_APP_DEBUG: string
  readonly VITE_APP_MOCK: string
  readonly VITE_APP_GZIP: string
  readonly VITE_APP_CDN: string
  readonly VITE_APP_CONSOLE_LOG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}