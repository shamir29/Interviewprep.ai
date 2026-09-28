# REST API Specification - InterviewPrep AI

All API responses follow the standard unified response structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "errorCode": null,
  "timestamp": "2026-09-24T14:15:00Z"
}
```

## 1. System & Health
- `GET /api/health` - Check overall system health, DB connection, and memory.
- `GET /actuator/health` - Spring Boot Actuator readiness and liveness.
- `GET /swagger-ui/index.html` - Interactive Swagger API documentation.

## 2. Authentication & Authorization (`/api/auth`)
- `POST /api/auth/register` - User registration.
- `POST /api/auth/login` - User login (returns JWT access & refresh token).
- `POST /api/auth/refresh` - Refresh expired access token.
- `POST /api/auth/logout` - Invalidate active session & refresh token.

## 3. Profile Management (`/api/profile`)
- `GET /api/profile` - Fetch current user profile.
- `PUT /api/profile` - Update profile data & target role.

## 4. Resume Processing (`/api/resume`)
- `POST /api/resume/upload` - Upload PDF resume for parsing and AI skill extraction.
- `GET /api/resume` - Retrieve user's analyzed resume history.
- `DELETE /api/resume/{id}` - Remove resume record.

## 5. Quiz & Adaptive Learning (`/api/quiz`)
- `POST /api/quiz/generate` - Trigger QuizBuilderAgent with adaptive topic weights.
- `GET /api/quiz/{id}` - Retrieve active quiz state.
- `POST /api/quiz/{id}/save` - Autosave in-progress answers.
- `POST /api/quiz/{id}/submit` - Submit quiz and trigger EvaluationAgent.

## 6. Performance & Readiness (`/api/performance`)
- `GET /api/performance/overview` - Interview readiness score and metrics.
- `GET /api/performance/weaknesses` - Weak topics requiring immediate practice.
- `GET /api/performance/history` - Historical score progression.

## 7. AI Mock Interviews (`/api/mock-interview`)
- `POST /api/mock-interview/start` - Initiate AI interview session.
- `POST /api/mock-interview/{id}/respond` - Submit answer and receive dynamic follow-up.
- `POST /api/mock-interview/{id}/complete` - Finish session and generate evaluation report.

## 8. Coding Sandbox (`/api/coding`)
- `GET /api/coding/problems` - Fetch available coding questions.
- `POST /api/coding/run` - Execute code against test cases in Docker sandbox.
- `POST /api/coding/submit` - Trigger CodingEvaluationAgent for static & runtime feedback.
