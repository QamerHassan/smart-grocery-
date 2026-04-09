<div align="center">

# 🛒 Smart Grocery App
### *A Premium AI-Powered Microservices Shopping Experience*

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/AI-Python%20ML-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Deployment-Docker-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

---

![Smart Grocery App Banner](https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop)

</div>

## 🌟 Overview

The **Smart Grocery App** is a cutting-edge, full-stack shopping platform designed for the modern era. It leverages a robust microservices architecture to provide a seamless browsing experience, intelligent product management, and **AI-driven recommendations** tailored to individual user behavior.

Whether you're managing a complex cart or discovering new favorite products via our ML engine, the Smart Grocery App delivers luxury performance with a minimal aesthetic.

---

## 🛠️ Architecture & Tech Stack

This project is built using a **Modular Microservices Architecture**, ensuring high scalability and maintainability.

### 🎨 Frontend (Next.js 14+)
- **Framework**: React 18 with Next.js App Router.
- **Styling**: Tailwind CSS for a sleek, responsive UI.
- **State Management**: React Context API for persistent cart logic.
- **Features**: dynamic product grids, intelligent search, and a streamlined checkout flow.

### ⚡ Backend API (FastAPI)
- **Framework**: High-performance FastAPI (Python).
- **Validation**: Pydantic for robust data schemas.
- **Features**: RESTful endpoints for product catalog, order management, and cross-service communication.

### 🧠 Recommendation Engine (AI/ML)
- **Engine**: Python-based microservice using **Pandas** & **Scikit-learn**.
- **Model**: Similarity-based recommendation algorithm analyzing real order history.
- **Performance**: Lightweight microservice exposed via a dedicated API for real-time suggestions.

---

## 🚀 Key Features

| Feature | Description | Service |
| :--- | :--- | :--- |
| **Smart Cart** | Real-time cart management with local persistence. | Frontend |
| **AI Suggestions** | Personalized product recommendations based on purchase patterns. | AI Engine |
| **Modern UI** | Clean, dark-mode compatible design with optimized assets. | Frontend |
| **Fast API** | Low-latency endpoints with automatic Swagger documentation. | Backend |
| **Dockerized** | One-command deployment for the entire stack. | DevOps |

---

## 🏗️ Project Structure

```text
smart-grocery/
├── frontend/           # Next.js Application
├── backend/            # FastAPI Service
├── recommendation/     # AI/ML Microservice
└── docker-compose.yml  # Orchestration Config
```

---

## 🚦 Getting Started

### 🐳 Option 1: Running with Docker (Recommended)
The easiest way to get the entire ecosystem running is using Docker Compose.

```bash
# Clone the repository
git clone https://github.com/QamerHassan/smart-grocery-.git
cd smart-grocery-

# Spin up all services
docker-compose up --build
```
*Access the frontend at `http://localhost:3000`*

### 🛠️ Option 2: Manual Setup

#### 1. Backend Service
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### 2. Recommendation Service
```bash
cd recommendation
pip install -r requirements.txt
python main.py
```

#### 3. Frontend Service
```bash
cd frontend
npm install
npm run dev
```

---

## 📜 API Documentation

Once the backend is running, you can explore the interactive API docs:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Redoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

<div align="center">

Built with ❤️ by [Qamer Hassan](https://github.com/QamerHassan)

</div>


