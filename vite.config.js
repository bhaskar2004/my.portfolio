import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
                    'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
                    'vendor-markdown': ['react-markdown', 'remark-gfm']
                }
            }
        },
        chunkSizeWarningLimit: 1000,
    },
    server: {
        port: 5173,
        open: true,
    },
})
