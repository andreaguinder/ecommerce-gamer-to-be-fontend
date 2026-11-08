import { ENDPOINTS, TOKEN_KEY, USER_KEY } from "./config";
import { getToken, http } from "./http";

export interface User {
  email: string;
  name?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const data = await http<LoginResponse>(ENDPOINTS.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data.token || !data.user) {
      throw new Error("Respuesta inválida del servidor");
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    
    return data.user;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getStoredUser(): User | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!raw || !token) return null;

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!getToken();
  },
};