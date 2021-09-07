import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import li from "react-validation/build/select";
import { isEmail } from "validator";
import ReactDOM from 'react-dom';


const required = value => {
  if (!value) {
    return (
      <div class="input-error-message">
        * Ce champ est obligatoire !
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div class="input-error-message">
        * email invalide (ex : user@gmail.com)
      </div>
    );
  }
};

const vusername = value => {
  var unameRegex = /^[a-z\_]+[0-9a-z]*$/;
  if (!value.match(unameRegex)) {
    return (
      <div class="input-error-message">
        * username invalide (ex : user_12, user12)
      </div>
    );
  }
};


const vadresse = value => {
  var adresseRegex = /^[a-z\_]+[0-9a-z]*$/;
  if (!value.match(adresseRegex)) {
    return (
      <div class="input-error-message">
        * adresse invalide (ex : ville_quartier)
      </div>
    );
  }
};

const vtelephone = value => {
  var teleRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  if (!value.match(teleRegex)) {
    return (
      <div class="input-error-message">
        * Numéro de téléphone invalide (ex : (212)0646789, 21263456789)
      </div>
    );
  }
};


const vlengthUsername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div class="input-error-message">
        * nombre de caractéres doit être entre 3 et 20 caractéres !
      </div>
    );
  }
};


const vlengthtelephone = value => {
  if (value.length < 10 || value.length > 14) {
    return (
      <div class="input-error-message">
        * nombre de caractéres doit être entre 10 et 14 caractéres !
      </div>
    );
  }
};


const vlengthadresse = value => {
  if (value.length < 10 || value.length > 50) {
    return (
      <div class="input-error-message">
        * nombre de caractéres doit être entre 10 et 50 caractéres !
      </div>
    );
  }
};

export default class RendezVous extends Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeSexe = this.onChangeSexe.bind(this);
    this.onChangetelephone = this.onChangetelephone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeadresse = this.onChangeadresse.bind(this);



    this.state = {
      username: "",
      sexe: [] ,
      telephone : "",
      email: "",
      adresse : "",
    
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }


  onChangetelephone(e) {
    this.setState({
      telephone: e.target.value
    });
  }

  onChangeSexe(e){
    this.setState({
      sexe: e.target.value
    })
  }

  onChangeadresse(e) {
    this.setState({
      adresse: e.target.value
    });
  }


  render() {
    return (
      <Container>
        <div className="col-md-12 login-container">
          <div className="row">
            <div className="col-md-5 compImage">
              <img src="./images/doctor illustration.png" />
            </div>
            <div className="col-md-7 login-form" align="center">
              <h2>Réservez votre Rendez-vous  !</h2>
              <br />
              <p> Remplissez le formulaire ci-dessous. Nous vous recontacterons bientôt pour de plus amples informations.</p>

              <Form >
                <div>
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Entrez votre username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername, vlengthUsername]}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="telephone"
                      placeholder="Numéro de téléphone"                      
                      value={this.state.telephone}
                      onChange={this.onChangetelephone}
                      validations={[required, vtelephone, vlengthtelephone]}
                    />
                  </div>
                  

                  
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Entrez votre email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>

                


                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="adresse"
                      placeholder="Entrez votre adresse"
                      value={this.state.adresse}
                      onChange={this.onChangeadresse}
                      validations={[required, vadresse , vlengthadresse ]}
                    />
                  </div> 
                  
                   <div className="form-group">
                    <Select
                      className="form-control"
                      name="sexe"
                      value={this.state.sexe}
                      onChange={this.onChangeSexe}
                      validations={[required]}
                    >
                      <option >  Sexe :</option>
                      <option value={['Masculin']}>Masculin</option>
                      <option value={['feminine']}>féminine</option>
                    </Select>
                  </div>





         







                  <div className="form-group">
                    <button  className="btn btn-primary btn-block login-button">Réservez</button>
                  </div>

                </div>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
