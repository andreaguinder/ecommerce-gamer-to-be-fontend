import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

interface Props {
  title?: string;
  subtitle?: string;
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({ title, subtitle, products, loading }: Props) {
  return (
    <section className={styles.section}>
      {title && (
        <header className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
      )}
      {loading ? (
        <p className={styles.state}>Cargando productos…</p>
      ) : products.length === 0 ? (
        <p className={styles.state}>No hay productos para mostrar.</p>
      ) : (
        <div className={styles.grid}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
