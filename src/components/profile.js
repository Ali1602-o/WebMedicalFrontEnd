import React, { Component } from "react";
import AuthService from "../services/auth-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      
      <div className="container">
        {currentUser ? (
          <div className="container">
            <div class="page-content page-container" id="page-content">
              <div class="padding">
                  <div class="row container d-flex justify-content-center">
                      <div class="col-xl-12 col-md-18">
                          <div class="card user-card-full">
                              <div class="row m-l-0 m-r-0">
                                  <div class="col-sm-4 bg-c-lite-green user-profile">
                                      <div class="card-block text-center text-white">
                                          <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"/> </div>
                                          <h6 class="f-w-600">{currentUser.username}</h6>
                                      </div>
                                  </div>
                                  <div class="col-sm-8">
                                      <div class="card-block">
                                          <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                          <div class="row">
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Email</p>
                                                  <h6 class="text-muted f-w-400">{currentUser.email}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Telephone</p>
                                                  <h6 class="text-muted f-w-400">98979989898</h6>
                                              </div>
                                          </div>
                                          <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                          <div class="row">
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Recent</p>
                                                  <h6 class="text-muted f-w-400">Sam Disuja</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Most Viewed</p>
                                                  <h6 class="text-muted f-w-400">Dinoter husainm</h6>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            {/*<header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>

            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>*/}
          </div>
        ) : (
          <div> 
            <header class="alert alert-warning" style={{border:"1px solid tomato"}}>
            <h3>
              <strong >Not Connected yet !</strong>
            </h3>
            </header>
          </div>
        )}
        
      </div>
    );
  }
}