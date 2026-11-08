import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

export const PRODUCTS_KEY = ["products"] as const;

export function useProducts() {
  return useQuery({ queryKey: PRODUCTS_KEY, queryFn: productService.getAll });
}
