import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  base: '/Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        privacy: resolve(__dirname, 'privacyPolice.html'),
        terms: resolve(__dirname, 'terms.html'),
        singleBlog: resolve(__dirname, 'single-blog.html'),
        singleBlog2: resolve(__dirname, 'single-blog-2.html'),
      }
    }
  }
});