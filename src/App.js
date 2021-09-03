import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationBar from "./components/Navigationbar";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import BoardUser from "./components/user-board";
import BoardDoctor from "./components/doctor-board";
import Footer from "./components/Footer";

class App extends Component {
  
  render() {
    return (
      <div>
        <NavigationBar/>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/doctor" component={BoardDoctor} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;