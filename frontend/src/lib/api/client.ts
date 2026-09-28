import { ApiResponse, HealthStatus } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers || {}),
        },
      });

      const data: ApiResponse<T> = await res.json();

      if (!res.ok && !data.success) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }

      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Network error. Please check backend connection.",
        data: null as unknown as T,
        errorCode: "NETWORK_ERROR",
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Health
  async getHealth(): Promise<ApiResponse<HealthStatus>> {
    return this.request<HealthStatus>("/health");
  }
}

export const api = new ApiClient();
