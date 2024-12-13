import React from "react";

import { TrashIcon } from "@heroicons/react/24/solid";

import logoMark from "../assets/Complete-logo.png";
import { Form, NavLink } from "react-router-dom";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={logoMark} alt="" width={230} />
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (
              !confirm(
                "Are you sure you want to logout. This will delete all you data."
              )
            ) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={22} />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
