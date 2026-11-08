import styles from "./AboutSection.module.css";

const STATS = [
  { value: "+12.000", label: "Gamers equipados" },
  { value: "2017", label: "Año de fundación" },
  { value: "48hs", label: "Envíos a todo el país" },
  { value: "4.9★", label: "Calificación promedio" },
];

const TEAM = [
  { name: "Lucía Fernández", role: "Fundadora & CEO" },
  { name: "Martín Ríos", role: "Especialista en hardware" },
  { name: "Sofía Acosta", role: "Atención al cliente" },
];

export function AboutSection() {
  return (
    <section>
      <span className={styles.kicker}>Nosotros</span>
      <h1 className={styles.title}>Nacimos jugando. <span>Crecimos equipando.</span></h1>
      <p className={styles.lead}>
        Gamer To Be empezó en 2017 en un pequeño local de Buenos Aires, armando PCs para amigos del barrio.
        Hoy somos una de las tiendas gamer de referencia del país, con un objetivo claro: que cada jugador
        tenga el equipo que se merece, con asesoramiento real y precios justos.
      </p>
      <div className={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <h2 className={styles.subtitle}>Nuestro equipo</h2>
      <div className={styles.team}>
        {TEAM.map((m) => (
          <div key={m.name} className={styles.member}>
            <div className={styles.avatar}>{m.name.split(" ").map((w) => w[0]).join("")}</div>
            <strong>{m.name}</strong>
            <span>{m.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
