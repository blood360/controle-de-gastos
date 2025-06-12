import React from 'react';

const ExpenseList = ({ title, items }) => {
  return (
    <div className="list">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.type || item.item}: R$ {item.value.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;