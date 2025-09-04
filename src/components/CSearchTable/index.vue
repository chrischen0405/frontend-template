<template>
  <div class="c-search-table">
    <div class="search-table-card">
      <!-- 搜索区域 -->
      <div class="search-section" ref="searchSectionRef" v-if="showSearch && $slots.search">
        <slot name="search" :searchForm="searchForm" :handleSearch="handleSearch" :handleReset="handleReset"
          :loading="loading" />
      </div>

      <!-- 操作区域 -->
      <div class="action-section" ref="actionSectionRef" v-if="showActions">
        <div class="action-left">
          <h3 class="table-title">{{ tableTitle }}</h3>
        </div>

        <div class="action-right">
          <slot name="toolbar">
            <el-button type="primary" @click="handleAdd">
              <el-icon>
                <Plus />
              </el-icon>
              新增
            </el-button>
            <el-button type="danger" :disabled="!hasSelection" @click="handleBatchDelete">
              <el-icon>
                <Delete />
              </el-icon>
              批量删除
            </el-button>
          </slot>
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="table-section">
        <el-table ref="tableRef" v-loading="loading" :data="tableData" :height="calculatedTableHeight" :stripe="stripe"
          :border="border" :size="size" @selection-change="handleSelectionChange" @sort-change="handleSortChange"
          @row-click="handleRowClick">
          <!-- 表格列内容插槽 -->
          <slot name="columns" />
        </el-table>

        <!-- 分页 -->
        <div class="pagination-section" ref="paginationSectionRef" v-if="showPagination">
          <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
            :total="pagination.total" :page-sizes="pageSizes" :background="true"
            layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'

// 类型定义
interface Pagination {
  currentPage: number
  pageSize: number
  total: number
}

// Props
interface Props {
  // 搜索相关
  showSearch?: boolean

  // 表格相关
  data?: any[]
  loading?: boolean
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  tableTitle?: string
  containerHeight?: number | string

  // 功能开关
  showActions?: boolean
  showPagination?: boolean

  // 分页相关
  pagination?: Pagination
  pageSizes?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  showSearch: true,
  data: () => [],
  loading: false,
  stripe: true,
  border: true,
  size: 'default',
  tableTitle: '数据列表',
  containerHeight: 600,
  showActions: true,
  showPagination: true,
  pagination: () => ({
    currentPage: 1,
    pageSize: 10,
    total: 0
  }),
  pageSizes: () => [10, 20, 50, 100]
})

// Emits
const emit = defineEmits<{
  search: [params: Record<string, any>]
  reset: []
  add: []
  batchDelete: [rows: any[]]
  selectionChange: [rows: any[]]
  sortChange: [params: { prop: string; order: string | null }]
  rowClick: [row: any, column: any, event: Event]
  sizeChange: [size: number]
  currentChange: [page: number]
}>()

// 响应式数据
const tableRef = ref()
const searchForm = ref<Record<string, any>>({})
const selectedRows = ref<any[]>([])
const searchSectionRef = ref<HTMLElement>()
const actionSectionRef = ref<HTMLElement>()
const paginationSectionRef = ref<HTMLElement>()

// 计算属性
const tableData = computed(() => props.data)

const hasSelection = computed(() => selectedRows.value.length > 0)

// 计算表格高度
const calculatedTableHeight = computed(() => {
  // 如果没有传入容器高度，使用默认值
  const containerHeight = typeof props.containerHeight === 'number'
    ? props.containerHeight
    : parseInt(String(props.containerHeight)) || 600

  let usedHeight = 0

  // 计算各区域高度
  if (props.showSearch && searchSectionRef.value) {
    usedHeight += searchSectionRef.value.offsetHeight || 80
  }

  if (props.showActions && actionSectionRef.value) {
    usedHeight += actionSectionRef.value.offsetHeight || 70
  }

  if (props.showPagination && paginationSectionRef.value) {
    usedHeight += paginationSectionRef.value.offsetHeight || 50
  }

  // 卡片内边距和区域间距
  const cardPadding = 48 // 24px * 2
  const margins = (props.showSearch ? 24 : 0) + (props.showActions ? 24 : 0) + (props.showPagination ? 24 : 0)

  // 计算表格可用高度
  const tableHeight = containerHeight - usedHeight - cardPadding - margins

  // 设置最小高度
  return Math.max(200, tableHeight)
})

// 初始化搜索表单
const initSearchForm = () => {
  const form: Record<string, any> = {}
  searchForm.value = form
}

// 搜索
const handleSearch = () => {
  emit('search', { ...searchForm.value })
}

// 重置
const handleReset = () => {
  searchForm.value = {}
  emit('reset')
}

// 新增
const handleAdd = () => {
  emit('add')
}

// 批量删除
const handleBatchDelete = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedRows.value.length} 条数据吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    emit('batchDelete', selectedRows.value)
  } catch {
    // 用户取消
  }
}



// 选择变化
const handleSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
  emit('selectionChange', rows)
}

// 排序变化
const handleSortChange = ({ prop, order }: { prop: string; order: string | null }) => {
  emit('sortChange', { prop, order })
}

// 行点击
const handleRowClick = (row: any, column: any, event: Event) => {
  emit('rowClick', row, column, event)
}

// 分页大小变化
const handleSizeChange = (size: number) => {
  emit('sizeChange', size)
}

// 页码变化
const handleCurrentChange = (page: number) => {
  emit('currentChange', page)
}

// 清空选择
const clearSelection = () => {
  tableRef.value?.clearSelection()
}

// 暴露方法
defineExpose({
  clearSelection,
  getSearchForm: () => searchForm.value,
  setSearchForm: (form: Record<string, any>) => {
    searchForm.value = { ...form }
  },
  resetSearchForm: handleReset
})

onMounted(() => {
  initSearchForm()
})


</script>

<style scoped lang="scss">
@use "sass:color";

.c-search-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .search-table-card {
    flex: 1;
    display: flex;
    flex-direction: column;

    :deep(.el-card__body) {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: $spacing-lg;
    }

    // 搜索区域
    .search-section {
      flex-shrink: 0;
      margin-bottom: $spacing-lg;
      padding-bottom: $spacing-lg;
      border-bottom: 1px solid $border-color-lighter;

      .search-form {
        .el-form-item {
          margin-bottom: $spacing-md;
        }

        .el-form-item:last-child {
          margin-left: $spacing-md;
        }
      }
    }

    // 操作区域
    .action-section {
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-lg;
      padding-bottom: $spacing-lg;
      border-bottom: 1px solid $border-color-lighter;

      .action-left {
        display: flex;
        align-items: center;

        .table-title {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: $text-color-primary;
        }
      }

      .action-right {
        display: flex;
        gap: $spacing-sm;
      }
    }

    // 表格区域
    .table-section {
      flex: 1;
      display: flex;
      flex-direction: column;

      .el-table {
        // 高度由 props.tableHeight 控制
      }

      .pagination-section {
        flex-shrink: 0;
        display: flex;
        justify-content: flex-end;
        margin-top: $spacing-lg;
        padding-top: $spacing-lg;
        border-top: 1px solid $border-color-lighter;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .c-search-table {
    .search-table-card {
      .search-section {
        .search-form {
          .el-form-item {
            width: 100%;

            .el-input,
            .el-select,
            .el-date-picker {
              width: 100% !important;
            }
          }
        }
      }

      .action-section {
        flex-direction: column;
        gap: $spacing-md;
        align-items: stretch;

        .action-left,
        .action-right {
          width: 100%;
          justify-content: center;
        }
      }

      .table-section {
        .pagination-section {
          justify-content: center;
        }
      }
    }
  }
}
</style>