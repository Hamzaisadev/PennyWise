import React from "react";
import { formatCurrency, parseCurrency } from "../utils/format";
import { calculateSpentByBudget } from "../helper";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>Rs {amount} Budgeted</p>
      </div>
      {console.log(amount, parseCurrency(amount))}
      <progress max={parseCurrency(amount)} value="0"></progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(parseCurrency(amount) - spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
