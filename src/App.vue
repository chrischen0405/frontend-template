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

<style scoped>
.el-header {
  background-color: #f5f7fa;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 20px 0;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  min-height: calc(100vh - 180px);
  padding: 20px;
}

.el-footer {
  background-color: #f5f7fa;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
