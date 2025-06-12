import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// O contexto de dados é criado aqui
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user, users, updateUserData } = useAuth();

  const [salary, setSalary] = useState(0);
  const [extraIncome, setExtraIncome] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userAccount = users && users.find(u => u.username === user.username);
      
      if (userAccount && userAccount.data) {
        setSalary(userAccount.data.salary || 0);
        setExtraIncome(userAccount.data.extraIncome || []);
        setFixedExpenses(userAccount.data.fixedExpenses || []);
        setPurchases(userAccount.data.purchases || []);
      }
      setIsLoading(false);
    } else if (!user) {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }
    const newData = { salary, extraIncome, fixedExpenses, purchases };
    updateUserData(user.username, newData);
  }, [salary, extraIncome, fixedExpenses, purchases]);

  const addExtraIncome = (income) => {
    setExtraIncome(prev => [...prev, income]);
  };

  const addFixedExpense = (expense) => {
    setFixedExpenses(prev => [...prev, expense]);
  };

  const addPurchase = (purchase) => {
    setPurchases(prev => [...prev, purchase]);
  };

  const totalIncome = salary + extraIncome.reduce((acc, curr) => acc + curr.value, 0);
  const totalExpenses =
    fixedExpenses.reduce((acc, curr) => acc + curr.value, 0) +
    purchases.reduce((acc, curr) => acc + curr.value, 0);
  const balance = totalIncome - totalExpenses;

  if (isLoading && user) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>Carregando seus dados...</div>;
  }
  
  return (
    <DataContext.Provider
      value={{
        salary,
        setSalary,
        extraIncome,
        addExtraIncome,
        fixedExpenses,
        addFixedExpense,
        purchases,
        addPurchase,
        totalIncome,
        totalExpenses,
        balance,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// AQUI ESTÁ A CORREÇÃO: Usando o DataContext correto
export const useData = () => useContext(DataContext);