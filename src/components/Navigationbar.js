import React from "react";
import {Link} from "react-router-dom";
import {Container} from 'react-bootstrap'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AuthService from "../services/auth-service";

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showDoctorBoard: false,
          currentUser: undefined,
        };
    }
    
    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
            currentUser: user,
            showDoctorBoard: user.roles.includes("ROLE_DOCTOR"),
            });
        }
    }
    
    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showDoctorBoard } = this.state;
        return (

                <nav className="navbar navbar-expand navbar-light bg-white menu-bar">
                    <Container>
                    <Link to={"/"} className="navbar-brand">
                        <img src="./images/logo_webmedical.jpg" width="123" height="41"/>
                    </Link>
                    <div className="navbar-nav mr-auto navg-bar">
                        <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to={"/consultations"} className="nav-link">
                            Consulter
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Médecins
                        </Link>
                        </li>

                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                            {currentUser.username}
                            </Link>
                        </li>

                        

                        
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                            LogOut
                            </a>
                        </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                        <li className="nav-item auth-bar">
                            <Link to={"/login"} className="nav-link">
                            Login
                            </Link>
                        </li>

                        <li className="nav-item auth-bar signup-bar">
                            <Link to={"/register"} className="nav-link">
                            S'inscrire
                            </Link>
                        </li>
                        </div>
                    )}
                    </Container>
                </nav>
        ); 
    } 
} 
    
export default NavigationBar;