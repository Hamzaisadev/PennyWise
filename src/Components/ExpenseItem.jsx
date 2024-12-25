import React from "react";
import { formatCurrency, formatDate, parseCurrency } from "../utils/format";

const ExpenseItem = ({ expense }) => {
  return (
    <>
      <td> {expense.name} </td>
      <td> {formatCurrency(parseCurrency(expense.amount))} </td>
      <td> {formatDate(expense.createdAt)} </td>
    </>
  );
};

export default ExpenseItem;
