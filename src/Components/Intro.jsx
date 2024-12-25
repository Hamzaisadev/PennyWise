import React from "react";
import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.jpg";
import { useFetcher } from "react-router-dom";

const Intro = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today
        </p>
        <fetcher.Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your Name"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn--dark"
          >
            {isSubmitting ? (
              <span>Creating user...</span>
            ) : (
              <>
                <span>Create Account</span>
                <UserPlusIcon width={22} />
              </>
            )}
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};

export default Intro;
