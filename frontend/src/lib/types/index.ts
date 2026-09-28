export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
  timestamp: string;
}

export interface HealthStatus {
  status: string;
  applicationName: string;
  version: string;
  environment: string;
  timestamp: string;
  components: {
    database: {
      status: string;
      databaseProductName?: string;
      error?: string;
    };
    jvm: {
      maxMemoryMb: number;
      totalMemoryMb: number;
      usedMemoryMb: number;
    };
  };
}

export interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  phone?: string;
  college?: string;
  degree?: string;
  graduationYear?: number;
  experienceLevel: string;
  targetRole: string;
  preferredTechnologies?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface PerformanceOverview {
  interviewReadiness: number;
  totalQuestionsSolved: number;
  overallAccuracy: number;
  currentStreak: number;
}

export type QuestionType = "MCQ" | "SQL" | "DSA" | "SCENARIO" | "DEBUGGING" | "APTITUDE" | "LOGICAL";
export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface QuestionOption {
  id: string;
  text: string;
  explanation?: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  topic: string;
  difficulty: Difficulty;
  codeSnippet?: string;
  codeLanguage?: string;
  options?: QuestionOption[];
  correctOptionId?: string;
  correctExplanation: string;
  schemaDetails?: string;
  testCases?: Array<{ input: string; expectedOutput: string }>;
  userAnswer?: string;
  isFlagged?: boolean;
}

export interface QuizSession {
  id: string;
  title: string;
  targetRole: string;
  topicBreakdown: Record<string, number>;
  questions: Question[];
  totalTimeMinutes: number;
  timeRemainingSeconds: number;
  status: "IN_PROGRESS" | "COMPLETED" | "PAUSED";
  score?: number;
  totalQuestions: number;
  correctAnswersCount?: number;
  createdAt: string;
  completedAt?: string;
  weaknessesAddressed?: string[];
}

export interface WeaknessMetric {
  topic: string;
  domain: string;
  accuracy: number;
  questionsAttempted: number;
  weightInNextQuiz: number;
  trend: "improving" | "declining" | "stagnant";
  recommendedAction: string;
}

export interface MockInterviewMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  category?: "behavioral" | "technical" | "system-design" | "followup";
  feedback?: {
    score: number;
    clarity: string;
    strengths: string[];
    improvements: string[];
  };
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  initialCode: Record<string, string>;
  testCases: Array<{
    id: string;
    input: string;
    expectedOutput: string;
    isLocked?: boolean;
  }>;
}

export interface StudyPlanDay {
  day: number;
  title: string;
  focusDomain: string;
  estimatedMinutes: number;
  completed: boolean;
  tasks: Array<{
    id: string;
    title: string;
    type: "quiz" | "coding" | "interview" | "reading";
    duration: string;
    completed: boolean;
    link: string;
  }>;
}

export interface AgentActivityLog {
  id: string;
  timestamp: string;
  agentName: "QuizBuilderAgent" | "ProfileAgent" | "EvaluationAgent" | "CodingSandboxAgent";
  action: string;
  model: string;
  tokenCount: number;
  latencyMs: number;
  status: "SUCCESS" | "RUNNING" | "RETRY";
  details: string;
}
