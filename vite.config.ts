import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'types/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/theme.scss" as *;
          `,
        },
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
      open: env.VITE_APP_OPEN_BROWSER === 'true',
      host: true,
    },
    build: {
      sourcemap: env.VITE_APP_ENV === 'development',
      minify: env.VITE_APP_ENV === 'production' ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            elementPlus: ['element-plus'],
          },
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify({
        pkg: {
          name: env.VITE_APP_TITLE,
          version: env.VITE_APP_VERSION,
          description: env.VITE_APP_DESCRIPTION,
        },
        buildTime: new Date().toISOString(),
      }),
    },
  }
})
