import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ventasService } from '../services/ventasService';
import { clientesService } from '../services/clientesService';
import { productosService } from '../services/productosService';
import { useAuthStore } from '../store/authStore';
import Modal from '../ui/Modal';

export default function Ventas() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    cliente_id: '',
    tipo_venta: 'contado',
    items: [],
  });

  const [item, setItem] = useState({
    producto_id: 0,
    cantidad: 1,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const [v, c, p] = await Promise.all([
      ventasService.getAll(user.id),
      clientesService.getAll(user.id),
      productosService.getAll(user.id),
    ]);

    setVentas(v);
    setClientes(c);
    setProductos(p);
  };

  const addItem = () => {
    if (!item.producto_id || item.cantidad <= 0) {
      alert('Selecciona producto y cantidad válida');
      return;
    }

    const prod = productos.find((p) => p.id === item.producto_id);

    if (!prod) return;

    // evitar duplicados → sumar cantidad
    const existing = form.items.find((i) => i.producto_id === prod.id);

    if (existing) {
      setForm((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.producto_id === prod.id
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            producto_id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio_venta,
            cantidad: item.cantidad,
          },
        ],
      }));
    }

    setItem({ producto_id: 0, cantidad: 1 });
  };

  const total = form.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  const handleSubmit = async () => {
    if (!form.cliente_id) {
      alert('Selecciona un cliente');
      return;
    }

    if (form.items.length === 0) {
      alert('Agrega al menos un producto');
      return;
    }

    try {
      await ventasService.create({
        userId: user.id,
        cliente_id: Number(form.cliente_id),
        tipo_venta: form.tipo_venta,
        items: form.items,
      });

      reset();
      init();
    } catch (err) {
      console.error(err);
      alert('Error al crear venta');
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await ventasService.remove(id);
    setVentas((prev) => prev.filter((v) => v.id !== id));
  };

  const reset = () => {
    setIsOpen(false);
    setForm({ cliente_id: '', tipo_venta: 'contado', items: [] });
    setItem({ producto_id: 0, cantidad: 1 });
  };

  return (
    <div className="p-4 pb-20">
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Nueva Venta
      </button>

      {/* listado */}
      <div className="space-y-2">
        {ventas.map((v) => (
          <div
            key={v.id}
            onClick={() => navigate(`/ventas/${v.id}`)}
            className="bg-white p-3 rounded shadow cursor-pointer"
          >
            <p className="font-bold">
              {v.clientes?.nombre || `Cliente #${v.cliente_id}`}
            </p>

            <p>${v.total}</p>

            <p className="text-xs text-gray-500">
              {v.estado_pago} - {v.tipo_venta}
            </p>

            <button
              onClick={(e) => handleDelete(e, v.id)}
              className="text-red-500 text-sm mt-2"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* modal */}
      <Modal isOpen={isOpen} onClose={reset}>
        <div className="space-y-4">
          {/* cliente */}
          <select
            className="w-full border p-2 rounded"
            value={form.cliente_id}
            onChange={(e) => setForm({ ...form, cliente_id: e.target.value })}
          >
            <option value="">Cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          {/* tipo venta */}
          <select
            className="w-full border p-2 rounded"
            value={form.tipo_venta}
            onChange={(e) => setForm({ ...form, tipo_venta: e.target.value })}
          >
            <option value="contado">Contado</option>
            <option value="cuotas">Cuotas</option>
          </select>

          {/* agregar item */}
          <div className="space-y-2">
            {/* producto */}
            <select
              className="w-full border p-2 rounded"
              value={item.producto_id}
              onChange={(e) =>
                setItem({
                  ...item,
                  producto_id: Number(e.target.value),
                })
              }
            >
              <option value={0}>Producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>

            {/* cantidad + boton */}
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                className="w-16 min-w-16 max-w-16 border p-2 rounded text-center"
                value={item.cantidad}
                onChange={(e) =>
                  setItem({
                    ...item,
                    cantidad: Number(e.target.value),
                  })
                }
              />

              <button
                type="button"
                onClick={addItem}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Agregar
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Selecciona producto y presiona "Agregar"
            </p>
          </div>

          {/* items */}
          <div className="bg-gray-50 p-2 rounded text-sm space-y-1">
            {form.items.length === 0 && (
              <p className="text-red-500">No hay productos agregados</p>
            )}

            {form.items.map((i, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span>
                  {i.nombre} x{i.cantidad}
                </span>
                <span>${i.precio * i.cantidad}</span>
              </div>
            ))}
          </div>

          {/* total */}
          <p className="font-bold text-right">Total: ${total}</p>

          {/* submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            Guardar Venta
          </button>
        </div>
      </Modal>
    </div>
  );
}
