import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import Dataset from './pages/Dataset';
import MathematicalAnalysis from './pages/MathematicalAnalysis';
import CorrelationRegression from './pages/CorrelationRegression';
import Charts from './pages/Charts';
import WhatIfAnalysis from './pages/WhatIfAnalysis';
import Report from './pages/Report';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="entry" element={<DataEntry />} />
          <Route path="dataset" element={<Dataset />} />
          <Route path="math" element={<MathematicalAnalysis />} />
          <Route path="correlation" element={<CorrelationRegression />} />
          <Route path="charts" element={<Charts />} />
          <Route path="whatif" element={<WhatIfAnalysis />} />
          <Route path="report" element={<Report />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
