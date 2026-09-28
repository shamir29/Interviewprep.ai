# AI Agent Architecture - InterviewPrep AI

## Overview
InterviewPrep AI employs a specialized Multi-Agent System where each agent has defined responsibilities, context input, structured outputs, and integrated tool access.

```
                  +--------------------------+
                  |     User / Controller    |
                  +-------------+------------+
                                |
                                v
                  +--------------------------+
                  |    Agent Orchestrator    |
                  +-------------+------------+
                                |
          +---------------------+---------------------+
          |                     |                     |
          v                     v                     v
+-------------------+ +-------------------+ +-------------------+
|   ProfileAgent    | | QuizBuilderAgent  | | EvaluationAgent   |
+-------------------+ +-------------------+ +-------------------+
          |                     |                     |
          v                     v                     v
+-------------------+ +-------------------+ +-------------------+
| WeaknessAnalyzer  | | AdaptiveLearner   | | MockInterviewer   |
+-------------------+ +-------------------+ +-------------------+
                                |
                                v
                  +--------------------------+
                  |  Execution Logging DB    |
                  | (AgentRun, ToolExecs)    |
                  +--------------------------+
```

## Agent Catalog

### 1. ProfileAgent
- **Objective**: Parse raw text extracted from PDF resumes into verified JSON structures.
- **Output**: Skills with confidence scores, work experiences, academic degrees, and recommended target roles.

### 2. QuizBuilderAgent
- **Objective**: Generate technically rigorous, multi-choice and scenario questions adhering to target topic distributions.
- **Tools**: `QuestionSearchTool`, `EmbeddingTool` (to prevent duplicate questions).

### 3. EvaluationAgent
- **Objective**: Analyze quiz submissions question-by-question, identify root-cause concept misunderstandings, and categorize error types.

### 4. WeaknessAnalyzerAgent
- **Objective**: Aggregate user history over time to calculate topic failure velocity, attempt frequency, and mastery gaps.

### 5. AdaptiveLearningAgent
- **Objective**: Compute dynamic topic distribution weights for subsequent quizzes using weakness scoring.

### 6. MockInterviewAgent
- **Objective**: Multi-turn conversational AI acting as an interviewer asking contextual follow-up questions.

### 7. CodingEvaluationAgent
- **Objective**: Review algorithmic code submissions for edge-case coverage, asymptotic time/space complexity, and code quality.
