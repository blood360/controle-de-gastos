import React from 'react';

// O componente agora recebe uma nova propriedade: 'handleDelete'
const ExpenseList = ({ title, items, handleDelete }) => {
  return (
    <div className="list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <span>
              {/* O nome do item pode ser 'item' (compras/fixos) ou 'type' (renda extra) */}
              {item.item || item.type}: R$ {item.value.toFixed(2)}
            </span>
            {/* O botão de excluir chama a função handleDelete passando o ID do item */}
            <button onClick={() => handleDelete(item.id)} className="delete-btn">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;