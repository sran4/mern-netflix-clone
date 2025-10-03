const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

try {
  // Install root dependencies
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Install frontend dependencies
  console.log('Installing frontend dependencies...');
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });

  // Build frontend
  console.log('Building frontend...');
  execSync('npm run build', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });

  // Verify build output
  const distPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
  if (fs.existsSync(distPath)) {
    console.log('✅ Frontend build successful!');
    console.log('✅ index.html found at:', distPath);
  } else {
    console.log('❌ Frontend build failed - index.html not found');
    process.exit(1);
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
