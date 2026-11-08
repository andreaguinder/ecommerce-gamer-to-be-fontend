import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import styles from "./BannerCarousel.module.css";

export interface Banner {
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}

export function BannerCarousel({ banners, interval = 5000 }: { banners: Banner[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % banners.length), interval);
    return () => clearInterval(t);
  }, [banners.length, interval]);

  const go = (d: number) => setIndex((i) => (i + d + banners.length) % banners.length);

  return (
    <section className={styles.carousel} aria-roledescription="carrusel">
      <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
        {banners.map((b, i) => (
          <div className={styles.slide} key={b.title} aria-hidden={i !== index}>
            <img src={b.image} alt={b.title} width={1600} height={640} className={styles.image} />
            <div className={styles.overlay}>
              <span className={styles.tag}>{b.tag}</span>
              <h2 className={styles.title}>{b.title}</h2>
              <p className={styles.subtitle}>{b.subtitle}</p>
              <Link to="/productos" className={styles.cta}>Ver productos</Link>
            </div>
          </div>
        ))}
      </div>
      <button className={`${styles.arrow} ${styles.prev}`} onClick={() => go(-1)} aria-label="Anterior">‹</button>
      <button className={`${styles.arrow} ${styles.next}`} onClick={() => go(1)} aria-label="Siguiente">›</button>
      <div className={styles.dots}>
        {banners.map((b, i) => (
          <button
            key={b.title}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir al banner ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
