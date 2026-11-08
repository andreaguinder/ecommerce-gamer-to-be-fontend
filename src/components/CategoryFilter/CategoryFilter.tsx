import { CATEGORIES, type ProductCategory } from "@/types/product";
import styles from "./CategoryFilter.module.css";

interface Props {
  value: ProductCategory | "all";
  onChange: (v: ProductCategory | "all") => void;
}

export function CategoryFilter({ value, onChange }: Props) {
  const options = [{ value: "all" as const, label: "Todos" }, ...CATEGORIES];
  return (
    <div className={styles.filter}>
      {options.map((o) => (
        <button
          key={o.value}
          className={`${styles.chip} ${value === o.value ? styles.active : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
