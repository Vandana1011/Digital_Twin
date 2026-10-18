import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import HeartAssessment from './pages/HeartAssessment';
import PredictionResults from './pages/PredictionResults';
import ShapExplanation from './pages/ShapExplanation';
import ModelPerformance from './pages/ModelPerformance';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import History from './pages/History';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='assessment' element={<HeartAssessment />} />
          <Route path='heart' element={<Navigate to='/assessment' replace />} />
          <Route path='results' element={<PredictionResults />} />
          <Route path='shap' element={<ShapExplanation />} />
          <Route path='performance' element={<ModelPerformance />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route path='about' element={<About />} />
          <Route path='history' element={<History />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
