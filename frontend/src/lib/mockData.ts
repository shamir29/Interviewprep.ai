import {
  QuizSession,
  Question,
  WeaknessMetric,
  CodingProblem,
  StudyPlanDay,
  AgentActivityLog,
  MockInterviewMessage,
} from "./types";

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q-1",
    title: "Java Memory Model & Volatile Keyword",
    description: "In Java multithreading, what is the exact visibility guarantee provided when a variable is declared as `volatile`?",
    type: "MCQ",
    topic: "Java Concurrency",
    difficulty: "MEDIUM",
    options: [
      { id: "opt-1", text: "It guarantees both atomicity of compound operations and read/write visibility across threads." },
      { id: "opt-2", text: "It guarantees that reads and writes are made directly to main memory, establishing a happens-before relationship without providing atomicity for compound operations." },
      { id: "opt-3", text: "It forces the JVM to synchronize all methods on that object instance automatically." },
      { id: "opt-4", text: "It prevents deadlocks by locking the object header in the JVM heap." },
    ],
    correctOptionId: "opt-2",
    correctExplanation: "`volatile` in Java guarantees memory visibility and prevents instruction reordering via happens-before semantics, but operations like `count++` (read-modify-write) are not atomic and still need `AtomicInteger` or explicit synchronization.",
  },
  {
    id: "q-2",
    title: "SQL Nth Highest Salary with Window Functions",
    description: "Given an `employees` table with columns `(id, department_id, name, salary)`, write a SQL query to find the 2nd highest salary in each department.",
    type: "SQL",
    topic: "SQL & Databases",
    difficulty: "MEDIUM",
    codeLanguage: "sql",
    codeSnippet: `SELECT department_id, salary
FROM (
  SELECT department_id, salary,
         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_num
  FROM employees
) ranked
WHERE rank_num = 2;`,
    schemaDetails: "Table employees (id INT PRIMARY KEY, department_id INT, name VARCHAR(100), salary NUMERIC(10,2))",
    correctExplanation: "`DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)` avoids skipping rank numbers on duplicate salaries, returning the exact second distinct salary per department.",
  },
  {
    id: "q-3",
    title: "Spring Boot Transactional Propagation",
    description: "Suppose Method A is annotated with `@Transactional(propagation = Propagation.REQUIRED)` and calls Method B in a separate Spring Bean which is annotated with `@Transactional(propagation = Propagation.REQUIRES_NEW)`. What happens if Method B throws an unhandled RuntimeException?",
    type: "MCQ",
    topic: "Spring Boot",
    difficulty: "HARD",
    options: [
      { id: "opt-1", text: "Both transactions commit because they run in independent threads." },
      { id: "opt-2", text: "Method B's transaction rolls back. If Method A catches the exception, Method A can still commit its own transaction successfully." },
      { id: "opt-3", text: "Method A automatically rolls back even if it catches the exception, due to the TransactionManager marking rollbackOnly." },
      { id: "opt-4", text: "Spring throws an NestedTransactionNotSupportedException at runtime." },
    ],
    correctOptionId: "opt-2",
    correctExplanation: "`REQUIRES_NEW` suspends the outer transaction and creates an entirely separate physical transaction. If Method B fails and rolls back, but Method A catches the exception and handles it, Method A's outer transaction can still commit.",
  },
  {
    id: "q-4",
    title: "Debug NullPointerException in ConcurrentHashMap",
    description: "Identify the defect in this thread-safe cache snippet:",
    type: "DEBUGGING",
    topic: "Java Core",
    difficulty: "EASY",
    codeLanguage: "java",
    codeSnippet: `public class UserCache {
    private final Map<String, User> cache = new ConcurrentHashMap<>();

    public void putUser(String userId, User user) {
        // Bug area
        cache.put(userId, user);
    }
}`,
    options: [
      { id: "opt-1", text: "ConcurrentHashMap throws NullPointerException if either key or value is null; it does not permit null keys or null values." },
      { id: "opt-2", text: "ConcurrentHashMap is not thread-safe and requires SynchronizedMap wrapper." },
      { id: "opt-3", text: "The map must be static to prevent deadlocks." },
      { id: "opt-4", text: "User object must implement Serializable." },
    ],
    correctOptionId: "opt-1",
    correctExplanation: "Unlike standard HashMap, `ConcurrentHashMap` explicitly forbids both `null` keys and `null` values and immediately throws `NullPointerException` to eliminate ambiguity in concurrent lookups.",
  },
  {
    id: "q-5",
    title: "System Design: Rate Limiting Algorithm",
    description: "You need to implement an API rate limiter that allows a burst of up to 100 requests per second, while steadily refilling at 20 tokens per second without dropping sudden spikes. Which algorithm is best suited?",
    type: "SCENARIO",
    topic: "System Design",
    difficulty: "MEDIUM",
    options: [
      { id: "opt-1", text: "Fixed Window Counter" },
      { id: "opt-2", text: "Token Bucket Algorithm" },
      { id: "opt-3", text: "Sliding Window Log" },
      { id: "opt-4", text: "Exponential Backoff" },
    ],
    correctOptionId: "opt-2",
    correctExplanation: "The Token Bucket algorithm allows configurable bursts up to the bucket capacity while sustaining a steady replenishment rate, making it the industry standard for API gateways.",
  },
  {
    id: "q-6",
    title: "Quantitative Aptitude: Time and Work",
    description: "A can complete a software module in 12 days, and B can complete the same module in 18 days. If they work together for 4 days, what fraction of the module remains uncompleted?",
    type: "APTITUDE",
    topic: "Quantitative Aptitude",
    difficulty: "EASY",
    options: [
      { id: "opt-1", text: "4/9" },
      { id: "opt-2", text: "5/9" },
      { id: "opt-3", text: "2/3" },
      { id: "opt-4", text: "7/18" },
    ],
    correctOptionId: "opt-1",
    correctExplanation: "A's 1-day work = 1/12. B's 1-day work = 1/18. Together in 1 day = 1/12 + 1/18 = 5/36. In 4 days = 4 × (5/36) = 20/36 = 5/9 of work done. Remaining work = 1 - 5/9 = 4/9.",
  },
  {
    id: "q-7",
    title: "Logical Reasoning: Syllogisms & Logic",
    description: "Statements:\n1. All algorithms are programs.\n2. Some programs are automated.\n\nConclusions:\nI. Some algorithms are automated.\nII. Some automated entities are programs.",
    type: "LOGICAL",
    topic: "Logical Reasoning",
    difficulty: "MEDIUM",
    options: [
      { id: "opt-1", text: "Only conclusion I follows" },
      { id: "opt-2", text: "Only conclusion II follows" },
      { id: "opt-3", text: "Both I and II follow" },
      { id: "opt-4", text: "Neither I nor II follows" },
    ],
    correctOptionId: "opt-2",
    correctExplanation: "Since 'Some programs are automated' is an I-type proposition, its simple conversion 'Some automated entities are programs' is logically valid (Conclusion II). There is no universal intersection linking all algorithms to automation directly, so only Conclusion II follows.",
  },
  {
    id: "q-8",
    title: "Quantitative Aptitude: Probability & Combinations",
    description: "In an engineering team of 5 backend developers and 4 frontend developers, a committee of 3 developers is selected at random. What is the probability that exactly 2 are backend developers?",
    type: "APTITUDE",
    topic: "Quantitative Aptitude",
    difficulty: "MEDIUM",
    options: [
      { id: "opt-1", text: "10/21" },
      { id: "opt-2", text: "5/14" },
      { id: "opt-3", text: "15/28" },
      { id: "opt-4", text: "20/42" },
    ],
    correctOptionId: "opt-1",
    correctExplanation: "Total ways to choose 3 from 9 = 9C3 = (9×8×7)/(3×2×1) = 84. Ways to choose 2 backend (from 5) and 1 frontend (from 4) = 5C2 × 4C1 = 10 × 4 = 40. Probability = 40/84 = 10/21.",
  },
];

