import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>Gamer<span>To</span>Be</p>
        <p className={styles.copy}>© {new Date().getFullYear()} Gamer To Be. Equipamos tu próxima partida.</p>
      </div>
    </footer>
  );
}
