// Build script as alternative to vite command
const { build } = require('vite');
const react = require('@vitejs/plugin-react');

(async () => {
  try {
    console.log('🏗️ Starting Vite build programmatically...');
    
    await build({
      plugins: [react()],
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild'
      }
    });
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
})();
