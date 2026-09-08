import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ventasService } from '../services/ventasService';

export default function VentaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venta, setVenta] = useState(null);

  useEffect(() => {
    fetchVenta();
  }, [id]);

  const fetchVenta = async () => {
    const data = await ventasService.getById(id);
    setVenta(data);
  };

  if (!venta) return <div className="p-4">Loading...</div>;

  const totalPagado = venta.pagos?.reduce((acc, p) => acc + p.monto, 0) || 0;

  const saldo = venta.total - totalPagado;

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* header */}
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="text-lg font-bold">Detalle Venta</h1>
      </div>

      {/* cliente */}
      <div className="bg-white p-3 rounded shadow">
        <p className="font-bold">{venta.clientes?.nombre || 'Sin cliente'}</p>
        <p className="text-sm text-gray-500">{venta.tipo_venta}</p>
      </div>

      {/* productos */}
      <div className="bg-white p-3 rounded shadow">
        <p className="font-bold mb-2">Productos</p>

        {venta.detalle_venta.map((item) => (
          <div key={item.id} className="text-sm mb-2">
            <p>{item.productos?.nombre}</p>
            <p>
              {item.cantidad} x ${item.precio_unitario}
            </p>
            <p className="font-semibold">${item.subtotal}</p>
          </div>
        ))}
      </div>

      {/* pagos */}
      <div className="bg-white p-3 rounded shadow">
        <p className="font-bold mb-2">Pagos</p>

        {venta.pagos?.length === 0 && (
          <p className="text-sm text-gray-500">Sin pagos registrados</p>
        )}

        {venta.pagos?.map((p) => (
          <div key={p.id} className="text-sm mb-2">
            <p>${p.monto}</p>
            <p className="text-xs text-gray-500">
              {p.metodo_pago} - {p.fecha_pago}
            </p>
          </div>
        ))}
      </div>

      {/* resumen */}
      <div className="bg-white p-3 rounded shadow">
        <p>Total: ${venta.total}</p>
        <p>Pagado: ${totalPagado}</p>
        <p className="font-bold">Saldo: ${saldo}</p>

        <p className="text-sm mt-2">Estado: {venta.estado_pago}</p>
      </div>
    </div>
  );
}
