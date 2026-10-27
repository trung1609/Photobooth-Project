import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BoothAppPage } from './pages/BoothAppPage';
import { FramesPage } from './pages/FramesPage';
import { FeedbacksPage } from './pages/FeedbacksPage';
import { PrivateFramePage } from './pages/PrivateFramePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans bg-[#fdfafc] text-gray-700">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<BoothAppPage />} />
            <Route path="/frames" element={<FramesPage />} />
            <Route path="/feedbacks" element={<FeedbacksPage />} />
            <Route path="/privateframe" element={<PrivateFramePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
