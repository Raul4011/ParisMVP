import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Paris SaaS</h1>
        <p className="text-xs text-gray-500 truncate max-w-[140px]">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-lg transition"
      >
        Salir
      </button>
    </header>
  );
};

export default Header;
