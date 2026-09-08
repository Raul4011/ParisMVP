import { useEffect, useState } from 'react';
import { productosService } from '../services/productosService';
import { useAuthStore } from '../store/authStore';
import Modal from '../ui/Modal';

export default function Productos() {
  const { user } = useAuthStore();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await productosService.getAll(user.id);
    console.log(data);
    setProductos(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) load();
  }, [user]);

  const handleSave = async (data) => {
    if (editing) {
      await productosService.update(editing.id, data, user.id);
    } else {
      await productosService.create(data, user.id);
    }

    setModalOpen(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    await productosService.remove(id, user.id);
    load();
  };

  if (loading) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Productos</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          + Nuevo
        </button>
      </div>

      <div className="space-y-2">
        {productos.map((p) => (
          <div key={p.id} className="border p-3 rounded flex justify-between">
            <div>
              <p className="font-semibold">{p.nombre}</p>
              <p className="text-sm opacity-70">
                Stock: {p.stock_actual} | Venta: ${p.precio_venta}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(p);
                  setModalOpen(true);
                }}
                className="text-blue-600"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initialData={editing}
      />
    </div>
  );
}
