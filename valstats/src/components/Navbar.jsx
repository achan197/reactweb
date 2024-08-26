import React from "react";
import Logo from "../img/chansey2.png";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav_container">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt=""></img>
          </Link>
        </div>
        <div className="nav_menu">
          <ul className="nav_list">
            <li>
              <NavLink className="nav_link" to={"/"}>
                <h6>Home</h6>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav_link" to={"/teams"}>
                <h6>Teams</h6>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav_link" to={"/matchup"}>
                <h6>Matchup</h6>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
