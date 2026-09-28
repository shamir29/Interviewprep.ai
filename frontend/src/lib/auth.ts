export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  targetRole: string;
  token: string;
}

const STORAGE_KEY = "interviewprep_auth_user";

export const authService = {
  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return null;
  },

  setUser(user: AuthUser) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem("access_token", user.token);
  },

  logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("access_token");
  },

  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: AuthUser }> {
    // 1. Simulate fast network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !email.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }
    if (!password || password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const existingName = email.split("@")[0].replace(/[^a-zA-Z]/g, " ");
    const formattedName = existingName.charAt(0).toUpperCase() + existingName.slice(1) || "Alex Hunter";

    const user: AuthUser = {
      id: `usr-${Date.now()}`,
      fullName: formattedName,
      email: email.toLowerCase(),
      targetRole: "Java Full Stack Developer",
      token: `jwt-token-${Date.now()}-mock-auth-prod`,
    };

    this.setUser(user);
    return { success: true, message: "Signed in successfully!", user };
  },

  async register(
    fullName: string,
    email: string,
    password: string,
    targetRole: string
  ): Promise<{ success: boolean; message: string; user?: AuthUser }> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!fullName || fullName.trim().length < 2) {
      return { success: false, message: "Please enter your full name." };
    }
    if (!email || !email.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }
    if (!password || password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long." };
    }

    const user: AuthUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      targetRole: targetRole || "Java Full Stack Developer",
      token: `jwt-token-${Date.now()}-mock-auth-prod`,
    };

    this.setUser(user);
    return { success: true, message: "Account created successfully!", user };
  },
};
