import { useEffect, useState } from 'react';
import { clientesService } from '../services/clientesService';
import { useAuthStore } from '../store/authStore';
import Modal from '../ui/Modal';

export default function Clientes() {
  const { user } = useAuthStore();

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    setLoading(true);
    const data = await clientesService.getAll(user.id);
    setClientes(data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!form.nombre) return;

    if (editing) {
      const updated = await clientesService.update(editing.id, form);
      setClientes((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    } else {
      const created = await clientesService.create(form, user.id);
      setClientes((prev) => [created, ...prev]);
    }

    resetModal();
  };

  const handleDelete = async (id) => {
    await clientesService.remove(id);
    setClientes((prev) => prev.filter((c) => c.id !== id));
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ nombre: '', telefono: '' });
    setIsOpen(true);
  };

  const openEdit = (cliente) => {
    setEditing(cliente);
    setForm({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
    });
    setIsOpen(true);
  };

  const resetModal = () => {
    setIsOpen(false);
    setEditing(null);
    setForm({ nombre: '', telefono: '' });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 pb-20">
      <button
        onClick={openCreate}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Nuevo Cliente
      </button>

      <div className="space-y-2">
        {clientes.map((c) => (
          <div key={c.id} className="p-3 bg-white shadow rounded">
            <p className="font-bold">{c.nombre}</p>
            <p>{c.telefono}</p>

            <div className="flex gap-3 mt-2 text-sm">
              <button
                className="text-white px-4 py-2 bg-orange-400 rounded"
                onClick={() => openEdit(c)}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-white px-4 py-2 bg-red-600 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={resetModal}>
        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            {editing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
