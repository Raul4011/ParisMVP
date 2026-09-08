import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl">Dashboard</h1>
      <p>{user?.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
