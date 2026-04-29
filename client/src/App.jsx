import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { CardsProvider } from './context/CardsContext';
import { ThemeProvider } from './context/ThemeContext';

const Home = lazy(() => import('./pages/Home'));
const CompanyDashboard = lazy(() => import('./pages/CompanyDashboard'));
const Screener = lazy(() => import('./pages/Screener'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const DocumentAnalyzer = lazy(() => import('./pages/DocumentAnalyzer'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ThemeProvider>
    <CardsProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner className="py-16" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/company/:symbol" element={<CompanyDashboard />} />
              <Route path="/screens" element={<Screener />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/document-analyzer" element={<DocumentAnalyzer />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CardsProvider>
    </ThemeProvider>
  );
}
