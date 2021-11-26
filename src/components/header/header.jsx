import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
// import "./header.css";
import {logout} from '../../services/auth'
import Logo from "../../assets/logosgpo.png";
import './header.css'

import { Link } from "react-router-dom";

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
              <li><a href="#" className="item-menu-top">Logout</a></li>
           </ul>
        </div>
      </nav>
    </header> 
    </>
  );
};

export default Header;
