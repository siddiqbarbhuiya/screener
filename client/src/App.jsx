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
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
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
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CardsProvider>
    </ThemeProvider>
  );
}
