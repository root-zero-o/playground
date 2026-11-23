import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = import.meta.dirname;
const projectsDir = resolve(root, 'projects');

const projectInputs = readdirSync(projectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => [entry.name, resolve(projectsDir, entry.name, 'index.html')])
  .filter(([, file]) => existsSync(file));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        ...Object.fromEntries(projectInputs),
      },
    },
  },
});
