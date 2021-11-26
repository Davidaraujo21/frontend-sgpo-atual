import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import SideBar from "./common/template/sidebar/sidebar";
import "./common/template/dependencies.js";
import Routers from "./routers";
import Footer from "./common/template/footer/footer";
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="skin-blue">
        <div className="wrapper">
          <Header />
          <SideBar/>
          <div className="content-wrapper">
            <Routers />
          </div>
          <Footer />          
          <ToastContainer
            style={{ textAlign: "center" }}
            limit={3}
            autoClose={3000}
            position="top-center"
            className="alerta"
          /> 
        </div>
    </div>
    </Router>
  );
}

export default App;