export const INITIAL_QUIZ_SESSION: QuizSession = {
  id: "quiz-adaptive-101",
  title: "Adaptive Java & Cloud Full-Stack Assessment",
  targetRole: "Java Full Stack Developer",
  topicBreakdown: {
    "Java Concurrency": 30,
    "SQL & Databases": 25,
    "Spring Boot": 20,
    "Java Core": 15,
    "System Design": 10,
  },
  questions: SAMPLE_QUESTIONS,
  totalTimeMinutes: 15,
  timeRemainingSeconds: 900,
  status: "IN_PROGRESS",
  totalQuestions: 5,
  createdAt: new Date().toISOString(),
  weaknessesAddressed: ["Java Concurrency", "SQL Window Functions"],
};

export const SAMPLE_WEAKNESSES: WeaknessMetric[] = [
  {
    topic: "Java Multithreading & Memory Model",
    domain: "Java Core",
    accuracy: 42,
    questionsAttempted: 18,
    weightInNextQuiz: 35,
    trend: "improving",
    recommendedAction: "Review volatile, synchronized, and java.util.concurrent locks.",
  },
  {
    topic: "SQL Window Functions & Indexing",
    domain: "Databases",
    accuracy: 54,
    questionsAttempted: 24,
    weightInNextQuiz: 25,
    trend: "stagnant",
    recommendedAction: "Practice DENSE_RANK, PARTITION BY, and Composite B-Tree indexes.",
  },
  {
    topic: "Spring Transactional Propagation",
    domain: "Spring Framework",
    accuracy: 62,
    questionsAttempted: 15,
    weightInNextQuiz: 20,
    trend: "improving",
    recommendedAction: "Review REQUIRES_NEW, isolation levels, and rollbackOnly semantics.",
  },
  {
    topic: "React 19 Hooks & Server Components",
    domain: "Frontend",
    accuracy: 85,
    questionsAttempted: 30,
    weightInNextQuiz: 10,
    trend: "improving",
    recommendedAction: "Solid mastery. Keep reviewing transition hooks and suspense boundaries.",
  },
  {
    topic: "Microservices Resiliency & Rate Limiting",
    domain: "System Design",
    accuracy: 70,
    questionsAttempted: 12,
    weightInNextQuiz: 10,
    trend: "declining",
    recommendedAction: "Practice Token Bucket, Leaky Bucket, and Resilience4j circuit breakers.",
  },
];

