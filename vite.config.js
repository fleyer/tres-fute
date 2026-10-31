import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [preact(), tailwindcss()],
    define: {
      'process.env.APPLICATION_TITLE': JSON.stringify(env.APPLICATION_TITLE),
    },
    css: {
      modules: { localsConvention: 'camelCase' },
    },
    server: { port: 8080 },
  }
})
