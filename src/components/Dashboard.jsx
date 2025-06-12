import React from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm';
import ExpenseList from './ExpenseList';

const Dashboard = () => {
  const data = useData();
  const { logout } = useAuth();

  // Trava de segurança: Verifica se o contexto foi carregado corretamente
  if (!data || typeof data.setSalary !== 'function') {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
        Ocorreu um erro ao carregar os dados. Por favor, tente recarregar a página ou fazer login novamente.
      </div>
    );
  }

  const {
    salary,
    setSalary,
    totalIncome,
    totalExpenses,
    balance,
    extraIncome,
    fixedExpenses,
    purchases
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
            onChange={(e) => setSalary(Number(e.target.value) || 0)}
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
        <ExpenseList title="Rendas Extras" items={extraIncome} />
        <ExpenseList title="Gastos Fixos" items={fixedExpenses} />
        <ExpenseList title="Compras" items={purchases} />
      </div>
    </div>
  );
};

export default Dashboard;