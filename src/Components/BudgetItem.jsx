import React from "react";
import {
  formatCurrency,
  formatPercentage,
  parseCurrency,
} from "../utils/format";
import { calculateSpentByBudget } from "../helper";

const BudgetItem = ({ budget }) => {
  const { id, name, amount, color } = budget;
  const amountInNum = parseCurrency(amount);
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>Rs {amount} Budgeted</p>
      </div>
      {console.log(spent, amount, amountInNum)}
      <progress max={amountInNum} value={spent}>
        {formatPercentage(spent / amountInNum)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(parseCurrency(amount) - spent)} remaining</small>
      </div>
    </div>
  );
};

export default BudgetItem;
