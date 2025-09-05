/**
 * 环境变量工具类
 * 提供类型安全的环境变量访问方法
 */

class EnvUtil {
  /**
   * 获取应用标题
   */
  static getAppTitle(): string {
    return import.meta.env.VITE_APP_TITLE || 'Frontend Template'
  }

  /**
   * 获取应用版本
   */
  static getAppVersion(): string {
    return import.meta.env.VITE_APP_VERSION || '1.0.0'
  }

  /**
   * 获取应用描述
   */
  static getAppDescription(): string {
    return import.meta.env.VITE_APP_DESCRIPTION || ''
  }

  /**
   * 获取当前环境
   */
  static getAppEnv(): 'development' | 'production' | 'staging' {
    return import.meta.env.VITE_APP_ENV as 'development' | 'production' | 'staging' || 'development'
  }

  /**
   * 获取 API 基础 URL
   */
  static getApiBaseUrl(): string {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
  }

  /**
   * 获取 API 超时时间
   */
  static getApiTimeout(): number {
    return Number(import.meta.env.VITE_API_TIMEOUT) || 10000
  }

  /**
   * 获取应用端口
   */
  static getAppPort(): number {
    return Number(import.meta.env.VITE_APP_PORT) || 5173
  }

  /**
   * 是否开启调试模式
   */
  static isDebug(): boolean {
    return import.meta.env.VITE_APP_DEBUG === 'true'
  }

  /**
   * 是否开启 Mock 数据
   */
  static isMock(): boolean {
    return import.meta.env.VITE_APP_MOCK === 'true'
  }

  /**
   * 是否自动打开浏览器
   */
  static isOpenBrowser(): boolean {
    return import.meta.env.VITE_APP_OPEN_BROWSER === 'true'
  }

  /**
   * 是否开启 Gzip 压缩
   */
  static isGzip(): boolean {
    return import.meta.env.VITE_APP_GZIP === 'true'
  }

  /**
   * 是否使用 CDN
   */
  static isCdn(): boolean {
    return import.meta.env.VITE_APP_CDN === 'true'
  }

  /**
   * 是否开启控制台日志
   */
  static isConsoleLog(): boolean {
    return import.meta.env.VITE_APP_CONSOLE_LOG === 'true'
  }

  /**
   * 是否为开发环境
   */
  static isDevelopment(): boolean {
    return this.getAppEnv() === 'development'
  }

  /**
   * 是否为生产环境
   */
  static isProduction(): boolean {
    return this.getAppEnv() === 'production'
  }

  /**
   * 是否为测试环境
   */
  static isStaging(): boolean {
    return this.getAppEnv() === 'staging'
  }

  /**
   * 获取所有环境变量
   */
  static getAllEnv(): Record<string, any> {
    return {
      title: this.getAppTitle(),
      version: this.getAppVersion(),
      description: this.getAppDescription(),
      env: this.getAppEnv(),
      apiBaseUrl: this.getApiBaseUrl(),
      apiTimeout: this.getApiTimeout(),
      port: this.getAppPort(),
      debug: this.isDebug(),
      mock: this.isMock(),
      openBrowser: this.isOpenBrowser(),
      gzip: this.isGzip(),
      cdn: this.isCdn(),
      consoleLog: this.isConsoleLog()
    }
  }
}

export default EnvUtil