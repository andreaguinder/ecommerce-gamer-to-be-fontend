import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Ingresar — Gamer To Be" },
      { name: "description", content: "Ingresá al panel de administración de Gamer To Be." },
      { property: "og:title", content: "Ingresar — Gamer To Be" },
      { property: "og:description", content: "Acceso al panel de administración." },
    ],
  }),
  component: Login,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  return (
    <main className="container" style={{ display: "grid", placeItems: "center", minHeight: "70vh", paddingTop: "2rem" }}>
      <LoginForm
        onSubmit={async (email, password) => {
          await login(email, password);
          navigate({ to: "/admin" });
        }}
      />
    </main>
  );
}
