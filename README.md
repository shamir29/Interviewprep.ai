# InterviewPrep AI 🚀

> **Prepare smarter. Practice what you actually need.**

InterviewPrep AI is an enterprise-grade Agentic AI Interview Preparation Platform designed for students and software engineers. It analyzes a user's resume, target job role, skills, quiz performance, weaknesses, and interview history to create personalized and adaptive technical interview preparation.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [Tech Stack](#-tech-stack)
3. [Architecture Overview](#-architecture-overview)
4. [Adaptive Learning Engine](#-adaptive-learning-engine)
5. [Project Structure](#-project-structure)
6. [Prerequisites](#-prerequisites)
7. [Getting Started Locally](#-getting-started-locally)
8. [Docker Compose Quickstart](#-docker-compose-quickstart)
9. [API Documentation](#-api-documentation)
10. [AI Agent System](#-ai-agent-system)
11. [Phased Development Roadmap](#-phased-development-roadmap)
12. [Security & Production Readiness](#-security--production-readiness)

---

## 🌟 Key Features

- 📄 **Smart Resume Extraction**: Automatic parsing of PDF resumes using Apache PDFBox + Profile Agent for skill, project, education, and role extraction.
- 🎯 **Target Role Customization**: Tailored question pools for Java Full Stack, Backend, Frontend, Data Analyst, AI Engineer, and more.
- 🧠 **Adaptive AI Learning Engine**: Dynamically re-weights quiz topics based on real-time accuracy and historical weaknesses.
- ⏱️ **Interactive Quiz Engine**: Multi-format questions (MCQ, SQL, DSA, Scenario, Code Debugging) with instant explanations.
- 🎙️ **Multi-turn AI Mock Interviews**: Dynamic conversational interview simulations with real-time follow-ups.
- 💻 **Secure Docker Sandbox Coding**: Isolated code execution for Java, Python, JavaScript, and C++ with test cases.
- 📊 **Interview Readiness Score**: Comprehensive preparation index breaking down technical accuracy, consistency, and coverage.
- 📅 **Personalized Daily Study Plans**: Actionable daily learning tasks dynamically derived from user weak points.
- ⚡ **Real-Time Agent Status via WebSocket**: Observe AI agents as they reason, select tools, validate schema, and generate content.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19 / TypeScript
- **Styling**: Tailwind CSS, PostCSS, Class Variance Authority
- **UI Components**: Lucide Icons, Radix UI Primitives, Clean SaaS Theme
- **State & Data**: TanStack Query v5, React Hook Form, Zod Validation, Recharts

### Backend
- **Runtime**: Java 21 LTS
- **Framework**: Spring Boot 3.3+
- **Security**: Spring Security 6, JWT Authentication, BCrypt Password Hashing
- **Persistence**: Spring Data JPA, Hibernate, PostgreSQL 16 with `pgvector` extension
- **Migrations**: Flyway Migration Tool
- **Cache & Message Broker**: Redis 7
- **Real-Time**: Spring WebSocket (STOMP protocol)
- **API Docs**: Springdoc OpenAPI / Swagger UI

### AI & Agents
- **AI Provider**: Google Gemini API (Structured Schema Enforcement)
- **Agent Architecture**: Multi-Agent Orchestration with deterministic tool execution & logging

---

## 📐 Architecture Overview

```
                        +----------------------------------+
                        |   Next.js 16 Client (Port 3000)   |
                        +-----------------+----------------+
                                          | HTTP / WebSocket
                                          v
                        +-----------------+----------------+
                        |  Spring Boot Backend (Port 8080) |
                        +-----------------+----------------+
                                          |
        +------------------+--------------+---------------+------------------+
        |                  |                              |                  |
        v                  v                              v                  v
+---------------+  +---------------+              +---------------+  +---------------+
|  PostgreSQL   |  |     Redis     |              |  Gemini API   |  | Docker Engine |
|  + pgvector   |  | Cache/Broker  |              |  AI Provider  |  | Code Sandbox  |
+---------------+  +---------------+              +---------------+  +---------------+
```

---

## 🧠 Adaptive Learning Engine

Unlike generic quiz apps that pick questions randomly, InterviewPrep AI uses a weighted adaptive distribution algorithm:
$$\text{Weight}(T) = f(\text{WeaknessScore}(T), \text{Recency}(T), \text{RolePriority}(T))$$

If your **DSA** accuracy is $42\%$ and your **Java** accuracy is $88\%$, the next generated quiz automatically balances your weak spots while maintaining mastery:
- **DSA**: $35\%$
- **SQL**: $20\%$
- **Java**: $15\%$
- **Spring Boot**: $15\%$
- **React**: $15\%$

---

## 📁 Project Structure

```
interviewprep-ai/
├── backend/                  # Spring Boot 3 + Java 21 Backend
│   ├── src/main/java/com/interviewprep/
│   │   ├── agent/            # AI Agent System & Orchestrator
│   │   ├── ai/               # AI Provider Interfaces & Gemini Client
│   │   ├── auth/             # Authentication & Security Controllers/Services
│   │   ├── coding/           # Code Sandbox & Evaluation
│   │   ├── common/           # Global Exceptions, Standard API Responses
│   │   ├── config/           # CORS, Security, OpenAPI, Redis Configurations
│   │   ├── health/           # Health Check Endpoints
│   │   ├── interview/        # Mock Interview System
│   │   ├── performance/      # Performance & Readiness Metrics
│   │   ├── profile/          # User Profiles
│   │   ├── question/         # Question Bank Management
│   │   ├── quiz/             # Quiz Generation & Autosave Engine
│   │   ├── resume/           # PDFBox Resume Parser
│   │   ├── studyplan/        # Personalized Study Plans
│   │   ├── user/             # User Entities & Repositories
│   │   └── weakness/         # Weakness Detection Engine
│   ├── src/main/resources/
│   │   ├── db/migration/     # Flyway SQL Scripts
│   │   ├── prompts/          # AI Agent Prompt Templates
│   │   └── application.yml   # Spring Boot Configuration
│   └── pom.xml
├── frontend/                 # Next.js 16 + React 19 Frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router Pages
│   │   ├── components/       # UI Components & SaaS Shell
│   │   ├── hooks/            # Custom React Hooks
│   │   └── lib/              # API Client & Utility Functions
│   ├── package.json
│   └── tailwind.config.ts
├── docker/                   # Dockerfiles & Database Setup
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── postgres/init-pgvector.sql
├── docs/                     # Architectural Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── AI_AGENTS.md
├── .github/workflows/ci.yml  # CI / CD Pipeline
├── docker-compose.yml        # Full-stack Container Orchestration
└── README.md
```

---

## ⚡ Prerequisites

- **Java Development Kit (JDK)**: Version 21+
- **Node.js**: Version 20+ (with npm)
- **PostgreSQL**: 16+ with `pgvector`
- **Redis**: 7+
- **Docker & Docker Compose** (Optional for containerized run)

---

## 🚀 Getting Started Locally

### 1. Backend Setup
```bash
cd backend
cp ../.env.example .env

# Build and run with Maven
./mvnw clean spring-boot:run
```
Backend will start on `http://localhost:8080`.
Swagger UI is accessible at `http://localhost:8080/swagger-ui/index.html`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on `http://localhost:3000`.

---

## 🐳 Docker Compose Quickstart

To run the entire system (PostgreSQL + pgvector, Redis, Spring Boot Backend, Next.js Frontend) in one command:

```bash
docker compose up --build
```

---

## 🔒 Security & Environment Variables

Make sure to set your Gemini API key and secure JWT secrets in your `.env` file:
```env
GEMINI_API_KEY=AIzaSy...
JWT_SECRET=super_secret_production_key_must_be_256_bits_or_longer
```

---

## 📄 License
MIT License. Built for rigorous technical interview preparation.
