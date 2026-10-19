import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/Digital_Twin/' : '/',
  build: {
    chunkSizeWarningLimit: 1200,
  },
});

