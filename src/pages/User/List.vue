<template>
  <div ref="pageRef" class="user-list-page">
    <CSearchTable title="用户管理" :data="tableData" :loading="loading" :pagination="pagination"
      :container-height="tableContainerHeight" @search="handleSearch" @reset="handleReset" @add="handleAdd"
      @batch-delete="handleBatchDelete" @selection-change="handleSelectionChange" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
      <!-- 搜索表单插槽 -->
      <template #search="{ searchForm, handleSearch: onSearch, handleReset: onReset }">
        <el-form :model="searchForm" inline @submit.prevent="onSearch">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable style="width: 200px" />
          </el-form-item>

          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable style="width: 200px" />
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="searchForm.email" placeholder="请输入邮箱" clearable style="width: 200px" />
          </el-form-item>

          <el-form-item label="角色">
            <el-select v-model="searchForm.role" placeholder="请选择角色" clearable style="width: 150px">
              <el-option label="管理员" value="admin" />
              <el-option label="编辑者" value="editor" />
              <el-option label="用户" value="user" />
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable style="width: 120px">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item label="创建时间">
            <el-date-picker v-model="searchForm.createTime" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width: 240px" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">
              搜索
            </el-button>
            <el-button @click="onReset">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </template>

      <template #columns>
        <el-table-column type="selection" width="50" align="center" fixed="left" />
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
        <el-table-column prop="avatar" label="头像" width="80" align="center">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar" :icon="UserFilled" />
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80" sortable />
        <el-table-column prop="username" label="用户名" min-width="120" sortable />
        <el-table-column prop="name" label="姓名" min-width="100" />
        <el-table-column prop="email" label="邮箱" min-width="150" />
        <el-table-column prop="phone" label="手机号" min-width="120" />
        <el-table-column prop="role" label="角色" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="150" sortable>
          <template #default="{ row }">
            <span>{{ formatDate(row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row, $index }">
            <el-button type="primary" size="small" @click="handleView(row)">
              查看
            </el-button>
            <el-button type="success" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row, $index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </CSearchTable>

    <!-- 用户详情对话框 -->
    <el-dialog v-model="detailVisible" title="用户详情" width="600px" :before-close="handleCloseDetail">
      <div v-if="currentUser" class="user-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户ID">
            {{ currentUser.id }}
          </el-descriptions-item>
          <el-descriptions-item label="用户名">
            {{ currentUser.username }}
          </el-descriptions-item>
          <el-descriptions-item label="姓名">
            {{ currentUser.name }}
          </el-descriptions-item>
          <el-descriptions-item label="邮箱">
            {{ currentUser.email }}
          </el-descriptions-item>
          <el-descriptions-item label="手机号">
            {{ currentUser.phone }}
          </el-descriptions-item>
          <el-descriptions-item label="角色">
            {{ currentUser.role }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(currentUser.status)">
              {{ getStatusText(currentUser.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ formatDate(currentUser.createTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="最后登录时间">
            {{ formatDate(currentUser.lastLoginTime || '') }}
          </el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">
            {{ currentUser.remark || '无' }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 用户编辑对话框 -->
    <el-dialog v-model="editVisible" :title="isEdit ? '编辑用户' : '新增用户'" width="600px" :before-close="handleCloseEdit">
      <el-form ref="editFormRef" :model="editForm" :rules="editRules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="editForm.username" placeholder="请输入用户名" :disabled="isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="editForm.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="角色" prop="role">
              <el-select v-model="editForm.role" placeholder="请选择角色">
                <el-option label="管理员" value="admin" />
                <el-option label="编辑者" value="editor" />
                <el-option label="用户" value="user" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="editForm.status" placeholder="请选择状态">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注">
          <el-input v-model="editForm.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import CSearchTable from '@/components/CSearchTable/index.vue'

// 类型定义
interface User {
  id: number
  username: string
  name: string
  email: string
  phone: string
  role: string
  status: number
  avatar?: string
  createTime: string
  lastLoginTime?: string
  remark?: string
}

// 响应式数据
const loading = ref(false)
const saveLoading = ref(false)
const detailVisible = ref(false)
const editVisible = ref(false)
const isEdit = ref(false)
const editFormRef = ref()
const pageRef = ref<HTMLElement>()

const currentUser = ref<User | null>(null)
const selectedRows = ref<User[]>([])

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 编辑表单
const editForm = reactive({
  id: 0,
  username: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  status: 1,
  remark: ''
})

// 计算表格容器高度
const tableContainerHeight = computed(() => {
  if (!pageRef.value) {
    // 如果容器还没有挂载，返回一个默认值
    return 600
  }

  // 获取容器元素的高度
  const rect = pageRef.value.getBoundingClientRect()
  // 减去容器的内边距 (24px * 2)
  return rect.height - 48
})

// 表格数据
const tableData = ref<User[]>([])

// 表单验证规则
const editRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}

// 获取用户列表
const getUserList = async (params = {}) => {
  loading.value = true

  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟数据
    const mockData: User[] = [
      {
        id: 1,
        username: 'admin',
        name: '管理员',
        email: 'admin@example.com',
        phone: '13800138000',
        role: 'admin',
        status: 1,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        createTime: '2024-01-01 10:00:00',
        lastLoginTime: '2024-08-29 09:00:00',
        remark: '系统管理员'
      },
      {
        id: 2,
        username: 'editor',
        name: '编辑者',
        email: 'editor@example.com',
        phone: '13800138001',
        role: 'editor',
        status: 1,
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        createTime: '2024-01-02 10:00:00',
        lastLoginTime: '2024-08-28 14:30:00',
        remark: '内容编辑'
      },
      {
        id: 3,
        username: 'user1',
        name: '用户一',
        email: 'user1@example.com',
        phone: '13800138002',
        role: 'user',
        status: 0,
        createTime: '2024-01-03 10:00:00',
        remark: '普通用户'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
      {
        id: 4,
        username: 'user2',
        name: '用户二',
        email: 'user2@example.com',
        phone: '13800138003',
        role: 'user',
        status: 1,
        createTime: '2024-01-04 10:00:00',
        lastLoginTime: '2024-08-27 16:20:00'
      },
    ]

    tableData.value = mockData
    pagination.total = mockData.length

  } catch (error) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = (params: Record<string, any>) => {
  console.log('搜索参数:', params)
  pagination.currentPage = 1
  getUserList(params)
}

// 重置
const handleReset = () => {
  console.log('重置搜索')
  pagination.currentPage = 1
  getUserList()
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  Object.assign(editForm, {
    id: 0,
    username: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 1,
    remark: ''
  })
  editVisible.value = true
}

// 批量删除
const handleBatchDelete = async (rows: User[]) => {
  console.log('批量删除:', rows)

  // 模拟删除操作
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(`成功删除 ${rows.length} 条记录`)
    getUserList()
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 刷新
const handleRefresh = () => {
  getUserList()
}

// 选择变化
const handleSelectionChange = (rows: User[]) => {
  selectedRows.value = rows
}

// 分页大小变化
const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  getUserList()
}

// 页码变化
const handleCurrentChange = (page: number) => {
  pagination.currentPage = page
  getUserList()
}

// 查看用户详情
const handleView = (row: User) => {
  currentUser.value = row
  detailVisible.value = true
}

// 编辑用户
const handleEdit = (row: User) => {
  isEdit.value = true
  Object.assign(editForm, row)
  editVisible.value = true
}

// 删除用户
const handleDelete = async (row: User, index: number) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${row.name}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 模拟删除操作
    await new Promise(resolve => setTimeout(resolve, 500))
    ElMessage.success('删除成功')
    getUserList()

  } catch {
    // 用户取消
  }
}

// 保存用户
const handleSave = async () => {
  try {
    await editFormRef.value?.validate()

    saveLoading.value = true

    // 模拟保存操作
    await new Promise(resolve => setTimeout(resolve, 1000))

    ElMessage.success(isEdit.value ? '更新成功' : '创建成功')
    editVisible.value = false
    getUserList()

  } catch (error) {
    console.error('表单验证失败:', error)
  } finally {
    saveLoading.value = false
  }
}

// 关闭详情对话框
const handleCloseDetail = () => {
  detailVisible.value = false
  currentUser.value = null
}

// 关闭编辑对话框
const handleCloseEdit = () => {
  editVisible.value = false
  editFormRef.value?.resetFields()
}

// 工具函数
const getStatusType = (status: number) => {
  return status === 1 ? 'success' : 'danger'
}

const getStatusText = (status: number) => {
  return status === 1 ? '启用' : '禁用'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('zh-CN')
}

// 初始化
onMounted(async () => {
  await nextTick() // 等待DOM渲染完成
  getUserList()
})
</script>

<style scoped lang="scss">
.user-list-page {
  height: 100%;
  box-sizing: border-box;

  .user-detail {
    .el-descriptions {
      :deep(.el-descriptions__label) {
        font-weight: 600;
      }
    }
  }
}
</style>
