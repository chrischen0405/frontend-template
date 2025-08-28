<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">{{ pageTitle }}</h2>
      <p class="page-description">{{ pageDescription }}</p>
    </div>
    
    <div class="page-content">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="content-card">
            <template #header>
              <div class="card-header">
                <span>{{ cardTitle }}</span>
                <el-button type="primary" size="small">
                  <el-icon><Plus /></el-icon>
                  新增
                </el-button>
              </div>
            </template>
            
            <div class="card-content">
              <el-empty 
                :description="`${pageTitle}功能正在开发中...`"
                :image-size="120"
              >
                <el-button type="primary" @click="goBack">
                  返回仪表板
                </el-button>
              </el-empty>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 根据路由获取页面信息
const pageInfo = computed(() => {
  const path = route.path
  const infoMap: Record<string, { title: string; description: string; cardTitle: string }> = {
    '/dashboard': {
      title: '仪表板',
      description: '系统概览和数据统计',
      cardTitle: '概览信息'
    },
    '/users/list': {
      title: '用户列表',
      description: '管理系统中的所有用户',
      cardTitle: '用户信息'
    },
    '/users/roles': {
      title: '角色管理',
      description: '配置用户角色和权限',
      cardTitle: '角色配置'
    },
    '/content/articles': {
      title: '文章管理',
      description: '管理系统中的文章内容',
      cardTitle: '文章列表'
    },
    '/content/categories': {
      title: '分类管理',
      description: '管理文章和内容分类',
      cardTitle: '分类配置'
    },
    '/settings': {
      title: '系统设置',
      description: '配置系统参数和选项',
      cardTitle: '设置选项'
    }
  }
  
  return infoMap[path] || {
    title: '页面',
    description: '页面描述',
    cardTitle: '内容'
  }
})

const pageTitle = computed(() => pageInfo.value.title)
const pageDescription = computed(() => pageInfo.value.description)
const cardTitle = computed(() => pageInfo.value.cardTitle)

const goBack = () => {
  router.push('/dashboard')
}
</script>

<style scoped lang="scss">
.page-container {
  height: 100%;
}

.page-header {
  margin-bottom: $spacing-xl;
  
  .page-title {
    font-size: $font-size-extra-large;
    font-weight: 600;
    color: $text-color-primary;
    margin: 0 0 $spacing-sm 0;
  }
  
  .page-description {
    font-size: $font-size-base;
    color: $text-color-secondary;
    margin: 0;
    line-height: 1.6;
  }
}

.content-card {
  min-height: 400px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    span {
      font-weight: 600;
      font-size: $font-size-medium;
    }
  }
  
  .card-content {
    padding: $spacing-xl 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .page-header {
    margin-bottom: $spacing-lg;
    
    .page-title {
      font-size: $font-size-large;
    }
  }
  
  .content-card {
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-sm;
    }
  }
}
</style>