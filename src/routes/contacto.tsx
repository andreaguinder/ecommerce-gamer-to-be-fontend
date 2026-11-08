import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { contactService } from "@/services/contactService";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Gamer To Be" },
      { name: "description", content: "Escribinos por consultas de productos, compras o armado de tu setup gamer." },
      { property: "og:title", content: "Contacto — Gamer To Be" },
      { property: "og:description", content: "Consultas de productos, compras y armado de setup gamer." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <main className="container" style={{ display: "grid", placeItems: "center", minHeight: "70vh", paddingTop: "2rem" }}>
      <ContactForm onSubmit={(data) => contactService.send(data)} />
    </main>
  );
}
