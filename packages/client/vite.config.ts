import { defineConfig, type PluginOption } from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
   plugins: [react(), tailwindcss() as PluginOption[]],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      proxy: {
         '/api': 'http://localhost:3088',
      },
   },
});
