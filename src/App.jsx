import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
         <Header />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
