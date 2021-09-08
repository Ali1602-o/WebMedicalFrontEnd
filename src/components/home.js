import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button,Row} from "react-bootstrap";
import {Form} from 'react-bootstrap'
import UserService from "../services/user.service";
import {faSearch, GoVerified} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      
      <div className="container">
        <div className="col-md-12" align="center"><h3>Trouvez votre Médecin !</h3> </div>                  
        <Form onSubmit={""} id="DoctorSearchId">
          
              <Form.Row>
                      <Form.Control as="select" className="col-md-11">
                        <option>Selectionnez une spécialité</option>
                        <option value="1">Dermatologie</option>
                        <option value="2">Pediatre</option>
                        <option value="3">Psycologie</option>
                      </Form.Control>
                  <Button size="sm" variant="dark" type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
              </Form.Row> 
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
                <Link to={"/"} class="find-btn">Trouver</Link>
              </div>
            </div>
            
          </Row>
        </div>
        
      </div>
    );
  }
}
