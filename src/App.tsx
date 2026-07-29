import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import UploadPage from './pages/UploadPage';
import ConfigurePage from './pages/ConfigurePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import LibraryPage from './pages/LibraryPage';
import StatsPage from './pages/StatsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<UploadPage />} />
          <Route path="/configurar" element={<ConfigurePage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/resultados/:attemptId" element={<ResultsPage />} />
          <Route path="/biblioteca" element={<LibraryPage />} />
          <Route path="/estadisticas" element={<StatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
