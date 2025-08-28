<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <h1 class="dashboard-title">欢迎使用管理系统</h1>
      <p class="dashboard-subtitle">这是一个现代化的前端开发模板</p>
    </div>
    
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
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card class="feature-card">
            <template #header>
              <div class="card-header">
                <el-icon><Setting /></el-icon>
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
                <el-icon><Setting /></el-icon>
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
                <el-icon><Setting /></el-icon>
                <span>Element Plus</span>
              </div>
            </template>
            <p>丰富的 UI 组件库</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
@use "sass:color";

.dashboard-page {
  height: 100%;
}

.dashboard-header {
  margin-bottom: $spacing-xl;
  text-align: center;
  
  .dashboard-title {
    font-size: $font-size-extra-large + 4px;
    font-weight: 600;
    color: $text-color-primary;
    margin: 0 0 $spacing-sm 0;
  }
  
  .dashboard-subtitle {
    font-size: $font-size-medium;
    color: $text-color-secondary;
    margin: 0;
    line-height: 1.6;
  }
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

// 响应式设计
@media (max-width: 768px) {
  .dashboard-header {
    .dashboard-title {
      font-size: $font-size-large;
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