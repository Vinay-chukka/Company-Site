import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { projects } from './src/data/projects.js';

const entries = ['./index.html', ...projects.map(({ slug }) => './projects/' + slug + '/index.html')];

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: entries.map(entry => fileURLToPath(new URL(entry, import.meta.url))),
    },
  },
});
