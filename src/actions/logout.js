import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export default function logoutAction() {
  deleteItem({
    key: "userName",
  });
  toast.success("You've have deleted your account");

  return redirect("/");
}
