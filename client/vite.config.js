import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react-swc';
   import { visualizer } from 'rollup-plugin-visualizer';
   import path from 'path';

   export default defineConfig({
     plugins: [
       react(),
       visualizer({
         open: true,
       }),
     ],
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
     build: {
       chunkSizeWarningLimit: 2000,
     },
     esbuild: {
       loader: 'jsx',
       include: /src\/.*\.jsx?$/,
       exclude: [],
     },
     optimizeDeps: {
       esbuildOptions: {
         plugins: [
           {
             name: 'load-js-files-as-jsx',
             setup(build) {
               build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                 loader: 'jsx',
                 contents: await fs.readFile(args.path, 'utf8'),
               }));
             },
           },
         ],
       },
     },
   });