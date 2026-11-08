export const API_URL: string = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3000";

/** Endpoints de la API */
export const ENDPOINTS = {
  login: "/auth/login",
  me: "/auth/me",
  products: "/products",
  product: (id: string) => `/products/${id}`,
  contact: "/contact",
};

export const TOKEN_KEY = "gtb_token";
export const USER_KEY = "gtb_user";