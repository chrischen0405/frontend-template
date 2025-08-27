<template>
  <el-container>
    <el-header>
      <div class="header-content">
        <h1 class="site-title">Frontend Template</h1>
        <div class="user-menu">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              用户菜单
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="settings">设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    
    <el-main>
      <div class="dashboard-content">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="welcome-card">
              <template #header>
                <div class="card-header">
                  <span>欢迎使用</span>
                </div>
              </template>
              <div class="welcome-content">
                <div class="logo-container">
                  <a href="https://vite.dev" target="_blank">
                    <img src="/vite.svg" class="logo" alt="Vite logo" />
                  </a>
                  <a href="https://vuejs.org/" target="_blank">
                    <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
                  </a>
                </div>
                <h2>Vite + Vue + TypeScript + Element Plus</h2>
                <p>这是一个现代化的前端开发模板</p>
                <el-button type="primary" @click="goToLogin">
                  返回登录页
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="8">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon><vue-logo /></el-icon>
                  <span>Vue 3</span>
                </div>
              </template>
              <p>使用最新的 Vue 3 Composition API</p>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon><setting /></el-icon>
                  <span>TypeScript</span>
                </div>
              </template>
              <p>完整的 TypeScript 类型支持</p>
            </el-card>
          </el-col>
          
          <el-col :span="8">
            <el-card class="feature-card">
              <template #header>
                <div class="card-header">
                  <el-icon><element-plus /></el-icon>
                  <span>Element Plus</span>
                </div>
              </template>
              <p>丰富的 UI 组件库</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
    
    <el-footer>
      <div class="footer-content">
        <el-text type="info">
          构建于 Vite + Vue 3 + TypeScript + Element Plus
        </el-text>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

// 处理用户菜单命令
const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人资料功能开发中')
      break
    case 'settings':
      ElMessage.info('设置功能开发中')
      break
    case 'logout':
      ElMessage.success('已退出登录')
      router.push('/login')
      break
  }
}

// 返回登录页
const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
@use "sass:color";

.el-container {
  min-height: 100vh;
}

.el-header {
  background: linear-gradient(135deg, color.adjust($primary-color, $lightness: 20%) 0%, $primary-color 100%);
  color: white;
  padding: 0 $spacing-lg;
  box-shadow: $box-shadow-base;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  
  .site-title {
    margin: 0;
    font-size: $font-size-large;
    font-weight: 600;
  }
  
  .user-menu {
    .el-dropdown-link {
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: $font-size-base;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.el-main {
  background-color: $bg-color-page;
  padding: $spacing-xl;
  min-height: calc(100vh - 120px);
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-card {
  .card-header {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: $font-size-medium;
  }
  
  .welcome-content {
    text-align: center;
    padding: $spacing-xl 0;
    
    h2 {
      margin: $spacing-lg 0;
      color: $text-color-primary;
      font-size: $font-size-extra-large;
    }
    
    p {
      color: $text-color-secondary;
      margin-bottom: $spacing-xl;
      font-size: $font-size-medium;
    }
  }
}

.feature-card {
  .card-header {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-weight: 600;
    
    .el-icon {
      color: $primary-color;
    }
  }
  
  p {
    color: $text-color-secondary;
    margin: $spacing-md 0 0 0;
    line-height: 1.6;
  }
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;
  margin-bottom: $spacing-lg;
}

.logo {
  height: 4em;
  padding: $spacing-sm;
  will-change: filter;
  transition: $transition-all;
  border-radius: $border-radius-base;
  
  &:hover {
    filter: drop-shadow(0 0 2em rgba(100, 108, 255, 0.6));
    transform: scale(1.05);
  }
  
  &.vue:hover {
    filter: drop-shadow(0 0 2em rgba(66, 184, 131, 0.6));
  }
}

.el-footer {
  background: $bg-color;
  border-top: 1px solid $border-color-light;
  padding: 0;
  
  .footer-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    .el-text {
      font-size: $font-size-small;
      font-weight: 500;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .el-main {
    padding: $spacing-lg;
  }
  
  .header-content {
    .site-title {
      font-size: $font-size-medium;
    }
  }
  
  .welcome-content {
    h2 {
      font-size: $font-size-large;
    }
  }
  
  .logo {
    height: 3em;
  }
}
</style>