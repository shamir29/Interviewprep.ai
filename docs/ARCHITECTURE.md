# Architecture Documentation - InterviewPrep AI

## 1. System Design Principles

InterviewPrep AI is built following clean architectural patterns:
- **Separation of Concerns**: Strict boundary between Presentation (Next.js), Application Logic (Spring Services), Data Access (Spring Repositories), and AI Agents.
- **Package-by-Feature**: Backend domain code is structured around functional capabilities (e.g. `quiz`, `resume`, `weakness`, `mockinterview`) rather than purely by layer.
- **Fail-Safe AI Integration**: AI agent outputs are never directly executed or saved without schema validation, fallback mechanisms, and strict typed parsing.
- **Stateless Authentication**: JWT tokens with refresh token rotation backed by database persistence and revocation checking.

```
+-----------------------------------------------------------------------------------+
|                                 Next.js 16 Client                                 |
|  - React 19 App Router   - TanStack Query v5    - React Hook Form + Zod           |
|  - Tailwind CSS + UI     - Lucide Icons         - WebSocket STOMP Client          |
+------------------------------------------+----------------------------------------+
                                           | HTTP (REST) / WSS (STOMP)
                                           v
+-----------------------------------------------------------------------------------+
|                             Spring Boot 3.3 Backend                               |
|                                                                                   |
|  [ Controllers / WebSocket Endpoints ]                                            |
|        │                                                                          |
|        ▼                                                                          |
|  [ Application Services & Orchestrators ]                                         |
|        │                                                                          |
|        ├───────────────┬─────────────────┬───────────────────┐                    |
|        ▼               ▼                 ▼                   ▼                    |
|  [ Repositories ] [ Agent Engine ] [ Docker Sandbox ]  [ Cache Manager ]          |
+--------+---------------+--------+----------------+-------------------+------------+
         |                        |                                    |
         v                        v                                    v
+-----------------+      +-----------------+                  +-----------------+
|   PostgreSQL    |      |   Gemini API    |                  |      Redis      |
|   + pgvector    |      |  (Structured)   |                  |  Cache & Broker |
+-----------------+      +-----------------+                  +-----------------+
```

## 2. Database Schema Strategy

All data models utilize:
- **UUID Primary Keys** for distributed identity and public exposure.
- **Audit Columns**: `created_at` and `updated_at` timestamps on every entity.
- **Foreign Key Constraints** and index definitions on commonly filtered attributes (e.g. `user_id`, `topic`, `difficulty`).
- **pgvector Extension**: 768-dimensional embeddings for question similarity and semantic resume matching.

## 3. Real-Time Communication

The platform uses Spring WebSocket with STOMP over SockJS to stream:
- Agent lifecycle progression (`RUNNING`, `VALIDATING`, `COMPLETED`, `FAILED`).
- Active interview turns during mock interviews.
- Code execution stdout/stderr streams.
