import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

// O contexto é criado aqui, corretamente
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const userStorageKey = currentUser ? `userData_${currentUser.username}` : null;
  
  // Voltamos a usar o useLocalStorage, que sabemos que funciona
  const [data, setData] = useLocalStorage(userStorageKey, {
    salary: 0,
    extraIncome: [],
    fixedExpenses: [],
    purchases: [],
  });

  if (!currentUser) {
    return children;
  }

  // --- Funções de Lógica ---
  const setSalary = (newSalary) => {
    setData(prevData => ({ ...prevData, salary: Number(newSalary) || 0 }));
  };
  const addExtraIncome = (income) => {
    const newIncome = { ...income, id: Date.now() };
    setData(prevData => ({ ...prevData, extraIncome: [...prevData.extraIncome, newIncome] }));
  };
  const addFixedExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now() };
    setData(prevData => ({ ...prevData, fixedExpenses: [...prevData.fixedExpenses, newExpense] }));
  };
  const addPurchase = (purchase) => {
    const newPurchase = { ...purchase, id: Date.now() };
    setData(prevData => ({ ...prevData, purchases: [...prevData.purchases, newPurchase] }));
  };
  const deleteExtraIncome = (id) => {
    setData(prevData => ({...prevData, extraIncome: prevData.extraIncome.filter(item => item.id !== id)}));
  };
  const deleteFixedExpense = (id) => {
    setData(prevData => ({...prevData, fixedExpenses: prevData.fixedExpenses.filter(item => item.id !== id)}));
  };
  const deletePurchase = (id) => {
    setData(prevData => ({...prevData, purchases: prevData.purchases.filter(item => item.id !== id)}));
  };

  const { salary = 0, extraIncome = [], fixedExpenses = [], purchases = [] } = data || {};
  const totalIncome = salary + extraIncome.reduce((acc, curr) => acc + curr.value, 0);
  const totalExpenses = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0) + purchases.reduce((acc, curr) => acc + curr.value, 0);
  const balance = totalIncome - totalExpenses;

  const value = {
    salary, extraIncome, fixedExpenses, purchases,
    setSalary, addExtraIncome, addFixedExpense, addPurchase,
    deleteExtraIncome, deleteFixedExpense, deletePurchase,
    totalIncome, totalExpenses, balance,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// AQUI ESTÁ A CORREÇÃO CRÍTICA E FINAL
// O hook agora aponta para o contexto correto: DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};