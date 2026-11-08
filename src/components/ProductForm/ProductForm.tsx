import { useEffect, useState, type FormEvent } from "react";
import { CATEGORIES, type Product, type ProductInput } from "@/types/product";
import styles from "./ProductForm.module.css";

const EMPTY: ProductInput = {
  name: "", description: "", price: 0, stock: 0, category: "notebooks", imageUrl: "", featured: false, bestSeller: false,
};

interface Props {
  initial?: Product | null;
  onSubmit: (data: ProductInput) => Promise<void>;
  onCancel: () => void;
}

export function ProductForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ProductInput>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      const { id: _id, ...rest } = initial;
      setForm({ ...EMPTY, ...rest });
    } else setForm(EMPTY);
  }, [initial]);

  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try { await onSubmit(form); } finally { setSaving(false); }
  };

  return (
    <form className={styles.form} onSubmit={handle}>
      <h2 className={styles.title}>{initial ? "Editar producto" : "Nuevo producto"}</h2>
      <div className={styles.grid}>
        <label className={styles.label}>Nombre
          <input className={styles.input} required value={form.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <label className={styles.label}>Categoría
          <select className={styles.input} value={form.category} onChange={(e) => set("category", e.target.value as ProductInput["category"])}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </label>
        <label className={styles.label}>Precio (ARS)
          <input className={styles.input} type="number" min={0} required value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
        </label>
        <label className={styles.label}>Stock
          <input className={styles.input} type="number" min={0} required value={form.stock} onChange={(e) => set("stock", Number(e.target.value))} />
        </label>
        <label className={`${styles.label} ${styles.full}`}>URL de imagen
          <input className={styles.input} type="url" value={form.imageUrl ?? ""} onChange={(e) => set("imageUrl", e.target.value)} />
        </label>
        <label className={`${styles.label} ${styles.full}`}>Descripción
          <textarea className={styles.input} rows={3} required value={form.description} onChange={(e) => set("description", e.target.value)} />
        </label>
        <label className={styles.check}>
          <input type="checkbox" checked={!!form.bestSeller} onChange={(e) => set("bestSeller", e.target.checked)} /> Más vendido
        </label>
        <label className={styles.check}>
          <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} /> Recomendado
        </label>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>Cancelar</button>
        <button className={styles.save} disabled={saving}>{saving ? "Guardando…" : "Guardar"}</button>
      </div>
    </form>
  );
}
