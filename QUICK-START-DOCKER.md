# 🐳 Docker Quick Start Guide

## 🚀 One-Command Setup

```bash
# Clone and start everything
git clone <your-repo>
cd mental-health-mlops
docker-compose up --build
```

## 🌐 Access Points

After running `docker-compose up --build`:

- **Frontend Dashboard**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## ✅ What's Fixed

The Docker setup now properly handles:
- ✅ **Internal networking**: Frontend connects to `http://backend:8000`
- ✅ **External access**: Backend accessible at `http://localhost:8000`
- ✅ **Environment variables**: `VITE_API_URL` correctly configured
- ✅ **API integration**: All components use `ApiService`
- ✅ **Production ready**: Nginx serves frontend efficiently

## 🧪 Test Commands

```bash
# Test backend API
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel happy"}'

# Test frontend
curl http://localhost:5173/
```

## 🛠️ Development Workflow

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild specific service
docker-compose build frontend
docker-compose up --force-recreate frontend
```

## 🎯 Expected Behavior

1. **Docker containers start** on same network
2. **Frontend builds** and serves via Nginx
3. **Backend loads** ML models and starts API
4. **User accesses** dashboard at localhost:5173
5. **Frontend calls** backend at http://backend:8000
6. **Backend processes** requests and returns predictions
7. **Dashboard updates** with real AI results

**The system is now fully containerized and production-ready!** 🎉
