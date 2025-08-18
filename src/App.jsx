import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
import { Toaster } from './components/ui/toaster'; // <-- added

function App() {
  return (

    <Router>
         <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <div className="min-h-screen bg-gray-50">
         <Header />
        <AppRoutes />

        <Toaster /> {/* mounted once at root so toast UI is available app-wide */}
      </div>
      </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;


