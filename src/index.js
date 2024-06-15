import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Make sure this imports TailwindCSS styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import MainPage from './pages/MainPage';
import reportWebVitals from './reportWebVitals';
import Popup from './components/CreateRules';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/createRule" element={<Popup />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

