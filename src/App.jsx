import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import AppRouter from './app/AppRouter.jsx';

function App() {
  const init = useAuthStore((state) => state.init);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    init();
  }, [init]);

  if (loading) return null;

  return <AppRouter />;
}

export default App;
