import React, { Component } from "react";
import AuthService from "../services/auth-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import patientService from "../services/patient-service";


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
      prenom : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().prenom : "",
      nom : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().nom : "",
      telephone : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().telephone : "",
      dtNaissance : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().dtNaissance : null,
      successful: false,
      message: "",
      loading : false
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
      dtNaissance: e.target.value
    });
  }

  onChangeTelephone(e){
    this.setState({
      telephone: e.target.value
    })
  }

  handleEdit(e){
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    
    if (this.checkBtn.context._errors.length === 0) {
        patientService.addInfoProfile(
          this.state.currentUser.id,
          this.state.prenom,
          this.state.nom,
          this.state.dtNaissance,
          this.state.telephone
        ).then(
          () => {
            patientService.profileById(this.state.currentUser.id);
            this.props.history.push("/profile");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              successful: false,
              loading : false,
              message: resMessage
            });
          }
        );

    }
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
                                                  <p class="m-b-10 f-w-600">Prénom</p>
                                                  <h6 class="text-muted f-w-400">{this.state.prenom ? this.state.prenom : "pas encore ajouté."}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Nom</p>
                                                  <h6 class="text-muted f-w-400">{this.state.nom ? this.state.nom : "pas encore ajouté."}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Date de Naissance</p>
                                                  <h6 class="text-muted f-w-400">{this.state.dtNaissance ? this.state.dtNaissance : "pas encore ajouté."}</h6>
                                              </div>
                                              <div class="col-sm-6">
                                                  <p class="m-b-10 f-w-600">Telephone</p>
                                                  <h6 class="text-muted f-w-400">{this.state.telephone ? this.state.telephone : "pas encore ajouté."}</h6>
                                              </div>
                                          </div>
                                          <Form 
                                            onSubmit={this.handleEdit} 
                                            ref={c => {
                                              this.form = c;
                                            }}
                                          >
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Modification de profil</h6>
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
                                              className="btn btn-block login-button"
                                              disabled={this.state.loading}
                                            >
                                              {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                              )}
                                              <span>Edit</span>
                                            </button>
                                            {this.state.message && (
                                              <div className="form-group">
                                                <div
                                                  className={
                                                    this.state.successful
                                                      ? "alert alert-success"
                                                      : "alert alert-danger"
                                                  }
                                                  role="alert"
                                                >
                                                  {this.state.message}
                                                </div>
                                              </div>
                                            )}

                                            <CheckButton
                                              style={{ display: "none" }}
                                              ref={c => {
                                                this.checkBtn = c;
                                              }}
                                            />
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