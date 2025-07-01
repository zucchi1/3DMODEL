import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import MainApp from './components/MainApp';
import MainApp2 from './components/MainApp2';
import Home from './components/Home';
import Update from './components/Update';
import Correct from './components/Correct';
import Suggest from './components/Suggest';
import Suggest2 from './components/Suggest2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CameraProvider } from './context/CameraContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CameraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update" element={<Update />} />
          <Route path="/viewer" element={<MainApp />} />
          <Route path="/viewer2" element={<MainApp2 />} />
          <Route path="/correction" element={<Correct />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/suggest2" element={<Suggest2 />} />
        </Routes>
      </Router>
    </CameraProvider>
  </React.StrictMode>
);