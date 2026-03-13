# AI Mental Health System - Docker Setup

## 🐳 Docker Deployment Guide

This guide explains how to run the complete AI Mental Health system using Docker containers.

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose installed
- Git (to clone the repository)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mental-health-mlops
```

### 2. Environment Configuration
```bash
# Copy environment file
cp .env.example .env

# Edit if needed (optional)
nano .env
```

### 3. Build and Run with Docker
```bash
# Build all containers
docker-compose build

# Start the system
docker-compose up

# Or build and start in one command
docker-compose up --build
```

### 4. Access the Application
- **Frontend Dashboard**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🛠️ Docker Commands

### Development
```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Management
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Restart services
docker-compose restart
```

### Maintenance
```bash
# View running containers
docker-compose ps

# Execute commands in container
docker-compose exec backend bash
docker-compose exec frontend sh

# View resource usage
docker stats
```

## 📁 Project Structure

```
mental-health-mlops/
├── backend/
│   ├── Dockerfile              # Backend container configuration
│   └── api/
│       └── app.py             # FastAPI application
├── aurasense-ai/
│   ├── Dockerfile              # Frontend container configuration
│   ├── nginx.conf              # Nginx configuration
│   └── src/                    # React application
├── models/                     # ML model files
├── docker-compose.yml          # Container orchestration
├── .env.example               # Environment variables template
└── requirements.txt           # Python dependencies
```

## 🔧 Configuration

### Backend Dockerfile
- **Base Image**: Python 3.11 slim
- **Port**: 8000
- **Server**: Uvicorn FastAPI
- **Health Check**: HTTP endpoint check

### Frontend Dockerfile
- **Build Stage**: Node.js 18 Alpine
- **Production Stage**: Nginx Alpine
- **Port**: 80 (mapped to 5173)
- **Server**: Nginx with SPA routing

### Docker Compose Services
- **backend**: FastAPI API server
- **frontend**: React dashboard with Nginx
- **Network**: Custom bridge network
- **Volumes**: Model files and code mounting

## 🌐 Network Configuration

### Service Communication
- Frontend communicates with backend via HTTP
- Backend API: `http://backend:8000` (internal)
- Backend API: `http://localhost:8000` (external)
- Frontend: `http://localhost:5173`

### Environment Variables
- `VITE_API_URL`: Backend API URL
- `PYTHONPATH`: Python path for backend

## 🏥 Health Checks

### Backend Health Check
```bash
curl http://localhost:8000/
```
Expected: `{"message":"Mental Health AI System Running"}`

### Frontend Health Check
```bash
curl http://localhost:5173/
```
Expected: HTML response with React app

## 🔄 Development Workflow

### Making Changes
1. Edit source code
2. Rebuild specific service:
   ```bash
   docker-compose build backend
   docker-compose up --force-recreate backend
   ```

### Adding Dependencies
1. Update `requirements.txt` (backend) or `package.json` (frontend)
2. Rebuild the affected service
3. Restart containers

### Debugging
```bash
# View container logs
docker-compose logs backend

# Access container shell
docker-compose exec backend bash

# Monitor real-time logs
docker-compose logs -f
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Change ports in `docker-compose.yml`
   - Check what's using ports: `netstat -tulpn`

2. **Build Failures**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild from scratch: `docker-compose build --no-cache`

3. **Container Won't Start**
   - Check logs: `docker-compose logs <service>`
   - Verify environment variables
   - Check file permissions

4. **API Connection Issues**
   - Verify backend is running: `curl http://localhost:8000/`
   - Check network connectivity
   - Review CORS configuration

### Performance Issues
- Monitor resource usage: `docker stats`
- Scale services: `docker-compose up --scale backend=2`
- Optimize Docker images: Use multi-stage builds

## 📦 Production Deployment

### Environment Variables
```bash
# Production environment
NODE_ENV=production
VITE_API_URL=https://your-domain.com/api
```

### Security Considerations
- Use secrets for sensitive data
- Implement HTTPS
- Configure firewall rules
- Regular security updates

### Monitoring
- Implement logging aggregation
- Set up monitoring dashboards
- Configure alerting

## 🎯 API Usage

### Test the System
```bash
# Test backend API
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel happy today"}'

# Expected response
{
  "input": "I feel happy today",
  "prediction": "Positive"
}
```

## 📞 Support

For issues with Docker setup:
1. Check container logs
2. Verify Docker installation
3. Review this documentation
4. Check GitHub issues

---

**Note**: This Docker setup maintains all existing functionality while providing containerized deployment for better portability and scalability.
