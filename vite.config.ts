import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
          passes: 3,
          arrows: true,
          arguments: true,
          booleans: true,
          dead_code: true,
          evaluate: true,
          join_vars: true,
          loops: true,
          reduce_vars: true,
          unused: true,
          collapse_vars: true,
          inline: true
        },
        mangle: {
          safari10: true,
          toplevel: true
        },
        format: {
          comments: false
        }
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Split React into smaller chunks
              if (id.includes('react-dom')) {
                return 'react-dom';
              }
              if (id.includes('react/') && !id.includes('react-dom')) {
                return 'react';
              }
              if (id.includes('react-router')) {
                return 'react-router';
              }
              if (id.includes('@supabase')) {
                return 'supabase';
              }
              if (id.includes('framer-motion')) {
                return 'framer';
              }
              if (id.includes('emoji-picker-react')) {
                return 'emoji-picker';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              if (id.includes('date-fns')) {
                return 'date';
              }
              if (id.includes('react-hot-toast')) {
                return 'toast';
              }
              return 'vendor';
            }
            // Split large component groups
            if (id.includes('src/pages/')) {
              return 'pages';
            }
            if (id.includes('src/components/Forum/')) {
              return 'forum';
            }
            if (id.includes('src/components/Chat/')) {
              return 'chat';
            }
            if (id.includes('src/components/Reviews/')) {
              return 'reviews';
            }
          },
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            } else if (/woff|woff2/.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          experimentalMinChunkSize: 15000
        }
      },
      chunkSizeWarningLimit: 600,
      reportCompressedSize: false,
      sourcemap: false
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@supabase/supabase-js',
        'date-fns',
        'lucide-react'
      ],
      exclude: ['emoji-picker-react', 'framer-motion']
    },
    server: {
      hmr: {
        overlay: false
      }
    }
  };
});
