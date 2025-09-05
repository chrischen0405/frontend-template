import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import EnvUtil from './env'

// 请求响应接口
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean // 是否显示loading，默认false
  showError?: boolean // 是否显示错误提示，默认true
  showSuccess?: boolean // 是否显示成功提示，默认false
  loadingText?: string // loading文本
}

// loading实例
let loadingInstance: any = null
let loadingCount = 0

// 显示loading
const showLoading = (text = '加载中...') => {
  if (loadingCount === 0) {
    loadingInstance = ElLoading.service({
      text,
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  loadingCount++
}

// 隐藏loading
const hideLoading = () => {
  loadingCount--
  if (loadingCount <= 0) {
    loadingCount = 0
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: EnvUtil.getApiBaseUrl(), // 基础URL
  timeout: EnvUtil.getApiTimeout(), // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 显示loading
    if (config.showLoading === true) {
      showLoading(config.loadingText)
    }

    // 添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 添加时间戳防止缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }

    return config
  },
  (error: AxiosError) => {
    hideLoading()
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    hideLoading()

    const { data, config } = response
    const requestConfig = config as RequestConfig

    // 如果是下载文件等特殊情况，直接返回
    if (response.config.responseType === 'blob') {
      return response
    }

    // 请求成功
    if (data.code === 200 || data.success) {
      // 显示成功提示
      if (requestConfig.showSuccess && data.message) {
        ElMessage.success(data.message)
      }
      return data.data
    }

    // 业务错误处理
    const errorMessage = data.message || '请求失败'

    // 显示错误提示
    if (requestConfig.showError !== false) {
      ElMessage.error(errorMessage)
    }

    // 特殊状态码处理
    switch (data.code) {
      case 401:
        // 未授权，清除token并跳转登录
        localStorage.removeItem('token')
        window.location.href = '/login'
        break
      case 403:
        ElMessage.error('权限不足')
        break
      case 404:
        ElMessage.error('请求的资源不存在')
        break
      case 500:
        ElMessage.error('服务器内部错误')
        break
    }

    return Promise.reject(new Error(errorMessage))
  },
  (error: AxiosError) => {
    hideLoading()

    let errorMessage = '网络错误'

    if (error.response) {
      // 服务器响应了错误状态码
      switch (error.response.status) {
        case 400:
          errorMessage = '请求参数错误'
          break
        case 401:
          errorMessage = '未授权，请重新登录'
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          errorMessage = '权限不足'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 408:
          errorMessage = '请求超时'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        case 502:
          errorMessage = '网关错误'
          break
        case 503:
          errorMessage = '服务不可用'
          break
        case 504:
          errorMessage = '网关超时'
          break
        default:
          errorMessage = `请求失败: ${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorMessage = '网络连接异常，请检查网络设置'
    } else {
      // 其他错误
      errorMessage = error.message || '请求失败'
    }

    ElMessage.error(errorMessage)
    return Promise.reject(error)
  }
)

// 封装请求方法
class Request {
  /**
   * GET请求
   */
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return service.get(url, { params, ...config })
  }

  /**
   * POST请求
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.post(url, data, config)
  }

  /**
   * PUT请求
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.put(url, data, config)
  }

  /**
   * DELETE请求
   */
  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.delete(url, config)
  }

  /**
   * PATCH请求
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.patch(url, data, config)
  }

  /**
   * 文件上传
   */
  upload<T = any>(url: string, file: File, config?: RequestConfig): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  }

  /**
   * 文件下载
   */
  download(url: string, params?: any, filename?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      service.get(url, {
        params,
        responseType: 'blob'
      }).then((response: any) => {
        const blob = new Blob([response.data])
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl

        // 从响应头获取文件名或使用传入的文件名
        const contentDisposition = response.headers['content-disposition']
        let downloadFilename = filename

        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/)
          if (filenameMatch) {
            downloadFilename = decodeURIComponent(filenameMatch[1])
          }
        }

        link.download = downloadFilename || 'download'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
        resolve()
      }).catch(reject)
    })
  }

  /**
   * 并发请求
   */
  all<T = any>(requests: Promise<T>[]): Promise<T[]> {
    return Promise.all(requests)
  }

  /**
   * 取消请求
   */
  cancelToken() {
    return axios.CancelToken.source()
  }
}

// 创建请求实例
const request = new Request()

// 导出
export default request
export { service }