import React from "react";
import SideBar from '../sidebar/sidebar'
import Header from '../header/header'
import Footer from "../footer/footer";
import './styles.css'

const Layout = ({ children }) => {
  return (
    <>
      <div className="skin-blue layout">
        <div className="wrapper">
          <Header />
          <SideBar />
          <div className="content-wrapper">
              {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
