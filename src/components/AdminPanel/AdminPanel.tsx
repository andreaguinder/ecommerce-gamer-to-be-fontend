import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminTable } from "@/components/AdminTable/AdminTable";
import { ProductForm } from "@/components/ProductForm/ProductForm";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS_KEY, useProducts } from "@/hooks/useProducts";
import { productService } from "@/services/productService";
import type { Product, ProductInput } from "@/types/product";
import styles from "./AdminPanel.module.css";

export function AdminPanel() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data = [], isLoading, refetch, isFetching } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Estado para el modal de confirmación de borrado
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const authToken = localStorage.getItem("token") || "";

  const invalidate = () => qc.invalidateQueries({ queryKey: PRODUCTS_KEY });

  const save = useMutation({
    mutationFn: (input: ProductInput) => {
      const productId = editing ? (editing.id || (editing as any)._id) : null;
      return editing
        ? productService.update(productId, input, authToken)
        : productService.create(input, authToken);
    },
    onSuccess: () => {
      toast.success(editing ? "Producto actualizado" : "Producto creado");
      setShowForm(false);
      setEditing(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => productService.delete(id, authToken),
    onSuccess: () => {
      toast.success("Producto eliminado");
      setProductToDelete(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <main className="container" style={{ paddingTop: "2.5rem" }}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.title}>Panel de administración</h1>
          <p className={styles.welcome}>
            Hola, {user?.name ?? user?.email} · {data.length} productos
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.secondary}
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Actualizando…" : "Actualizar"}
          </button>
          <button
            className={styles.primary}
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            + Nuevo producto
          </button>
        </div>
      </div>

      {showForm && (
        <div className={styles.formWrap}>
          <ProductForm
            initial={editing}
            onSubmit={async (d) => {
              await save.mutateAsync(d);
            }}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {isLoading ? (
        <p>Cargando…</p>
      ) : (
        <AdminTable
          products={data}
          onEdit={(p) => {
            setEditing(p);
            setShowForm(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDelete={(p) => {
            // En vez de usar el confirm() feo, abrimos nuestro modal custom
            setProductToDelete(p);
          }}
        />
      )}

      {/* --- MODAL CUSTOM DE ELIMINACIÓN --- */}
      {productToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 className={styles.modalTitle}>¿Deseas eliminar este producto?</h3>
            <p className={styles.modalText}>
              Estás por eliminar <strong>"{productToDelete.name}"</strong>. Esta acción no se puede deshacer.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalBtnCancel}
                onClick={() => setProductToDelete(null)}
                disabled={del.isPending}
              >
                No
              </button>
              <button
                type="button"
                className={styles.modalBtnConfirm}
                onClick={() => {
                  const targetId = productToDelete.id || (productToDelete as any)._id;
                  del.mutate(targetId);
                }}
                disabled={del.isPending}
              >
                {del.isPending ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}