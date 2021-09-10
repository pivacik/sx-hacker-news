import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../misc/icons/arrow-left.svg";
export const Navbar = ({ match }) => {
  const path = match.path;

  const storyOpened = path !== "/";
  return (
    <nav>
      <section>
        {storyOpened && (
          <Link to="/">
            <ArrowLeft className="icon-back" />
          </Link>
        )}
        <h1>Hacker News</h1>
      </section>
    </nav>
  );
};
