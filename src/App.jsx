import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext'; // 1. PRECISAMOS IMPORTAR O DATAPROVIDER

// Importe suas páginas e componentes
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './components/Dashboard';

import './styles.css';

// Componente para proteger rotas
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

// O conteúdo principal do App que usa os contextos
function AppContent() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/registrar" element={currentUser ? <Navigate to="/" /> : <RegistrationPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

// A função principal do App que configura os provedores
function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider> {/* 2. AQUI ESTÁ A CORREÇÃO: ENVOLVEMOS O APP COM O DATAPROVIDER */}
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;