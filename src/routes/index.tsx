import { createFileRoute } from "@tanstack/react-router";
import { BannerCarousel, type Banner } from "@/components/BannerCarousel/BannerCarousel";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner/PromoBanner";
import { useProducts } from "@/hooks/useProducts";
import bannerNotebooks from "@/assets/banner-notebooks.jpg";
import bannerCpu from "@/assets/banner-cpu.jpg";
import bannerMonitor from "@/assets/banner-monitor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gamer To Be — Insumos gamer: notebooks, procesadores y monitores" },
      { name: "description", content: "Notebooks gamer, procesadores, monitores y periféricos al mejor precio. Equipá tu setup con Gamer To Be." },
      { property: "og:title", content: "Gamer To Be — Insumos gamer" },
      { property: "og:description", content: "Notebooks, procesadores, monitores y más para tu setup gamer." },
    ],
  }),
  component: Home,
});

const BANNERS: Banner[] = [
  { image: bannerNotebooks, tag: "Nuevos ingresos", title: "Notebooks gamer de última generación", subtitle: "RTX serie 40 y pantallas de alta frecuencia en 12 cuotas." },
  { image: bannerCpu, tag: "Hot sale", title: "Procesadores con hasta 20% OFF", subtitle: "AMD Ryzen e Intel Core para exprimir cada FPS." },
  { image: bannerMonitor, tag: "Setup", title: "Monitores que te meten en el juego", subtitle: "Curvos, 4K y 240Hz. Envío gratis a todo el país." },
];

function Home() {
  const { data = [], isLoading } = useProducts();
  return (
    <main className="container" style={{ paddingTop: "1.5rem" }}>
      <BannerCarousel banners={BANNERS} />
      <ProductGrid title="Más vendidos" subtitle="Lo que más eligen nuestros gamers" products={data.filter((p) => p.bestSeller).slice(0, 4)} loading={isLoading} />
      <PromoBanner title="Armá tu PC a medida" text="Combiná procesador + placa de video y llevate un descuento extra." highlight="-15%" />
      <ProductGrid title="Recomendados" subtitle="Seleccionados por nuestro equipo" products={data.filter((p) => p.featured).slice(0, 4)} loading={isLoading} />
    </main>
  );
}
