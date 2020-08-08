import React from "react";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateHome from "./components/auth/CreateHome";
import Landing_Page from "./components/layout/Landing_Page";
import Home from "./components/layout/Home_Details";
import Dashboard from "./components/dashboard/Dashboard";
import Gallery from "./components/layout/Gallery"
import PrivateRoute from "./components/private-route/PrivateRoute"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing_Page} />
            <Route exact path="/home/:id" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/createhome" component={CreateHome} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/gallery" component={Gallery} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
