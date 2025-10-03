@echo off
echo Starting build process...

REM Install root dependencies
echo Installing root dependencies...
npm install

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
npm install
npm run build
cd ..

echo Build completed successfully!
