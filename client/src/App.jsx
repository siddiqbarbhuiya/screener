import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const CompanyDashboard = lazy(() => import('./pages/CompanyDashboard'));
const Screener = lazy(() => import('./pages/Screener'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner className="py-16" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/company/:symbol" element={<CompanyDashboard />} />
            <Route path="/screens" element={<Screener />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
