@echo off
echo 🚀 Setting up Student Portal Application...

REM Check if Go is installed
go version >nul 2>&1
if errorlevel 1 (
    echo ❌ Go is not installed. Please install Go first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo 📦 Installing backend dependencies...
cd backend
go mod tidy
cd ..

echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

echo ✅ Setup complete!
echo.
echo 📋 Next steps:
echo 1. Set up your PostgreSQL database
echo 2. Copy backend/env.example to backend/.env and update the database configuration
echo 3. Run the database initialization script: psql -f database/init.sql
echo 4. Start the backend: cd backend ^&^& go run main.go
echo 5. Start the frontend: cd frontend ^&^& npm start
echo.
echo 🌐 The application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8080
pause 