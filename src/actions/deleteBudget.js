import { deleteItem } from "../helper";

export default function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.name,
    });
    return toast.success("Budget deleted!");
  } catch (e) {
    throw new Error("There was a problem deleting your Budget.");
  }
}
