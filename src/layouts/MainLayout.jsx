import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`flex flex-col bg-navy-950 text-slate-100 selection:bg-purple-600/30 selection:text-purple-200 ${
      isHome ? 'h-screen max-h-screen overflow-hidden' : 'min-h-screen'
    }`}>
      <Navbar />
      <main className={`flex-1 flex flex-col ${isHome ? 'overflow-hidden min-h-0' : ''}`}>
        <Outlet />
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

export default MainLayout;
