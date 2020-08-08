import React from "react";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateHome from "./components/auth/CreateHome";
import Homes from "./components/layout/Homes";
import Home from "./components/layout/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Gallery from "./components/layout/Gallery"

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homes} />
            <Route exact path="/home/:id" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/createhome" component={CreateHome} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/gallery" component={Gallery} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
