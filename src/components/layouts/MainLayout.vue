<template>
  <el-container class="main-layout">
    <!-- 左侧菜单 -->
    <el-aside :width="isCollapse ? '64px' : '250px'" class="sidebar" :class="{ 'is-collapse': isCollapse }">
      <div class="sidebar-header">
        <div class="logo">
          <el-icon class="logo-icon">
            <Management />
          </el-icon>
          <span class="logo-text">管理系统</span>
        </div>
      </div>
      
      <div class="sidebar-content">
        <el-menu
          :default-active="activeMenuIndex"
          class="sidebar-menu"
          router
          :collapse="isCollapse"
          unique-opened
          background-color="transparent"
          text-color="#ffffff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/dashboard">
            <el-icon><House /></el-icon>
            <span>仪表板</span>
          </el-menu-item>
          
          <el-sub-menu index="user">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users/list">
              <el-icon><UserFilled /></el-icon>
              <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="/users/roles">
              <el-icon><Avatar /></el-icon>
              <span>角色管理</span>
            </el-menu-item>
          </el-sub-menu>
          
          <el-sub-menu index="content">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>内容管理</span>
            </template>
            <el-menu-item index="/content/articles">
              <el-icon><Reading /></el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="/content/categories">
              <el-icon><Folder /></el-icon>
              <span>分类管理</span>
            </el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="/settings">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    
    <!-- 右侧内容区域 -->
    <el-container class="main-content">
      <!-- 顶部导航栏 -->
      <el-header class="main-header">
        <div class="header-left">
          <el-button 
            class="collapse-btn" 
            type="text" 
            @click="toggleCollapse"
          >
            <el-icon>
              <Expand v-if="isCollapse" />
              <Fold v-else />
            </el-icon>
          </el-button>
          
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item 
              v-for="item in breadcrumbList" 
              :key="item.path"
              :to="item.path"
            >
              {{ item.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <el-space>
            <el-tooltip content="全屏" placement="bottom">
              <el-button type="text" @click="toggleFullscreen">
                <el-icon><FullScreen /></el-icon>
              </el-button>
            </el-tooltip>
            
            <el-dropdown @command="handleUserCommand">
              <span class="user-dropdown">
                <el-avatar :size="32" :icon="UserFilled" />
                <span class="username">管理员</span>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">
                    <el-icon><User /></el-icon>
                    个人资料
                  </el-dropdown-item>
                  <el-dropdown-item command="settings">
                    <el-icon><Setting /></el-icon>
                    账户设置
                  </el-dropdown-item>
                  <el-dropdown-item divided command="logout">
                    <el-icon><SwitchButton /></el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </div>
      </el-header>
      
      <!-- 主要内容区域 -->
      <el-main class="page-content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Management,
  House,
  User,
  UserFilled,
  Avatar,
  Document,
  Reading,
  Folder,
  Setting,
  Expand,
  Fold,
  FullScreen,
  ArrowDown,
  SwitchButton
} from '@element-plus/icons-vue'

// 路由相关
const router = useRouter()
const route = useRoute()

// 响应式数据
const isCollapse = ref(false)

// 当前激活的菜单项
const activeMenuIndex = computed(() => route.path)

// 面包屑导航
const breadcrumbList = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  
  const breadcrumbs = matched.map(item => ({
    path: item.path,
    title: item.meta?.title || '未知页面'
  }))
  
  // 如果没有匹配到，添加默认的面包屑
  if (breadcrumbs.length === 0) {
    breadcrumbs.push({
      path: route.path,
      title: getPageTitle(route.path)
    })
  }
  
  return breadcrumbs
})

// 根据路径获取页面标题
const getPageTitle = (path: string): string => {
  const titleMap: Record<string, string> = {
    '/dashboard': '仪表板',
    '/users/list': '用户列表',
    '/users/roles': '角色管理',
    '/content/articles': '文章管理',
    '/content/categories': '分类管理',
    '/settings': '系统设置'
  }
  
  return titleMap[path] || '页面'
}

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 切换全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    ElMessage.success('已进入全屏模式')
  } else {
    document.exitFullscreen()
    ElMessage.info('已退出全屏模式')
  }
}

// 处理用户菜单命令
const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人资料功能开发中')
      break
    case 'settings':
      ElMessage.info('账户设置功能开发中')
      break
    case 'logout':
      ElMessage.success('已退出登录')
      router.push('/login')
      break
  }
}

