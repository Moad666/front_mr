// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import MainPage from './pages/MainPage';
// import Authentication from './pages/Authentication';
// import { BrowserRouter as Router } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Authentication />
//   </React.StrictMode>
// );
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Make sure this imports TailwindCSS styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import MainPage from './pages/MainPage';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

