import React from "react";
import './styles.css'

const Header = (props) => {
  return (
    <>
      <header className="main-header">
        <a href="/" className="logo">
          <span className="logo-lg">
            {/* <img src={Logo} width="40" height="40" alt="logo sgpo" /> */}
            <b>SGPO</b>
          </span>
        </a>
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="navbar-collapse">
            <ul className="nav navbar-nav navbar-right menu-top">
              <li>
                <a href="#" className="item-menu-top">
                  <i className="fa fa-sign-out"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
