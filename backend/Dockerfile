# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files (excludes items in .dockerignore)
COPY . /app/

# Create models directory if it doesn't exist
RUN mkdir -p /app/models

# Expose port
EXPOSE 8000

# Set working directory for app
WORKDIR /app

# Run the FastAPI application
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000"]
