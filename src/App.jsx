import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { DashboardAction, DashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import "./index.css";
import Main, { mainLoader } from "./layouts/Main";
import logoutAction from "./actions/logout";
import deleteBudget from "./actions/deleteBudget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpensesPage, {
  expenseAction,
  ExpensesLoader,
} from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: DashboardLoader,
        action: DashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: ExpensesLoader,
        action: expenseAction,
        errorElement: <Error />,
      },
      {
        path: "budget/:name",
        element: <BudgetPage />,
        loader: budgetLoader,
        errorElement: <Error />,
        action: budgetAction,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
