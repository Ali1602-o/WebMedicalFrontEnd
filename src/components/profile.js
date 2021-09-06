import React, { Component } from "react";
import AuthService from "../services/auth-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeDtNaissance = this.onChangeDtNaissance.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      prenom : "",
      nom : "",
      telephone : "",
      dtNaissance : null,
      successful: false,
      message: ""
    };
  }
  
  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }

  onChangeDtNaissance(e) {
    this.setState({
      dtNaissace: e.target.value
    });
  }

  onChangeTelephone(e){
    this.setState({
      telephone: e.target.value
    })
  }

  handleEdit(e){
    e.preventDefault();
    this.form.validateAll();
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
                                          </div>
                                          <Form 
                                            onSubmit={this.handleEdit} 
                                            ref={c => {
                                              this.form = c;
                                            }}
                                          >
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Completer votre profil</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Prénom</p>
                                                    <Input
                                                      type="text"
                                                      className="form-control"
                                                      name="prenom"
                                                      placeholder="Entrez votre prénom"
                                                      value={this.state.prenom}
                                                      onChange={this.onChangePrenom}
                                                      validations={[required,vname]}
                                                    />
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Nom</p>
                                                    <Input
                                                      type="text"
                                                      className="form-control"
                                                      name="nom"
                                                      placeholder="Entrez votre nom"
                                                      value={this.state.nom}
                                                      onChange={this.onChangeNom}
                                                      validations={[required,vname]}
                                                    />
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Date de naissance</p>
                                                    <Input 
                                                      type="date"
                                                      className="form-control"
                                                      name="dtNaissance"
                                                      value={this.state.dtNaissance}
                                                      onChange={this.onChangeDtNaissance}
                                                      validations={[required]}
                                                    />
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Telephone</p>
                                                    <Input
                                                      type="text"
                                                      className="form-control"
                                                      name="telephone"
                                                      placeholder="Entrez votre numero telephone"
                                                      value={this.state.telephone}
                                                      onChange={this.onChangeTelephone}
                                                      validations={[required,vtelephone]}
                                                    />
                                                </div>
                                            </div><br/>
                                            <button
                                              className="btn btn-primary btn-block login-button"
                                            >
                                              <span>Add</span>
                                            </button>
                                          </Form>
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