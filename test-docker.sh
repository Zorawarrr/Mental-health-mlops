#!/bin/bash

echo "🐳 Testing Docker Setup for AI Mental Health System"
echo "=================================================="

# Check if Docker is running
echo "📋 Checking Docker status..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Test backend
echo "🧪 Testing backend API..."
if curl -f http://localhost:8000/ > /dev/null 2>&1; then
    echo "✅ Backend is responding"
else
    echo "❌ Backend is not responding"
fi

# Test frontend
echo "🧪 Testing frontend..."
if curl -f http://localhost:5173/ > /dev/null 2>&1; then
    echo "✅ Frontend is responding"
else
    echo "❌ Frontend is not responding"
fi

# Test API prediction
echo "🧪 Testing API prediction..."
if curl -X POST http://localhost:8000/predict \
    -H "Content-Type: application/json" \
    -d '{"text": "I feel happy"}' \
    -f > /dev/null 2>&1; then
    echo "✅ API prediction is working"
else
    echo "❌ API prediction is not working"
fi

echo ""
echo "🎉 Docker setup test complete!"
echo "📱 Access the application at: http://localhost:5173"
echo "🔧 Access the API at: http://localhost:8000"
echo "📚 API documentation at: http://localhost:8000/docs"
