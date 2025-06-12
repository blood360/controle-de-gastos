import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('currentUser')));
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('users')) || []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const register = (username, password) => {
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      alert("Usuário já existe!");
      return false;
    }
    const newUser = {
      username,
      password,
      data: {
        salary: 0,
        extraIncome: [],
        fixedExpenses: [],
        purchases: []
      }
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    alert("Registro bem-sucedido! Agora você pode fazer o login.");
    return true;
  };

  const login = (username, password) => {
    const userAccount = users.find(u => u.username === username && u.password === password);
    if (userAccount) {
      const userData = { username: userAccount.username };
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
      return true;
    }
    alert("Usuário ou senha inválidos.");
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const updateUserData = (username, newData) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.username === username ? { ...user, data: newData } : user
      )
    );
  };

  return (
    // AQUI ESTÁ A GARANTIA DA CORREÇÃO: `users` está sendo fornecido no value.
    <AuthContext.Provider value={{ user: currentUser, users, register, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);