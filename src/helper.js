import { parseCurrency } from "./utils/format";

export const wait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    budgetId: budgetId,
    amount: amount,
  };
  const existingExpenses = fetchData("Expenses") ?? [];
  return localStorage.setItem(
    "Expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("Expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return (acc += parseCurrency(expense.amount));
  }, 0);
  return budgetSpent;
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
