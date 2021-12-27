import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();
  const { actions, store } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
              actions.logout();
              if (!store.logged) history.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
