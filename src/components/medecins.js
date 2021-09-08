import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import { Form } from 'react-bootstrap'
import UserService from "../services/user.service";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkmark } from 'react-checkmark'

export default class medecins extends Component {
    constructor(props) {
        super(props);


        this.state = { value: 'Rabat' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Votre parfum favori est : ' + this.state.value);
        event.preventDefault();
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

            <section >
                <div className="filterBar">
                    <form onSubmit={this.handleSubmit}>
                     <Row>
                        <select id="selectlist" value={this.state.value} onChange={this.handleChange} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option value="Rabat">Rabat</option>
                            <option value="Salé">Salé</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Mohammadia">Mohammadia</option>
                        </select>

                        <select id="selectlist" value={this.state.value} onChange={this.handleChange} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option value="Psychiatre">Psychiatre</option>
                            <option value="Dermatologue">Dermatologue</option>
                            <option value="Pediatre">Pediatre</option>
                            <option value="Digestion">Digestion</option>
                        </select>


                       
                      </Row>
                    </form>
                </div>


                <div className="doctorsContainer">


                    <div className="titlediv">
                        <Row>
                            <div id="title1" className="col-md-8"><h1 id="med">Medecins</h1></div>
                            <div id="title2" className="col-md-3"><h4 id="in">Conseils de docteurs</h4></div>
                        </Row>
                    </div>

                    <div>
                        <Row id="docRow" >

                            <div id="doctorblock" className='col-md-8'>
                                <Row>
                                    <div className="col-md-4">
                                        <img id="doctorpic" className="rounded" src="images/m1.jpg" width="250px" height="230px" />
                                        <div className="onlineoffline"> <span class="dot"></span>Online</div>
                                    </div>
                                    <div id="infoDoctor" className="col-md-8">

                                        <div className="row"><div id="name"><h4 id="h">Soukaina fath allah</h4><div id="verified"><Checkmark size='small' /></div></div></div>
                                        <div className="docspecialite">
                                            Spécialiste en Dermatologie-Vénérologie
                                        </div>
                                        <div className="diplomes">
                                            <ul className="dipliste">
                                                <li>Diplômé en Dermatologie et Vénérologie (Faculté de Médecine de Rabat).</li>
                                                <li>Diplômé en Dermatologie Esthétique (Université de Versailles-Paris).</li>
                                                <li>Diplômé en Dermatologie Pédiatrique (Université de Nice France ).</li>
                                                <li>Ancien Médecin au CHU IBN SINA et à l’hôpital Militaire Med V de Rabat.</li>
                                            </ul>
                                        </div>
                                        
                                            
                                                <ul id="listbtn">
                                                    <li id="lii"><Link to={"/"} className="link-btn">Prendre un rendez vous</Link></li>
                                                    <li id="lii"><Link to={"/"} className="link-btn">Consulter en ligne</Link></li>
                                                </ul>
                                    </div>
            
                                </Row>
                            </div>












                           











                            







                            

                            <div id="infoblock" className='col-md-3'>
                                <ul >
                                    <li id="listeConsiels">Portez un écran solaire tous les jours.</li><br /><br />
                                    <li id="listeConsiels">Choisissez des produits de soins de la peau formulés pour votre type de peau.</li><br /><br />
                                    <li id="listeConsiels">Vérifiez votre peau régulièrement.</li>
                                </ul>
                            </div>
                        </Row>


                        





                      <br/><br/>
                        
                        </div>


                        

                    </div>



            </section>
        );
    }
}
