import { useState, type FormEvent } from "react";
import { contactSchema, type ContactInput } from "@/services/contactService";
import styles from "./ContactForm.module.css";

const EMPTY: ContactInput = { name: "", email: "", message: "" };

interface Props {
  onSubmit: (data: ContactInput) => Promise<void>;
}

export function ContactForm({ onSubmit }: Props) {
  const [form, setForm] = useState<ContactInput>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof ContactInput>(k: K, v: ContactInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSent(false);

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisá los datos ingresados");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(parsed.data);
      setSent(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handle}>
      <h1 className={styles.title}>Contact<span>o</span></h1>
      <p className={styles.subtitle}>¿Dudas con tu compra o tu setup? Escribinos y te respondemos.</p>
      <label className={styles.label}>
        Nombre
        <input className={styles.input} required maxLength={100} value={form.name} onChange={(e) => set("name", e.target.value)} />
      </label>
      <label className={styles.label}>
        Email
        <input className={styles.input} type="email" required maxLength={255} value={form.email} onChange={(e) => set("email", e.target.value)} />
      </label>
      <label className={styles.label}>
        Mensaje
        <textarea className={styles.input} rows={5} required maxLength={1000} value={form.message} onChange={(e) => set("message", e.target.value)} />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      {sent && <p className={styles.success}>¡Mensaje enviado! Te vamos a responder a la brevedad.</p>}
      <button className={styles.submit} disabled={loading}>{loading ? "Enviando…" : "Enviar mensaje"}</button>
    </form>
  );
}
