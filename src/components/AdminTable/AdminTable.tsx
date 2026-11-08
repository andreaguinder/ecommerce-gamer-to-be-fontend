import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";
import styles from "./AdminTable.module.css";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}

export function AdminTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) return <p className={styles.empty}>No hay productos cargados.</p>;
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Etiquetas</th><th /></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className={styles.name}>{p.name}</td>
              <td>{p.category}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                {p.bestSeller && <span className={styles.tag}>Top</span>}
                {p.featured && <span className={styles.tagBlue}>Rec.</span>}
              </td>
              <td className={styles.actions}>
                <button className={styles.edit} onClick={() => onEdit(p)}>Editar</button>
                <button className={styles.del} onClick={() => onDelete(p)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
