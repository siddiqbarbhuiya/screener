import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import IndicesTicker from './IndicesTicker';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      <Navbar />
      <IndicesTicker />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
