import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { DashboardAction, DashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import "./index.css";
import Main, { mainLoader } from "./pages/layouts/Main";
import logoutAction from "./actions/logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    ],
  },

  {
    path: "logout",
    action: logoutAction,
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
