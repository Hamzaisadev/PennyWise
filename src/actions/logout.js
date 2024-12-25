import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export default function logoutAction() {
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });

  toast.success("You've have deleted your account");

  return redirect("/");
}
