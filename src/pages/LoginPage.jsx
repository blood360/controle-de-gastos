import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="auth-container">
      <h1>Login</h1>
      <LoginForm />
      <p style={{ marginTop: '1rem' }}>
        Não tem uma conta? <Link to="/registrar">Registre-se aqui</Link>
      </p>
    </div>
  );
}