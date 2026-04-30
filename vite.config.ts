import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { loadConfig, resolveClientDir } from './configs'

const clientName = process.env.CLIENT
const clientConfig = loadConfig(clientName)
const clientSrc = clientConfig
    ? path.resolve(__dirname, '..', resolveClientDir(clientConfig), 'src')
    : null

const alias: Record<string, string> = {
    '@design': path.resolve(__dirname, '../cht-design-system/src'),
    '@shared': path.resolve(__dirname, '../cht-shared/src'),
    '@client': clientSrc ?? path.resolve(__dirname, 'src/_clientStub')
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias,
    },
    define: {
        __CLIENT_CONFIG__: JSON.stringify(clientConfig ?? null)
    }
})
