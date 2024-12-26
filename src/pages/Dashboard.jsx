import { Link, useLoaderData } from "react-router-dom";
import {
  calculateSpentByBudget,
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  getAllMatchingItems,
  wait,
} from "../helper";
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";
import AddExpenseForm from "../Components/AddExpenseForm";
import BudgetItem from "../Components/BudgetItem";
import Table from "../Components/Table";
import { parseCurrency } from "../utils/format";

export function DashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function DashboardAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, newExpenseColor, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName} To PennyWise`);
    } catch (e) {
      const error = new Error("There was a problem creating your account");
      error.code = "500";

      throw error;
    }
  }

  if (_action === "createBudget") {
    createBudget({
      name: values.newBudget,
      amount: values.newBudgetAmount,
    });
    try {
      return toast.success(
        <span>
          The budget <span className="accent">{values.newBudget}</span> was
          created at Rs.{" "}
          <span className="accent">{values.newBudgetAmount}</span>/-
        </span>
      );
    } catch (e) {
      const error = new Error("There was a problem creating your budget");
      error.code = "500";
      throw error;
    }
  }
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

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  console.log(expenses);

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        Veiw all Expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
