#!/bin/bash

echo "🚀 Setting up Student Portal Application..."

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   You can download it from: https://www.postgresql.org/download/"
fi

echo "📦 Installing backend dependencies..."
cd backend
go mod tidy
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your PostgreSQL database"
echo "2. Copy backend/env.example to backend/.env and update the database configuration"
echo "3. Run the database initialization script: psql -f database/init.sql"
echo "4. Start the backend: cd backend && go run main.go"
echo "5. Start the frontend: cd frontend && npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8080" 