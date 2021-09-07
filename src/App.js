import React, { Component } from "react";
import { Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavigationBar from "./components/Navigationbar";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import BoardUser from "./components/user-board";
import BoardDoctor from "./components/doctor-board";
import RendezVous from "./components/RendezVous";
import Consultations from "./components/consultations";
import Footer from "./components/Footer";
import authService from "./services/auth-service";


class App extends Component {
  constructor(props){
    super(props);

    this.state = authService.getCurrentUser();
  }
  
  render() {
    return (
      <div>
        <NavigationBar/>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            {!this.state ? <Route exact path="/login" component={Login} /> : <Route exact path="/login" component={Profile} /> }
            {!this.state ? <Route exact path="/register" component={Register} /> : <Route exact path="/register" component={Profile} /> }
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/doctor" component={BoardDoctor} />
            <Route path="/rendezvous" component={RendezVous} />
            <Route path="/consultations" component={Consultations} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;