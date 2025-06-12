import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const AddIncomeForm = () => {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const { addExtraIncome } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExtraIncome({ type, value: Number(value) });
    setType('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Adicionar Renda Extra</h3>
      <input
        type="text"
        placeholder="Tipo de Renda"
        value={type}
        onChange={(e) => setType(e.target.value)}
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

export default AddIncomeForm;