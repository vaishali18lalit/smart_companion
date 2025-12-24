#!/bin/bash

echo "🚀 Setting up Smart Knowledge Companion..."

# Create environment file
echo "Creating environment file..."
cp backend/.env.example backend/.env

echo "📦 Installing backend dependencies..."
cd backend && npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install

echo "🗄️ Setting up database..."
echo "Make sure MongoDB is running, then run: node database/init.js"

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Set your API keys in backend/.env"
echo "2. Start MongoDB: mongod"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm start"
echo ""
echo "Or use Docker: docker-compose up"