import { Outlet } from 'react-router-dom';
import Header from '../../ui/Header';
import BottomNav from '../../ui/BottomNav';
import Footer from '../../ui/Footer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <BottomNav />
      <main className="flex-1 p-4 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
