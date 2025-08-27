<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1 class="login-title">欢迎登录</h1>
        <p class="login-subtitle">请输入您的账号信息</p>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        size="large"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="login-footer">
        <p>还没有账号？<el-link type="primary" :underline="false">立即注册</el-link></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

// 路由实例
const router = useRouter()

// 响应式数据
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    // 验证表单
    await loginFormRef.value.validate()
    
    loading.value = true
    
    // 模拟登录API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里应该调用实际的登录API
    console.log('登录数据:', loginForm)
    
    ElMessage.success('登录成功！')
    
    // 登录成功后的跳转逻辑
    router.push('/dashboard')
    
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@use "sass:color";

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: $spacing-md;
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: $bg-color;
  border-radius: $border-radius-base * 2;
  box-shadow: $box-shadow-light;
  padding: $spacing-xl;
}

.login-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  
  .login-title {
    font-size: $font-size-extra-large + 8px;
    font-weight: 600;
    color: $text-color-primary;
    margin-bottom: $spacing-sm;
  }
  
  .login-subtitle {
    font-size: $font-size-base;
    color: $text-color-secondary;
    margin: 0;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: $spacing-lg;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .el-input {
    --el-input-height: 48px;
    --el-input-font-size: #{$font-size-base};
  }
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .el-checkbox {
    --el-checkbox-font-size: #{$font-size-small};
  }
  
  .el-link {
    font-size: $font-size-small;
  }
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: $font-size-base;
  font-weight: 500;
  border-radius: $border-radius-base;
}

.login-footer {
  text-align: center;
  margin-top: $spacing-lg;
  
  p {
    font-size: $font-size-small;
    color: $text-color-secondary;
    margin: 0;
    
    .el-link {
      font-size: $font-size-small;
      margin-left: $spacing-xs;
    }
  }
}

// 响应式设计
@media (max-width: 480px) {
  .login-container {
    padding: $spacing-sm;
  }
  
  .login-box {
    padding: $spacing-lg;
  }
  
  .login-header {
    .login-title {
      font-size: $font-size-large;
    }
  }
}
</style>