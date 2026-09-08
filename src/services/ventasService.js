import { supabase } from './supabaseClient.js';

export const ventasService = {
  getAll: async (userId) => {
    const { data, error } = await supabase
      .from('ventas')
      .select(
        `
        *,
        clientes(nombre)
      `
      )
      .eq('user_id', userId)
      .order('fecha_venta', { ascending: false });

    if (error) throw error;
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('ventas')
      .select(
        `
        *,
        clientes(nombre),
        detalle_venta (
          id,
          producto_id,
          cantidad,
          precio_unitario,
          subtotal,
          productos(nombre)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  create: async ({ userId, cliente_id, tipo_venta, items }) => {
    // total
    const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

    // venta
    const { data: venta, error } = await supabase
      .from('ventas')
      .insert([
        {
          user_id: userId,
          cliente_id,
          total,
          tipo_venta,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // detalle + stock
    for (const item of items) {
      const subtotal = item.precio * item.cantidad;

      await supabase.from('detalle_venta').insert([
        {
          user_id: userId,
          venta_id: venta.id,
          producto_id: item.producto_id,
          cantidad: item.cantidad,
          precio_unitario: item.precio,
          subtotal,
        },
      ]);

      const { data: prod } = await supabase
        .from('productos')
        .select('stock_actual')
        .eq('id', item.producto_id)
        .single();

      const nuevoStock = prod.stock_actual - item.cantidad;
      if (nuevoStock < 0) throw new Error('Stock insuficiente');

      await supabase
        .from('productos')
        .update({ stock_actual: nuevoStock })
        .eq('id', item.producto_id);

      await supabase.from('movimientos_stock').insert([
        {
          user_id: userId,
          producto_id: item.producto_id,
          tipo: 'venta',
          cantidad: item.cantidad,
          referencia: `venta:${venta.id}`,
        },
      ]);
    }

    return venta;
  },

  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('ventas')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  remove: async (id) => {
    const { error } = await supabase.from('ventas').delete().eq('id', id);

    if (error) throw error;
  },
};
