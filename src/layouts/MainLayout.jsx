import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-purple-600/30 selection:text-purple-200'>
      <Navbar />
      <main className='flex-1 flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

