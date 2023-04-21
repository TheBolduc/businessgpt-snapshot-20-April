import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      emitCss: true,
    }),
    sveltekit(),
  ],
  optimizeDeps: {
    exclude: ['businessgpt-snapshot-20-april/src/lib/components/Sidebar.svelte']
  },
};

export default config;
