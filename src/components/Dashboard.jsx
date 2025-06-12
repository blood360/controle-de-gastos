import React from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  const {
    salary,
    setSalary,
    totalIncome,
    totalExpenses,
    balance,
  } = useData();
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <header>
        <h1>Meu Gerenciador de Gastos</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <div className="summary">
        <div>
          <label>Salário:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
          />
        </div>
        <h2>Resumo Financeiro</h2>
        <p>Renda Total: R$ {totalIncome.toFixed(2)}</p>
        <p>Despesas Totais: R$ {totalExpenses.toFixed(2)}</p>
        <h3>Saldo: R$ {balance.toFixed(2)}</h3>
      </div>

      <div className="forms-container">
        <AddIncomeForm />
        <AddExpenseForm />
      </div>

      <div className="lists-container">
        <ExpenseList title="Rendas Extras" items={useData().extraIncome} />
        <ExpenseList title="Gastos Fixos" items={useData().fixedExpenses} />
        <ExpenseList title="Compras" items={useData().purchases} />
      </div>
    </div>
  );
};

export default Dashboard;