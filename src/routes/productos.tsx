import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { useProducts } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types/product";

export const Route = createFileRoute("/productos")({
  head: () => ({
    meta: [
      { title: "Productos — Gamer To Be" },
      { name: "description", content: "Catálogo completo de notebooks, procesadores, monitores, placas de video y periféricos gamer." },
      { property: "og:title", content: "Productos — Gamer To Be" },
      { property: "og:description", content: "Explorá todo el catálogo gamer de Gamer To Be." },
    ],
  }),
  component: Productos,
});

function Productos() {
  const { data = [], isLoading, isError } = useProducts();
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const list = category === "all" ? data : data.filter((p) => p.category === category);

  return (
    <main className="container" style={{ paddingTop: "2.5rem" }}>
      <h1 style={{ margin: 0, fontSize: "2.5rem", fontWeight: 900 }}>Productos</h1>
      <CategoryFilter value={category} onChange={setCategory} />
      {isError ? (
        <p style={{ color: "var(--destructive)" }}>No pudimos cargar los productos. Revisá la conexión con el servidor.</p>
      ) : (
        <ProductGrid products={list} loading={isLoading} />
      )}
    </main>
  );
}
