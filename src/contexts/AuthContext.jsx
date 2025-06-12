import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage('users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null); // Salva o usuário logado

  // Função para registrar um novo usuário
  const register = (username, password) => {
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      alert('Este nome de usuário já existe. Por favor, escolha outro.');
      return false;
    }
    const newUser = { username, password };
    setUsers(prevUsers => [...prevUsers, newUser]);
    alert('Usuário registrado com sucesso! Agora você pode fazer o login.');
    return true;
  };

  // Função para fazer login
  const login = (username, password) => {
    const userAccount = users.find(u => u.username === username && u.password === password);
    if (userAccount) {
      setCurrentUser(userAccount); // Salva o usuário inteiro no estado
      return true;
    }
    alert('Usuário ou senha inválidos.');
    return false;
  };

  // Função para fazer logout
  const logout = () => {
    setCurrentUser(null); // Limpa o usuário logado
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};