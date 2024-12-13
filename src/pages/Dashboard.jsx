import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helper";
import Intro from "../Components/Intro";
import { toast } from "react-toastify";

export function DashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export async function DashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome ${formData.userName} To PennyWise`);
  } catch (e) {
    const error = new Error("There was a problem creating your account");
    error.code = "500";
    throw error;
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default Dashboard;
