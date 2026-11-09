import { useState, type FormEvent } from "react";
import styles from "./LoginForm.module.css";

interface Props {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handle}>
      <h1 className={styles.title}>Ingresar</h1>
      <p className={styles.subtitle}>Accedé al panel de administración</p>
      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Contraseña
        <input
          className={styles.input}
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.submit} disabled={loading}>
        {loading ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}