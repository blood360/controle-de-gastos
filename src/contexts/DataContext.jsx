import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [salary, setSalary] = useState(0);
  const [extraIncome, setExtraIncome] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const addExtraIncome = (income) => {
    setExtraIncome([...extraIncome, income]);
  };

  const addFixedExpense = (expense) => {
    setFixedExpenses([...fixedExpenses, expense]);
  };

  const addPurchase = (purchase) => {
    setPurchases([...purchases, purchase]);
  };

  const totalIncome = salary + extraIncome.reduce((acc, curr) => acc + curr.value, 0);
  const totalExpenses =
    fixedExpenses.reduce((acc, curr) => acc + curr.value, 0) +
    purchases.reduce((acc, curr) => acc + curr.value, 0);
  const balance = totalIncome - totalExpenses;

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

export const useData = () => useContext(DataContext);