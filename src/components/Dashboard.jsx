import React from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  const data = useData();
  const { logout } = useAuth();

  if (!data) {
    return <div>Carregando...</div>;
  }

  // Pegando as novas funções do contexto
  const {
    salary, setSalary,
    totalIncome, totalExpenses, balance,
    extraIncome, fixedExpenses, purchases,
    deleteExtraIncome, deleteFixedExpense, deletePurchase // <-- Nossas novas funções
  } = data;

  return (
    <div className="dashboard">
      <header>
        <h1>Meu Gerenciador de Gastos</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <div className="summary">
        <div className="form-group salary-input">
          <label htmlFor="salary">Salário Mensal (R$):</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
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
        {/* Passando a função de exclusão correta para cada lista */}
        <ExpenseList title="Rendas Extras" items={extraIncome} handleDelete={deleteExtraIncome} />
        <ExpenseList title="Gastos Fixos" items={fixedExpenses} handleDelete={deleteFixedExpense} />
        <ExpenseList title="Compras" items={purchases} handleDelete={deletePurchase} />
      </div>
    </div>
  );
};

export default Dashboard;