# CSearchTable 组件

一个功能丰富的表格组件，支持搜索、分页、排序、批量操作等功能。

## 特性

- ✅ 支持自定义搜索表单（插槽方式）
- ✅ 支持表格数据展示和分页
- ✅ 支持行选择和批量操作
- ✅ 支持自定义操作按钮
- ✅ 支持自定义列内容渲染（插槽方式）
- ✅ 支持响应式设计
- ✅ **智能高度计算**: 组件会根据容器高度自动计算表格高度
- ✅ 完整的 TypeScript 支持

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | `any[]` | `[]` | 表格数据 |
| loading | `boolean` | `false` | 加载状态 |
| showSearch | `boolean` | `true` | 是否显示搜索区域 |
| showActions | `boolean` | `true` | 是否显示操作区域 |
| showPagination | `boolean` | `true` | 是否显示分页 |
| pagination | `Pagination` | - | 分页配置 |
| stripe | `boolean` | `true` | 是否为斑马纹表格 |
| border | `boolean` | `true` | 是否带有纵向边框 |
| size | `'large' \| 'default' \| 'small'` | `'default'` | 表格尺寸 |
| tableTitle | `string` | `'数据列表'` | 表格标题 |
| containerHeight | `number \| string` | `600` | 父容器高度（像素值） |
| pageSizes | `number[]` | `[10, 20, 50, 100]` | 每页显示个数选择器的选项 |

## 插槽 (Slots)

### search
自定义搜索表单

**插槽参数：**
- `searchForm`: 搜索表单数据对象
- `handleSearch`: 搜索处理函数
- `handleReset`: 重置处理函数
- `loading`: 加载状态

```vue
<template #search="{ searchForm, handleSearch, handleReset, loading }">
  <el-form :model="searchForm" :inline="true">
    <el-form-item label="用户名">
      <el-input v-model="searchForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch" :loading="loading">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
```

### toolbar
自定义操作按钮区域

```vue
<template #toolbar>
  <el-button type="primary" @click="handleAdd">新增</el-button>
  <el-button type="success" @click="handleExport">导出</el-button>
</template>
```

### columns
自定义表格列定义，支持直接使用 `el-table-column` 组件

```vue
<template #columns>
  <el-table-column type="selection" width="50" align="center" fixed="left" />
  <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
  <el-table-column prop="username" label="用户名" min-width="120" sortable />
  <el-table-column prop="email" label="邮箱" min-width="150" />
  <el-table-column prop="status" label="状态" width="80">
    <template #default="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column label="操作" width="200" fixed="right" align="center">
    <template #default="{ row, $index }">
      <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
      <el-button type="danger" size="small" @click="handleDelete(row, $index)">删除</el-button>
    </template>
  </el-table-column>
</template>
```

## 事件 (Events)

| 事件名 | 参数 | 说明 |
|--------|------|------|
| search | `params: Record<string, any>` | 搜索事件 |
| reset | - | 重置事件 |
| add | - | 新增事件 |
| batchDelete | `rows: any[]` | 批量删除事件 |
| selectionChange | `rows: any[]` | 选择变化事件 |
| sortChange | `{ prop: string; order: string \| null }` | 排序变化事件 |
| rowClick | `row: any, column: any, event: Event` | 行点击事件 |
| sizeChange | `size: number` | 分页大小变化事件 |
| currentChange | `page: number` | 页码变化事件 |

## 暴露的方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| clearSelection | - | 清空选择 |
| getSearchForm | - | 获取搜索表单数据 |
| setSearchForm | `form: Record<string, any>` | 设置搜索表单数据 |
| resetSearchForm | - | 重置搜索表单 |

## 使用示例

```vue
<template>
  <CSearchTable
    title="用户管理"
    :data="tableData"
    :loading="loading"
    :pagination="pagination"
    :container-height="600"
    @search="handleSearch"
    @reset="handleReset"
    @add="handleAdd"
    @batch-delete="handleBatchDelete"
    @selection-change="handleSelectionChange"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
    <!-- 自定义搜索表单 -->
    <template #search="{ searchForm, handleSearch: onSearch, handleReset: onReset }">
      <el-form :model="searchForm" inline @submit.prevent="onSearch">
        <el-form-item label="用户名">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>

    <!-- 自定义操作按钮 -->
    <template #toolbar>
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
      <el-button type="success" @click="handleExport">导出</el-button>
    </template>

    <!-- 表格列定义 -->
    <template #columns>
      <el-table-column type="selection" width="50" align="center" fixed="left" />
      <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
      <el-table-column prop="username" label="用户名" min-width="120" sortable />
      <el-table-column prop="email" label="邮箱" min-width="150" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right" align="center">
        <template #default="{ row, $index }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </CSearchTable>
</template>
```

## 使用注意事项

### 容器高度设置

组件支持通过 `containerHeight` 属性设置父容器高度，组件会自动计算表格高度：

**计算公式：**
```
表格高度 = 容器高度 - 搜索区域高度 - 操作区域高度 - 分页区域高度 - 内边距和间距
```

**使用方式：**
```vue
<template>
  <!-- 固定高度 -->
  <CSearchTable :container-height="600" :data="tableData">
    <template #columns>
      <!-- 表格列定义 -->
    </template>
  </CSearchTable>
  
  <!-- 动态高度 -->
  <CSearchTable :container-height="windowHeight - 100" :data="tableData">
    <template #columns>
      <!-- 表格列定义 -->
    </template>
  </CSearchTable>
  
  <!-- 自适应高度 -->
  <div class="page-container" style="height: 100vh;">
    <div class="header" style="height: 60px;"><!-- 头部内容 --></div>
    <CSearchTable :container-height="'calc(100vh - 60px)'" :data="tableData">
      <template #columns>
        <!-- 表格列定义 -->
      </template>
    </CSearchTable>
  </div>
</template>
```

**优势：**
- 自动计算表格高度，无需手动计算各区域高度
- 父组件只需关心容器总高度，简化使用
- 组件内部智能处理各区域的显示/隐藏状态

### 表格列定义规范

组件使用插槽方式定义表格列，提供最大的灵活性：

1. **选择列和序号列**：由父组件根据需要自行添加
2. **操作列**：直接在 `columns` 插槽中定义，支持完全自定义
3. **数据列**：支持所有 `el-table-column` 的功能和属性
4. **自定义渲染**：通过 `template #default` 实现列内容的自定义渲染

## 类型定义

### Pagination

```typescript
interface Pagination {
  currentPage: number        // 当前页码
  pageSize: number          // 每页显示条数
  total: number             // 总条数
}
```
