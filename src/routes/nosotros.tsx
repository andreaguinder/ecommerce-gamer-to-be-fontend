import { createFileRoute } from "@tanstack/react-router";
import { AboutSection } from "@/components/AboutSection/AboutSection";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Gamer To Be" },
      { name: "description", content: "Conocé la historia y el equipo detrás de Gamer To Be, tu tienda de insumos gamer." },
      { property: "og:title", content: "Nosotros — Gamer To Be" },
      { property: "og:description", content: "La historia y el equipo de Gamer To Be." },
    ],
  }),
  component: () => (
    <main className="container" style={{ paddingTop: "2.5rem" }}>
      <AboutSection />
    </main>
  ),
});
