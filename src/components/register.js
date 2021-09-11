import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth-service";
import { Container } from "react-bootstrap";

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

const vlengthUsername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div class="input-error-message">
        * nombre de caractéres doit être entre 3 et 20 caractéres !
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



const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div class="input-error-message">
        * nombre de caractéres doit être entre 6 et 40 caractéres !
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      role: [],
      successful: false,
      message: ""
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRole(e){
    this.setState({
      role: e.target.value
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.role
      ).then(
        response => {
          this.setState({
            message: response.data.message,
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

  render() {
    return (
      <Container>
      <div className="col-md-12 login-container">
        <div className="auth-nav">
          <div className="row">
            <div className="col-md-5 login-link">
              <Link to={"/login"} className="nav-link">
                  Login
              </Link>
            </div>
            <div className="col-md-5 signup-link"  >
              <Link to={"/register"} className="nav-link" style={{backgroundColor : '#85FFCC'}}>
                  S'inscrire
              </Link>
            </div>
          </div>  
        </div>
        <div className="row">
          <div className="col-md-5 compImage">
            <img src="./images/doctor illustration.png"/>
          </div>
          <div className="col-md-7 login-form" align="center">
           
            
            <h2>Crée votre Compte !</h2>
            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Entrez votre username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername,vlengthUsername]}
                      autoComplete="off"
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
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Entrez votre password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <Select
                      className="form-control"
                      name="role"
                      value={this.state.role}
                      onChange={this.onChangeRole}
                      validations={[required]}
                    >
                      <option>Crée un compte autant que :</option>
                      <option value={['user']}>Patient</option>
                      <option value={['doctor']}>Doctor</option>
                    </Select>
                  </div>

                  <div className="form-group">
                    <button  className="btn btn-primary btn-block login-button">S'inscrire</button>
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