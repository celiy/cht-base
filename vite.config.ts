import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@design': path.resolve(__dirname, '../cht-design-system/src'),
            '@shared': path.resolve(__dirname, '../cht-shared/src')
        },
    },
})
