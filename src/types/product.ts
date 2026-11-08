export type ProductCategory = "notebooks" | "procesadores" | "monitores" | "placas" | "perifericos";

export interface Product {
  id?: string;
  _id?: string; 
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  imageUrl?: string;
  featured?: boolean;
  bestSeller?: boolean;
}
/** Datos para crear/editar (sin id) */
export type ProductInput = Omit<Product, "id">;

export const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "notebooks", label: "Notebooks" },
  { value: "procesadores", label: "Procesadores" },
  { value: "monitores", label: "Monitores" },
  { value: "placas", label: "Placas de video" },
  { value: "perifericos", label: "Periféricos" },
];
