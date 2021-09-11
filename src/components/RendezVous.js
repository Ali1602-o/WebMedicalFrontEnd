import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import patientService from "../services/patient-service";
import BookService from "../services/book-service";
import AuthService from "../services/auth-service";
import {Link} from "react-router-dom"
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const required = value => {
  if (!value) {
    return (
      <div class="input-error-message">
        * Ce champ est obligatoire !
      </div>
    );
  }
};

const vnom = value => {
  var nomRegex = /^[a-z ,.'-]+$/i;
  if (!value.match(nomRegex)) {
    return (
      <div class="input-error-message">
        * nom invalide (ex : imane )
      </div>
    );
  }
};

const vprenom = value => {
  var prenomRegex = /^[a-z ,.'-]+$/i;
  if (!value.match(prenomRegex)) {
    return (
      <div class="input-error-message">
        * nom invalide (ex : krioutate )
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

const vlengthnom = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div class="input-error-message">
        * nombre de caractéres doit être entre 3 et 20 caractéres !
      </div>
    );
  }
};

const vlengthprenom = value => {
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


export default class RendezVous extends Component {


  constructor(props) {
    super(props);
    this.handleReserv = this.handleReserv.bind(this);
    this.onChangenom = this.onChangenom.bind(this);
    this.onChangeprenom = this.onChangeprenom.bind(this);
    this.onChangetelephone = this.onChangetelephone.bind(this);
    this.onChangeDtreservation = this.onChangeDtreservation.bind(this);
    this.onChangeheure = this.onChangeheure.bind(this);





    this.state = {
      prenom : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().prenom : "",
      nom : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().nom : "",
      telephone : patientService.getCurrentUserInfos() ? patientService.getCurrentUserInfos().telephone : "",
      dtreservation : "",
      heure: "",
      user: AuthService.getCurrentUser() ? AuthService.getCurrentUser().id : 0 ,
      medecinId: this.props.location.state.id,
      successful: false,
      message: ""
    };
  }

  onChangenom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangeprenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }

  onChangetelephone(e) {
    this.setState({
      telephone: e.target.value
    });
  }

  onChangeDtreservation(e) {
    this.setState({
      dtreservation: e.target.value
    });
  }
  onChangeheure(e) {
    this.setState({
      heure: e.target.value
    })
  }


  handleReserv(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      BookService.addReservation(
        this.state.prenom,
        this.state.nom,
        this.state.telephone,
        this.state.dtreservation,
        this.state.heure,
        this.state.user,
        this.state.medecinId
      ).then(
        response => {
          this.setState({
            message: response.data.message ? response.data.message : "Votre réservation est effectué avec succés! ",
            successful: true
          });
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
            message: resMessage
          });
        }
      );
    }
  }
  onChangeheure(e) {
    this.setState({
      heure: e.target.value
    })
  }


  render() {
    return (
      <Container>
        <div className="col-md-12 login-container">
          <div className="row">
            <div className="col-md-5 compImage">
              <img src="./images/rdv.jpeg" style={{marginTop:"150px"}}/>
            </div>
            <div className="col-md-7 login-form" align="center">
            <button className="btn btn-block login-button" style={{backgroundColor:"tomato",width: "auto"}}><Link to={"/medecins"} style={{textDecoration:"none",color:"white"}}><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></Link></button>
              <br/> <br/> <br/>
              <h2>Réservez votre Rendez-vous  !</h2>
              <br />
              <p> Remplissez le formulaire ci-dessous. Nous vous recontacterons bientôt pour de plus informations.</p>
              
              <Form onSubmit={this.handleReserv} ref={c => {
                this.form = c;
              }}>
                {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="nom"
                      placeholder="Entrez votre nom"
                      value={this.state.nom}
                      onChange={this.onChangenom}
                      validations={[required, vnom, vlengthnom]}
                    />
                  </div>


                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="prenom"
                      placeholder="Entrez votre prenom"
                      value={this.state.prenom}
                      onChange={this.onChangeprenom}
                      validations={[required, vprenom, vlengthprenom]}
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
                      type="date"
                      className="form-control"
                      name="dtNaissance"
                      placeholder="jj/mm/aaaa"
                      value={this.state.dtNaissance}
                      onChange={this.onChangeDtNaissance}
                      validations={[required]}
                    />
                  </div>
                  <div className="form-group">
                    <Select
                      className="form-control"
                      name="heure"
                      value={this.state.heure}

                      onChange={this.onChangeheure}
                      validations={[required]}
                    >
                      <option>Choisissez l'heure de rendez-vous:</option>
                      <option value='09:00 AM'>09:00 AM </option>
                      <option value='11:00 AM'>11:00 AM </option>
                      <option value='14:00 PM'>14:00 PM</option>

      

                    </Select>
                  </div>

                  <div className="form-group">

                    <Select
                      type="date"
                      className="form-control"
                      name="dtreservation"
                      placeholder="jj/mm/aaaa"
                      value={this.state.dtreservation}
                      onChange={this.onChangeDtreservation}
                      validations={[required]}
                    >
                      <option>Choisissez la date de rendez-vous:</option>
                      <option value='13-09-2021'>13-09-2021 </option>
                      <option value='15-09-2021'>15-09-2021 </option>
                      <option value='16-09-2021'>16-09-2021</option>
 
                    </Select>

                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block login-button">Réservez</button>
                  </div>
                  

                </div>
                )}
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
      </Container>
    );
  }
}

