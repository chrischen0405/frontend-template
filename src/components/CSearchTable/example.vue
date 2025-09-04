<template>
  <div class="example-page">
    <CSearchTable title="用户管理" :data="tableData" :loading="loading" :pagination="pagination" :container-height="600"
      @search="handleSearch" @reset="handleReset" @add="handleAdd" @batch-delete="handleBatchDelete"
      @selection-change="handleSelectionChange" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <!-- 搜索插槽 -->
      <template #search="{ searchForm, handleSearch: onSearch, handleReset: onReset }">
        <el-form :model="searchForm" inline class="search-form" @submit.prevent="onSearch">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable style="width: 200px" />
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 150px">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间" prop="dateRange">
            <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width: 240px" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">
              <el-icon>
                <Search />
              </el-icon>
              搜索
            </el-button>
            <el-button @click="onReset">
              <el-icon>
                <Refresh />
              </el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <!-- 操作按钮插槽 -->
      <template #toolbar>
        <el-button type="primary" @click="handleAdd">
          <el-icon>
            <Plus />
          </el-icon>
          新增用户
        </el-button>
        <el-button type="success" @click="handleExport">
          <el-icon>
            <Download />
          </el-icon>
          导出
        </el-button>
      </template>

      <!-- 表格列定义 -->
      <template #columns>
        <el-table-column type="selection" width="50" align="center" fixed="left" />
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
        <el-table-column prop="avatar" label="头像" width="80" align="center">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" :size="40">
              {{ row.username?.charAt(0) }}
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" min-width="120" sortable />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" sortable />
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row, $index }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row, $index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </CSearchTable>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Refresh,
  Plus,
  Download
} from '@element-plus/icons-vue'
import CSearchTable from './index.vue'

// 表格数据
const tableData = ref([
  {
    id: 1,
    username: '张三',
    email: 'zhangsan@example.com',
    status: 1,
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    username: '李四',
    email: 'lisi@example.com',
    status: 0,
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    createTime: '2024-01-02 11:00:00'
  },
  {
    id: 3,
    username: '王五',
    email: 'wangwu@example.com',
    status: 1,
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
    createTime: '2024-01-03 12:00:00'
  },
  {
    id: 4,
    username: '赵六',
    email: 'zhaoliu@example.com',
    status: 1,
    avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
    createTime: '2024-01-04 13:00:00'
  }
])

// 加载状态
const loading = ref(false)

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 4
})

// 搜索处理
const handleSearch = (params: Record<string, any>) => {
  console.log('搜索参数:', params)
  loading.value = true

  // 模拟搜索请求
  setTimeout(() => {
    loading.value = false
    ElMessage.success('搜索完成')
  }, 1000)
}

// 重置处理
const handleReset = () => {
  console.log('重置搜索')
  ElMessage.info('已重置搜索条件')
}

// 新增处理
const handleAdd = () => {
  ElMessage.success('点击了新增用户')
}

// 批量删除处理
const handleBatchDelete = async (rows: any[]) => {
  console.log('批量删除:', rows)

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${rows.length} 条数据吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    ElMessage.success(`成功删除 ${rows.length} 条记录`)
  } catch {
    // 用户取消
  }
}

// 选择变化处理
const handleSelectionChange = (rows: any[]) => {
  console.log('选择变化:', rows)
}

// 分页处理
const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  console.log('页面大小改变:', size)
}

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page
  console.log('当前页改变:', page)
}

// 操作处理
const handleExport = () => {
  ElMessage.success('点击了导出')
}

const handleEdit = (row: any) => {
  ElMessage.success(`编辑用户: ${row.username}`)
}

const handleDelete = async (row: any, index: number) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${row.username}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    ElMessage.success(`删除用户: ${row.username}`)
  } catch {
    // 用户取消
  }
}
</script>

<style scoped lang="scss">
.example-page {
  padding: $spacing-lg;
}

.search-form {
  .el-form-item {
    margin-bottom: $spacing-md;
  }

  .el-form-item:last-child {
    margin-left: $spacing-md;
  }
}
</style>