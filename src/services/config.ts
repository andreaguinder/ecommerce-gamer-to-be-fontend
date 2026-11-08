/**
 * Configuración del backend.
 * Definí VITE_API_URL en un archivo .env (ej: VITE_API_URL=http://localhost:3000/api).
 * Si no está definida, la app usa datos simulados (mock) guardados en el navegador.
 */
export const API_URL: string = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
export const USE_MOCK = API_URL === "";

/** Endpoints esperados — ajustalos a tu backend */
export const ENDPOINTS = {
  login: "/auth/login", // POST { email, password } -> { token, user }
  me: "/auth/me", // GET (Bearer) -> user
  products: "/products", // GET lista, POST crear
  product: (id: string) => `/products/${id}`, // GET, PUT, DELETE
};

export const TOKEN_KEY = "gtb_token";
export const USER_KEY = "gtb_user";
