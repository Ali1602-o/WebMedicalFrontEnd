import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button,Row} from "react-bootstrap";
import UserService from "../services/user.service";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Form from "react-validation/build/form";
import Select from "react-validation/build/select";
import AuthService from "../services/auth-service";
import patientService from "../services/patient-service";
import doctorService from "../services/doctor-service";
import axios from "axios";

const API_URL = "http://localhost:9090/doctor/";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeSpecialite = this.onChangeSpecialite.bind(this);
    this.handleSpecialite= this.handleSpecialite.bind(this);
    //Test if user is connected or not
    if(AuthService.getCurrentUser()){
      patientService.profileById(AuthService.getCurrentUser().id);
      doctorService.profileById(AuthService.getCurrentUser().id);
    }
      

    this.state = {
      doctors:[],
      specialite :"",
      content: ""
    };
  }


  onChangeSpecialite(e) {
    this.setState({
      specialite: e.target.value
    });
  }


  handleSpecialite(e){
    e.preventDefault();

    axios.get(API_URL +"Specialite/"+this.state.specialite).then(
      response => response.data).then(
          (data) => {
            this.props.history.push( {pathname: "/medecins", state: { doctors : data, speci: this.state.specialite}});
          }
      );

      

  }

  componentDidMount() {
  }

  render() {
    return (
      
      <div className="container">
        <div className="col-md-12" align="center"><h3>Trouvez votre Médecin !</h3> </div> 
                         
        <Form id="DoctorSearchId" onSubmit={this.handleSpecialite}>
          
              <Row>
                      <Select name="specialite" onChange={this.onChangeSpecialite} value={this.state.specialite} className="form-control"style={{width: "749px",marginLeft:"250px"}} >
                        <option value="">Selectionnez une spécialité</option>
                        <option value="Dermatologue">Dermatologie</option>
                        <option value="Pediatre">Pediatre</option>
                        <option value="Psychiatre">Psycologie</option>
                      </Select>
                      <button id="submitlist2" style={{marginLeft:"-285px",height:"38px",color:"black"}}><FontAwesomeIcon icon={faSearch}/></button>   
            </Row>
           
        </Form>


        <div className="home-consult-sec">
          <Row>
            <div className="col-md-7">
              <img src="images/online_consult.jpg"/>
            </div>
            <div  className="col-md-5 home-consult-sec-caption">
              <p>N'attendez plus !</p>
              <h4>Commencez votre consultation maintenant.</h4>
              <Link to={"/consultations"} className="consult-btn">Consulter</Link>
            </div>
            
          </Row>
        </div>


        <div className="consult-find-sec">
          <Row>
            <div className="col-md-6 consult-sec">
              <img src="images/doctor-consult-icon.jpg" class="consult-icon"/>
              <div class="consult-description">
                <p>Vous pouvez faire une consultation avec votre médecin facilement en quelques minutes !</p>
                <Link to={"/consultations"} class="consult-btn-1">Consulter</Link>
              </div>
            </div>
            <div  className="col-md-6 find-sec">
              <img src="images/find-doctor-icon.png" class="find-icon"/>
              <div class="find-description">
                <p>Trouvez votre médecin et prennez un rendez vous.</p>
                <Link to={"/medecins"} class="find-btn">Trouver</Link>
              </div>
            </div>
            
          </Row>
        </div>
        
      </div>
    );
  }
}
