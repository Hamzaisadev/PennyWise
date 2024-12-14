import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData, wait } from "../helper";
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";

export function DashboardLoader() {
  const userName = fetchData("userName");
  const budget = fetchData("budget");
  return { userName, budget };
}

export async function DashboardAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  console.log(_action);
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
      return toast.success(`Budget  Is Created`);
    } catch (e) {
      const error = new Error("There was a problem creating your budget");
      error.code = "500";
      throw error;
    }
  }
}

const Dashboard = () => {
  const { userName, budget } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome Back , <span className="accent">{userName}</span>
          </h1>

          <div className="grid-sm">
            {/* {budget ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
