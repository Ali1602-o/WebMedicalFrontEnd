import React, { Component } from "react";
import {Link} from "react-router-dom"
import AuthService from "../services/auth-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import Textarea from  "react-validation/build/textarea";
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import patientService from "../services/patient-service";
import doctorService from "../services/doctor-service";

const required = value => {
  if (!value) {
    return (
      <div class="input-error-message">
        * Ce champ est obligatoire !
      </div>
    );
  }
};

const vtelephone = value => {
  const teleRegx = /^0(5|6|7)[0-9]{8}$/ 
  if (!value.match(teleRegx)) {
    return (
      <div class="input-error-message">
        * invalide (10 nombres, ex : 0612325689)
      </div>
    );
  }
};

const vname = value => {
  var unameRegex = /^[A-Za-z ]+$/;
  if (!value.match(unameRegex) || value.length < 3) {
    return (
      <div class="input-error-message">
        * format invalide 
      </div>
    );
  }
};

export default class ConsultInfo extends Component {
  

  constructor(props) {
    super(props);
    if(!this.props.location.state){
        this.props.history.push("/medecins");
        window.location.reload();
    }
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      id: this.props.location.state.id,
      prenom : this.props.location.state.prenom ,
      nom : this.props.location.state.nom,
      telephone : this.props.location.state.telephone,
      adresse : this.props.location.state.adresse,
      ville : this.props.location.state.ville,
      specialite: this.props.location.state.specialite,
      description: this.props.location.state.description ,
      status: this.props.location.state.status
    }; 
  }

  componentDidMount(){
    
  }

  render() {
    const { currentUser } = this.state;

    return (
      
      <div className="container">
        {/*Test if user is connected or not*/}
        { currentUser ? (
          <div className="container">
            <div class="page-content page-container" id="page-content">
              <div class="padding">
                  <div class="row container d-flex justify-content-center">
                      <div class="col-xl-12 col-md-18">
                          <div class="card user-card-full">
                              <div class="row m-l-0 m-r-0">
                                  <div class="col-sm-4 bg-c-lite-green-cons user-profile">
                                      <div class="card-block text-center text-white">
                                          <div class="m-b-25"> <img src={"images/doc"+this.state.id+".jpeg"} class="img-radius" alt="User-Profile-Image"/> </div>
                                          <h6 class="f-w-600" style={{color:"#3A3A3A"}}>{this.state.prenom} {this.state.nom}</h6>
                                      </div>
                                  </div>
                                  <div class="col-sm-8">
                                      <div class="card-block">
                                          <h6 class="m-b-20 p-b-5 b-b-default f-w-600"><div className="onlineoffline"> <span class={this.state.status == "1" ? "dot-red" : "dot-green"}></span>&nbsp;{this.state.status == "1" ? "Offline" : "Online"}</div></h6>
                                          <div class="row">
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Spécialite</p>
                                                  <h6 class="text-muted f-w-400">{this.state.specialite}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Telephone</p>
                                                  <h6 class="text-muted f-w-400">{this.state.telephone}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Adresse</p>
                                                  <h6 class="text-muted f-w-400">{this.state.adresse}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Ville</p>
                                                  <h6 class="text-muted f-w-400">{this.state.ville}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600"><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>{"  "}Lien pour commencer votre consultation :</p>
                                                    {this.state.status == "2" ? (
                                                        <a
                                                        href="#"
                                                        >
                                                            {"https://meet.google.com/mso-irce-smv"}
                                                        </a>
                                                    ) : 
                                                    
                                                        "Le Médcin est Offline !"
                                                    }
                                                </div>
                                              
                                          </div>
                                          
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">More Infos</h6>
                                            <div class="row">
                                                <div class="col-sm-6" style={{whiteSpace: "pre"}}>
                                                    <p class="m-b-10 f-w-600">Description</p>
                                                    {this.state.description}
                                                </div>
                                                
                                               
                                            </div><br/>
                                            <button className="btn btn-block login-button" style={{backgroundColor:"tomato"}}><Link to={"/medecins"} style={{textDecoration:"none",color:"white"}}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>{"  "}Retour</Link></button>
                                          
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          </div>
          </div>
        ) : (
          <div> 
            <header class="alert alert-warning" style={{border:"1px solid tomato"}}>
            <h3>
              <strong >Not Connected yet !</strong>
              <br/>
              <br/>
              <button className="btn btn-block login-button" ><Link to={"/login"} style={{textDecoration:"none",color:"white"}}>Login</Link></button>
            </h3>
            </header>
          </div>
        )}
        
      </div>
    );
  }
}