import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        tsconfigPaths: true // ✅ native support
    },
    build: {
        outDir: 'build'
    }
});
