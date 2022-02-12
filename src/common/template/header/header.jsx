import React from "react";
import { Link } from "react-router-dom";
import './styles.css'
import {logout} from '../../../services/auth'

const Header = () => {
  return (
    <>
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-lg">
            <b>SGPO</b>
          </span>
        </Link>
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="navbar-collapse">
            <ul className="nav navbar-nav navbar-right menu-top">
              <li>
                <Link to className="item-menu-top" onClick={logout} title="Sair">
                  <i className="fa fa-sign-out"></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
