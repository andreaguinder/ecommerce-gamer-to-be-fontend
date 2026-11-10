import { TOKEN_KEY } from "./config";

const API_URL = import.meta.env.VITE_API_URL;

// Obtiene el token automáticamente del almacenamiento local
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const productService = {
  // Obtener todos
  getAll: async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Error al obtener los productos");
    return await res.json();
  },

  // Obtener por ID (por si lo usás en detalle)
  getById: async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error("Error al obtener el producto");
    return await res.json();
  },

  // Crear (para el panel de admin, usando el token JWT)
  create: async (productData: any, token: string) => {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error("Error al crear el producto");
    return await res.json();
  },

  // Actualizar
  update: async (id: string, productData: any, token: string) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    if (!res.ok) throw new Error("Error al actualizar el producto");
    return await res.json();
  },

  // Eliminar
  delete: async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) throw new Error("Error al eliminar el producto");
    return await res.json();
  }
};