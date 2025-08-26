<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus, Link, Document, Star } from '@element-plus/icons-vue'

defineProps<{
  msg: string
}>()

const count = ref(0)
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h1>{{ msg }}</h1>
      </div>
    </template>
    
    <div class="card-content">
      <el-row :gutter="20" justify="center">
        <el-col :span="12">
          <el-button-group>
            <el-button type="primary" @click="count++" :icon="Plus">
              增加 {{ count }}
            </el-button>
            <el-button type="danger" @click="count > 0 && count--" :icon="Minus">
              减少
            </el-button>
          </el-button-group>
        </el-col>
      </el-row>
      
      <el-divider></el-divider>
      
      <el-alert
        title="开发提示"
        type="info"
        description="编辑 components/HelloWorld.vue 来测试热重载功能"
        show-icon
        :closable="false"
      >
      </el-alert>
      
      <el-divider></el-divider>
      
      <el-space direction="vertical" size="large">
        <el-link href="https://vuejs.org/guide/quick-start.html#local" target="_blank" type="primary">
          <el-icon><Link /></el-icon>
          查看 create-vue 官方 Vue + Vite 启动模板
        </el-link>
        
        <el-link 
          href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" 
          target="_blank" 
          type="success"
        >
          <el-icon><Document /></el-icon>
          了解更多 Vue 开发工具支持
        </el-link>
        
        <el-link href="https://element-plus.org/" target="_blank" type="warning">
          <el-icon><Star /></el-icon>
          Element Plus 组件库文档
        </el-link>
      </el-space>
    </div>
  </el-card>
  
  <el-tag class="read-the-docs" type="info">
    点击 Vite 和 Vue 图标了解更多
  </el-tag>
</template>

<style scoped>
.box-card {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header h1 {
  margin: 0;
  color: #409eff;
}

.card-content {
  padding: 20px 0;
}

.read-the-docs {
  margin-top: 20px;
  display: block;
  text-align: center;
}
</style>
