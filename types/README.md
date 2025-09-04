# Types 文件夹

此文件夹用于存放项目的 TypeScript 类型声明文件 (.d.ts)

## 文件说明

- `auto-imports.d.ts` - 由 unplugin-auto-import 自动生成的类型声明
- `components.d.ts` - 由 unplugin-vue-components 自动生成的组件全局类型声明
- `env.d.ts` - Vite 和 Vue 的环境类型声明

## 注意事项

- `auto-imports.d.ts` 和 `components.d.ts` 会在构建时自动更新
- 不要手动编辑自动生成的文件
- `env.d.ts` 可以根据项目需要手动维护