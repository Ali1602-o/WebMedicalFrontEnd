import React, { Component } from "react";
import {Link} from "react-router-dom";
import {Button,Row} from "react-bootstrap";
import {Form} from 'react-bootstrap'
import UserService from "../services/user.service";
import {faSearch} from '@fortawesome/free-solid-svg-icons';
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
            <div className="col-md-4">
              <img src="images/online_consult.jpg"/>
            </div>
            <div  className="col-md-5 home-consult-sec-caption">
              <p>N'attendez plus !</p>
              <h4>Consultez votre médecin maintenant.</h4>
              <Link to={"/"} className="consult-btn">Consulter</Link>
            </div>
            
          </Row>
        </div>
        
      </div>
    );
  }
}
