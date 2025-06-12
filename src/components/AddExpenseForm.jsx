import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const AddExpenseForm = () => {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('compra'); // 'compra' ou 'fixo'
  const { addFixedExpense, addPurchase } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { item, value: Number(value) };
    if (type === 'fixo') {
      addFixedExpense(expense);
    } else {
      addPurchase(expense);
    }
    setItem('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Adicionar Despesa</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="compra">Compra</option>
        <option value="fixo">Gasto Fixo</option>
      </select>
      <input
        type="text"
        placeholder="Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AddExpenseForm;