import React from "react";
import "./Error.css";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div class="main_wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-6 align-self-center error">
            <h1>{error.code}</h1>
            <h2>UH OH! we've got a problem.</h2>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
              <button className="btn btn--dark" onClick={() => navigate(-1)}>
                <ArrowUturnLeftIcon width={22} />
                <span>Go Back</span>
              </button>
              <Link to="/" className="btn btn--dark">
                <HomeIcon width={22} />
                <span>Go home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