export const SAMPLE_STUDY_PLAN: StudyPlanDay[] = [
  {
    day: 1,
    title: "Concurrency & Lock Free Data Structures",
    focusDomain: "Java Backend",
    estimatedMinutes: 45,
    completed: true,
    tasks: [
      { id: "t1", title: "Review volatile vs AtomicInteger and CAS operations", type: "reading", duration: "15 min", completed: true, link: "/study-plan/reading/concurrency" },
      { id: "t2", title: "Solve 5 Concurrency Debugging Questions", type: "quiz", duration: "15 min", completed: true, link: "/quiz" },
      { id: "t3", title: "Implement Thread-Safe LRU Cache in Java", type: "coding", duration: "15 min", completed: true, link: "/coding" },
    ],
  },
  {
    day: 2,
    title: "SQL Window Functions & Complex Queries",
    focusDomain: "PostgreSQL & Database Optimization",
    estimatedMinutes: 40,
    completed: false,
    tasks: [
      { id: "t4", title: "Practice Nth Highest Salary & Running Totals", type: "quiz", duration: "20 min", completed: false, link: "/quiz" },
      { id: "t5", title: "Deep dive: EXPLAIN ANALYZE & B-Tree Scan types", type: "reading", duration: "20 min", completed: false, link: "/study-plan/reading/sql-indexes" },
    ],
  },
  {
    day: 3,
    title: "Spring Boot Microservices & Mock Interview",
    focusDomain: "Architecture & Behavioral",
    estimatedMinutes: 50,
    completed: false,
    tasks: [
      { id: "t6", title: "Complete 15-minute AI Mock Interview: Spring & Distributed Systems", type: "interview", duration: "20 min", completed: false, link: "/mock-interview" },
      { id: "t7", title: "Solve 10 Adaptive Questions on Transaction Management", type: "quiz", duration: "20 min", completed: false, link: "/quiz" },
      { id: "t8", title: "Review feedback report from AI Interviewer", type: "reading", duration: "10 min", completed: false, link: "/mock-interview" },
    ],
  },
];

export const SAMPLE_CODING_PROBLEMS: CodingProblem[] = [
  {
    id: "p-1",
    title: "Two Sum - Target Pair Indices",
    difficulty: "EASY",
    category: "Array & Hash Table",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution.",
    initialCode: {
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Implement O(n) hash map approach
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        lookup = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in lookup:
                return [lookup[diff], i]
            lookup[num] = i
        return []`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    },
    testCases: [
      { id: "tc-1", input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { id: "tc-2", input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { id: "tc-3", input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
    ],
  },
  {
    id: "p-2",
    title: "LRU Cache (Least Recently Used)",
    difficulty: "HARD",
    category: "Design & Doubly Linked List",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.",
    initialCode: {
      java: `class LRUCache {
    private final int capacity;
    private final Map<Integer, Node> map;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
    }
    
    public int get(int key) {
        return map.getOrDefault(key, new Node(-1, -1)).val;
    }
    
    public void put(int key, int value) {
        // Implement O(1) eviction
    }
    
    static class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { this.key = k; this.val = v; }
    }
}`,
      python: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.cap = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}`,
    },
    testCases: [
      { id: "tc-1", input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]', expectedOutput: "[null, null, null, 1, null, -1, null, -1, 3, 4]" },
    ],
  },
];

export const SAMPLE_AGENT_LOGS: AgentActivityLog[] = [
  {
    id: "log-1",
    timestamp: "10 seconds ago",
    agentName: "QuizBuilderAgent",
    action: "Generated adaptive 5-question pool with weighted distribution",
    model: "gemini-1.5-pro",
    tokenCount: 842,
    latencyMs: 1240,
    status: "SUCCESS",
    details: "Adjusted weights: Java Concurrency +15% due to past 42% accuracy score.",
  },
  {
    id: "log-2",
    timestamp: "2 minutes ago",
    agentName: "ProfileAgent",
    action: "Extracted 14 technical skills & 3 full-stack projects from resume PDF",
    model: "gemini-1.5-flash",
    tokenCount: 1420,
    latencyMs: 890,
    status: "SUCCESS",
    details: "Found: Spring Boot, Kafka, PostgreSQL, Docker, React, AWS ECS.",
  },
  {
    id: "log-3",
    timestamp: "5 minutes ago",
    agentName: "EvaluationAgent",
    action: "Evaluated mock interview voice response for System Design",
    model: "gemini-1.5-pro",
    tokenCount: 650,
    latencyMs: 1430,
    status: "SUCCESS",
    details: "Candidate highlighted CAP theorem tradeoff effectively. Recommended deeper dive on partition tolerance.",
  },
];
