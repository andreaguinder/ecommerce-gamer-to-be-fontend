import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          Gamer<span>To</span>Be
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link} activeProps={{ className: styles.active }} activeOptions={{ exact: true }}>Inicio</Link>
          <Link to="/productos" className={styles.link} activeProps={{ className: styles.active }}>Productos</Link>
          <Link to="/nosotros" className={styles.link} activeProps={{ className: styles.active }}>Nosotros</Link>
          <Link to="/contacto" className={styles.link} activeProps={{ className: styles.active }}>Contacto</Link>
          {user ? (
            <>
              <Link to="/admin" className={styles.link} activeProps={{ className: styles.active }}>Panel</Link>
              <button
                className={styles.cta}
                onClick={() => { logout(); navigate({ to: "/login", replace: true }); }}
              >
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.cta}>Ingresar</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
