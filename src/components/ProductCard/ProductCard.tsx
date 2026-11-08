import type { Product } from "@/types/product";
import { CATEGORIES } from "@/types/product";
import { formatPrice } from "@/utils/format";
import styles from "./ProductCard.module.css";

const ICONS: Record<string, string> = {
  notebooks: "💻", procesadores: "🧠", monitores: "🖥️", placas: "🎮", perifericos: "⌨️",
};

export function ProductCard({ product }: { product: Product }) {
  const label = CATEGORIES.find((c) => c.value === product.category)?.label ?? product.category;
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} loading="lazy" className={styles.image} />
        ) : (
          <span className={styles.icon} aria-hidden>{ICONS[product.category] ?? "🕹️"}</span>
        )}
        {product.bestSeller && <span className={styles.badge}>Top ventas</span>}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{label}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={product.stock > 0 ? styles.stock : styles.noStock}>
            {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
          </span>
        </div>
      </div>
    </article>
  );
}
