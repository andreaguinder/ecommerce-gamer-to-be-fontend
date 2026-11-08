import styles from "./PromoBanner.module.css";

export function PromoBanner({ title, text, highlight }: { title: string; text: string; highlight: string }) {
  return (
    <aside className={styles.promo}>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
      <span className={styles.highlight}>{highlight}</span>
    </aside>
  );
}
