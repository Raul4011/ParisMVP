import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import NotFound from '../pages/NotFound';
import AppLayout from '../components/layout/AppLayout';
import Clientes from '../pages/Clientes';
import Productos from '../pages/Productos';
import Ventas from '../pages/Ventas';
import VentaDetalle from '../pages/VentaDetalle';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />

        {/* Privadas con layout */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >

          <Route index element={<Navigate to="/clientes" replace />} />

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas/:id" element={<VentaDetalle />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
