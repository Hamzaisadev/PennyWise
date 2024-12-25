import React from "react";
import { formatCurrency, formatDate, parseCurrency } from "../utils/format";
import { getAllMatchingItems } from "../helper";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/16/solid";

const ExpenseItem = ({ expense }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  console.log("l ~ ExpenseItem~ budget", budget);
  return (
    <>
      <td> {expense.name} </td>
      <td> {formatCurrency(parseCurrency(expense.amount))} </td>
      <td> {formatDate(expense.createdAt)} </td>
      <td>
        {" "}
        <Link
          className="btn"
          to={`/budget/${budget.id}`}
          style={{ "--accent": budget.color }}
        >
          {budget.name}
        </Link>{" "}
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
