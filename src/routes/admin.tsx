import { AdminPanel } from "@/components/AdminPanel/AdminPanel";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/authService";

// Ruta protegida: el token vive en localStorage, por eso se evalúa sólo en el navegador.
export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: () => {
    if (!authService.isAuthenticated()) throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Panel de administración — Gamer To Be" },
      { name: "description", content: "Gestioná el catálogo de productos de Gamer To Be." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPanel,
});

