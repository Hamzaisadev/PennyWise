import React from "react";
import {
  calculateSpentByBudget,
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../helper";
import { useLoaderData } from "react-router-dom";
import BudgetItem from "../Components/BudgetItem";
import AddExpenseForm from "./../Components/AddExpenseForm";
import Table from "../Components/Table";
import { toast } from "react-toastify";
import { parseCurrency } from "../utils/format";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: budget.id,
  });
  if (!budget) {
    throw new Error("The Budget You Are Trying to find Doesn't Exist");
  }
  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, newExpenseColor, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    const amountInNum = parseCurrency(values.newExpenseAmount);
    const spent = calculateSpentByBudget(values.newExpenseBudget);
    const budget = getAllMatchingItems({
      category: "budgets",
      key: "id",
      value: values.newExpenseBudget,
    })[0];

    const remainingAmount = parseCurrency(budget.amount) - spent;

    if (remainingAmount < amountInNum) {
      return toast.error(
        "You do not have enough budget to create this expense."
      );
    } else {
      try {
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget,
        });
        return toast.success(
          <span>
            The Expense <span className="accent">{values.newExpense}</span> was
            created at Rs.{" "}
            <span className="accent">{values.newExpenseAmount}</span>/-
          </span>
        );
      } catch (e) {
        const error = new Error("There was a problem creating your Expense");
        error.code = "500";
        throw error;
      }
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg " style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent"> {budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
