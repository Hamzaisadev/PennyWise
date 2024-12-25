import { CurrencyRupeeIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const [amount, setAmount] = useState("");

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      setAmount("");
    }
  }, [isSubmitting]);

  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = formatAmount(rawValue);
    setAmount(formattedValue);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Budget Amount</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., Rs/. 15,000"
            inputMode="numeric"
            required
            autoComplete="off"
          />
          <input type="hidden" name="_action" value="createBudget" />

          <button
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Creating budget...</span>
            ) : (
              <>
                <span>Create Budget</span>
                <CurrencyRupeeIcon width={20} />
              </>
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