// 监听路由变化，自动设置页面标题
watch(
  () => route.path,
  (newPath) => {
    const title = getPageTitle(newPath)
    document.title = `${title} - 管理系统`
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
@use "sass:color";

.main-layout {
  height: 100vh;
  width: 100%;
}

// 左侧边栏样式
.sidebar {
  background: linear-gradient(180deg, $primary-color 0%, color.adjust($primary-color, $lightness: -15%) 100%);
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  position: relative;
  z-index: 1001;
  overflow: hidden;
  
  &.is-collapse {
    .sidebar-header {
      padding: 0 $spacing-sm;
      
      .logo {
        justify-content: center;
        
        .logo-text {
          display: none;
        }
        
        .logo-icon {
          margin-right: 0;
        }
      }
    }
  }
  
  .sidebar-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid color.adjust($primary-color, $lightness: -20%);
    padding: 0 $spacing-lg;
    
    .logo {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 600;
      font-size: $font-size-large;
      
      .logo-icon {
        font-size: 24px;
        margin-right: $spacing-sm;
      }
      
      .logo-text {
        white-space: nowrap;
      }
    }
  }
  
  .sidebar-content {
    height: calc(100% - 60px);
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: color.adjust($primary-color, $lightness: -20%);
      border-radius: 2px;
    }
  }
  
  .sidebar-menu {
    border: none;
    
    // 折叠状态下的菜单样式
    &.el-menu--collapse {
      .el-sub-menu__title {
        padding: 0 20px !important;
        
        .el-icon {
          margin-right: 0 !important;
        }
      }
      
      .el-menu-item {
        padding: 0 20px !important;
        
        .el-icon {
          margin-right: 0 !important;
        }
      }
      
      // 折叠状态下确保所有图标都显示
      .el-icon {
        display: inline-flex !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
    }
    
    // 一级菜单项样式
    :deep(.el-menu-item) {
      color: rgba(255, 255, 255, 0.8);
      
      .el-icon {
        margin-right: 8px;
        font-size: 16px;
      }
      
      &:hover {
        background-color: color.adjust($primary-color, $lightness: -10%);
        color: white;
      }
      
      &.is-active {
        background-color: color.adjust($primary-color, $lightness: -20%);
        color: #ffd04b;
        
        .el-icon {
          color: #ffd04b;
        }
        
        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: #ffd04b;
        }
      }
    }
    
    // 子菜单标题样式
    :deep(.el-sub-menu__title) {
      color: rgba(255, 255, 255, 0.8);
      
      .el-icon {
        margin-right: 8px;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
      }
      
      &:hover {
        background-color: color.adjust($primary-color, $lightness: -10%);
        color: white;
        
        .el-icon {
          color: white;
        }
      }
    }
    
    // 二级菜单项样式
    :deep(.el-sub-menu .el-menu-item) {
      background-color: color.adjust($primary-color, $lightness: -10%);
      color: rgba(255, 255, 255, 0.7);
      
      .el-icon {
        margin-right: 8px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
      }
      
      &:hover {
        background-color: color.adjust($primary-color, $lightness: -15%);
        color: white;
        
        .el-icon {
          color: white;
        }
      }
      
      &.is-active {
        background-color: color.adjust($primary-color, $lightness: -25%);
        color: #ffd04b;
        
        .el-icon {
          color: #ffd04b;
        }
      }
    }
    
    // 确保所有图标都正确显示
    :deep(.el-icon) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }
  }
}

// 右侧主内容区域
.main-content {
  display: flex;
  flex-direction: column;
  background-color: $bg-color-page;
}

// 顶部导航栏
.main-header {
  background: $bg-color;
  border-bottom: 1px solid $border-color-light;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 0 $spacing-lg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-left {
    display: flex;
    align-items: center;
    
    .collapse-btn {
      margin-right: $spacing-lg;
      font-size: 18px;
      
      &:hover {
        background-color: $bg-color-page;
      }
    }
    
    .breadcrumb {
      :deep(.el-breadcrumb__item) {
        .el-breadcrumb__inner {
          color: $text-color-secondary;
          font-weight: 400;
          
          &:hover {
            color: $primary-color;
          }
        }
        
        &:last-child .el-breadcrumb__inner {
          color: $text-color-primary;
          font-weight: 500;
        }
      }
    }
  }
  
  .header-right {
    .user-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-base;
      transition: $transition-all;
      
      &:hover {
        background-color: $bg-color-page;
      }
      
      .username {
        margin: 0 $spacing-sm;
        font-weight: 500;
        color: $text-color-primary;
      }
    }
  }
}

// 主要内容区域
.page-content {
  flex: 1;
  padding: $spacing-lg;
  overflow: hidden; // 防止内容溢出
  
  .content-wrapper {
    height: 100%; // 固定为父容器高度
    background: $bg-color;
    border-radius: $border-radius-base;
    box-shadow: $box-shadow-light;
    padding: $spacing-lg;
    overflow-y: hidden; // 允许纵向滚动
    box-sizing: border-box; // 确保padding不会增加总高度
  }
}

// 响应式设计
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100vh;
    z-index: 1001;
  }
  
  .main-header {
    padding: 0 $spacing-md;
    
    .header-left {
      .breadcrumb {
        display: none;
      }
    }
  }
  
  .page-content {
    padding: $spacing-md;
    
    .content-wrapper {
      padding: $spacing-md;
    }
  }
}
</style>