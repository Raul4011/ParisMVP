import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `flex flex-col items-center text-xs ${
    isActive ? 'text-blue-600' : 'text-gray-500'
  }`;

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
      <NavLink to="/clientes" className={linkClass}>
        <span>👤</span>
        Clientes
      </NavLink>

      <NavLink to="/productos" className={linkClass}>
        <span>📦</span>
        Productos
      </NavLink>

      <NavLink to="/ventas" className={linkClass}>
        <span>💰</span>
        Ventas
      </NavLink>
    </nav>
  );
};

export default BottomNav;
