import React from "react";
import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helper";
import Table from "./../Components/Table";
import { toast } from "react-toastify";

export async function ExpensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expenseAction({ request }) {
  const data = await request.formData();
  const { _action, newExpenseColor, ...values } = Object.fromEntries(data);
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

const ExpensePage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to Show</p>
      )}
    </div>
  );
};

export default ExpensePage;
