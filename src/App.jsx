import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./common/template/dependencies.js";
import {BrowserRouter as Router} from 'react-router-dom'
import AuthOrApp from "./routes/authOrApp";
import UserProvider from "./store/UserContext/userProvider";

function App() {
  return (
    <>
    <Router>
      <UserProvider>
        <AuthOrApp />
      </UserProvider>
      <ToastContainer
        style={{ textAlign: "center" }}
        limit={3}
        autoClose={3000}
        position="top-center"
        className="alerta"
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </Router>
    </>
  );
}

export default App;
