<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <el-container>
    <el-header>
      <el-row :gutter="20" align="middle" justify="center">
        <el-col :span="12">
          <div class="logo-container">
            <a href="https://vite.dev" target="_blank">
              <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
              <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    
    <el-main>
      <HelloWorld msg="Vite + Vue + TypeScript + Element Plus" />
    </el-main>
    
    <el-footer>
      <el-text type="info">
        构建于 Vite + Vue 3 + TypeScript + Element Plus
      </el-text>
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
@use "sass:color";

.el-container {
  min-height: 100vh;
}

.el-header {
  background: linear-gradient(135deg, color.adjust($primary-color, $lightness: 20%) 0%, $primary-color 100%);
  color: white;
  text-align: center;
  line-height: 60px;
  padding: $spacing-lg 0;
  box-shadow: $box-shadow-base;
  
  @media (max-width: 767px) {
    padding: $spacing-md 0;
  }
}

.el-main {
  background-color: $bg-color;
  color: $text-color-primary;
  text-align: center;
  min-height: calc(100vh - 180px);
  padding: $spacing-xl $spacing-md;
  
  @media (max-width: 767px) {
    padding: $spacing-lg $spacing-sm;
  }
}

.el-footer {
  background: linear-gradient(135deg, $bg-color-page 0%, color.adjust($border-color, $lightness: 5%) 100%);
  color: $text-color-secondary;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid $border-color-light;
  
  .el-text {
    font-size: $font-size-small;
    font-weight: 500;
  }
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-lg;
  
  @media (max-width: 767px) {
    gap: $spacing-md;
  }
}

.logo {
  height: 6em;
  padding: $spacing-md;
  will-change: filter;
  transition: $transition-all;
  border-radius: $border-radius-base;
  
  @media (max-width: 767px) {
    height: 4em;
    padding: $spacing-sm;
  }
  
  &:hover {
    filter: drop-shadow(0 0 2em rgba(100, 108, 255, 0.6));
    transform: scale(1.05);
  }
  
  &.vue:hover {
    filter: drop-shadow(0 0 2em rgba(66, 184, 131, 0.6));
  }
}

// 添加一些动画效果
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.el-main {
  animation: fadeInUp 0.6s ease-out;
}

.logo-container {
  animation: fadeInUp 0.8s ease-out;
}
</style>
