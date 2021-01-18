import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import Logo from "../../assets/movie-db-logo.svg";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img width="72" src={Logo} alt="MovieDB logo" />
        </div>
      </Link>
      <Link to="/favourites">
        <div className="header__favourites">
          <span>Избранное</span>
        </div>
      </Link>
    </div>
  );
};

export default Header;
