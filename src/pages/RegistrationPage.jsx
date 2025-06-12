import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';

export default function RegistrationPage() {
  return (
    <div className="auth-container">
      <h1>Crie sua Conta</h1>
      <RegistrationForm />
      <p style={{ marginTop: '1rem' }}>
        Já tem uma conta? <Link to="/login">Faça o login</Link>
      </p>
    </div>
  );
}