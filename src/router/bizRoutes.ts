import { RouteRecordRaw } from "vue-router";

const bizRoutes: RouteRecordRaw[] = [
  {
    path: '/content/articles',
    name: 'Articles',
    component: () => import('@b/components/common/PageTemplate.vue'),
    meta: {
      title: '文章管理'
    }
  },
  {
    path: '/content/categories',
    name: 'Categories',
    component: () => import('@b/components/common/PageTemplate.vue'),
    meta: {
      title: '分类管理'
    }
  },
]

export default bizRoutes;