import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import { Form } from 'react-bootstrap'
import UserService from "../services/user.service";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class Consultations extends Component {
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
                <div className="col-md-12" align="center"><h3 id="specia" >Spécialités</h3> </div>


                <div class="consultations-specialite-sec1">
                    <Row>
                        <div id="specialite-container" className="col-md-4">
                            <img id="specia-img" src="images/1.jpeg" class="img-rounded" width="130px" height="130px" /><br />
                            <Link to={"/medecins"} className="specialite-btn">Psychiatre</Link>
                        </div>


                        <div id="specialite-container" className="col-md-4">
                            <img id="specia-img" src="images/2.jpeg" class="img-rounded" width="130px" height="130px" />
                            <Link to={"/medecins"} className="specialite-btn">Dermatologue</Link>
                        </div>


                        <div id="specialite-container" className="col-md-4">
                            <img id="specia-img" src="images/3.jpeg" class="img-rounded" width="130px" height="130px" />
                            <Link to={"/medecins"} className="specialite-btn">Pédiatre</Link>
                        </div>
                    </Row>
                </div>








                <div className="consultations-specialite-sec2">
                     <h4>Problèmes de santé courants</h4>
                     
                  <Row>
                  <h5 id="sous-titre">Consulter un médecin pour tout problème de santé</h5>
                     <div className="col-md-4">
                       <Card className="probsCard">
                       <div className="probsCardHeader">
                       <img id="prob-img" src="images/rhume.jpg" class="rounded" />
                       </div>
                       <Card.Body className="probsCardBody"> 
                           <h6>Toux ou rhume ?</h6>
                           <Link to="/medecins" className="btn btn-outline-success"> Consulter Maintenant </Link>
                              
                        </Card.Body>
                       </Card>
                       </div>


                       <div className="col-md-4">
                       <Card className="probsCard">
                       <div className="probsCardHeader">
                       <img id="prob-img" src="images/estomac.jpg" class="rounded" />
                       </div>
                       <Card.Body className="probsCardBody"> 
                           <h6>Problèmes d'estomac ?</h6>
                           <Link to="/medecins" className="btn btn-outline-success"> Consulter Maintenant </Link>   
                        </Card.Body>
                       </Card>
                       </div>



                       <div className="col-md-4">
                       <Card className="probsCard">
                       <div className="probsCardHeader">
                       <img id="prob-img" src="images/poids.jpg" class="rounded"/>
                       </div>
                       <Card.Body className="probsCardBody"> 
                           <h6>Problèmes de poids ?</h6>
                           <Link to="/medecins" className="btn btn-outline-success"> Consulter Maintenant </Link>  
                        </Card.Body>
                       </Card>
                       </div>
                    </Row>

             
             </div>
                    
            </div>
        );
    }
}
