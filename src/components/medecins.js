import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Row } from "react-bootstrap";
import { Form } from 'react-bootstrap'

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkmark } from 'react-checkmark'
import AuthService from "../services/auth-service";
import {Container} from 'react-bootstrap'; 

import axios from "axios";
import Consultations from "./consultations";

const API_URL = "http://localhost:9090/doctor/";

export default class medecins extends Component {

    constructor(props) {
        super(props);
        this.onChangeVille = this.onChangeVille.bind(this);
        this.onChangeSpecialite = this.onChangeSpecialite.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            doctors : [],
            ville : "",
            spec: this.props.location.state ? this.props.location.state.doctors : "" ,
            specialite: "",
            status: "", 
        };

        
    }


    onChangeVille(event){
        this.setState({
            ville : event.target.value
        });
    }

    onChangeSpecialite(event){

        this.setState({
            specialite : event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if( ! (this.state.specialite || this.state.ville)){
            axios.get(API_URL +"all").then(
                response => response.data).then(
                    (data) => {
                        this.setState({
                            doctors: data
                        })}
                );
        }else{
            axios.get(API_URL +"Specialite&Ville/"+this.state.specialite+"/"+this.state.ville+"").then(
                response => response.data).then(
                    (data) => {
                        this.setState({
                            doctors: data
                        })}
                );
        }

        
        
    }


    componentDidMount() {
        if(this.state.spec == ""){
            axios.get(API_URL +"all").then(
                response => response.data).then(
                    (data) => {
                        this.setState({
                            doctors: data
                        })}
                );
        }else{

            this.setState({
                doctors: this.state.spec    
            });

            console.log(this.state.spec)
        }     
    }

    render() {
        return (

            <Container>
                <div className="filterBar">
                    <Form onSubmit={this.handleSubmit}>
                     <Row >
                        <select id="selectlist" value={this.state.ville} onChange={this.onChangeVille} class="form-select" aria-label=".form-select-lg example">
                            <option value="">Ville</option>
                            <option value="rabat">Rabat</option>
                            <option value="sale">Salé</option>
                            <option value="casablanca">Casablanca</option>
                            <option value="mohammadia">Mohammadia</option>
                        </select>

                        <select id="selectlist" value={!this.props.location.state ? this.state.specialite : this.props.location.state.speci} onChange={this.onChangeSpecialite} class="form-select" aria-label=".form-select-lg example">
                            <option value="">Spécialiste</option>
                            <option value="Psychiatre">Psychiatre</option>
                            <option value="Dermatologue">Dermatologue</option>
                            <option value="Pediatre">Pediatre</option>
                            <option value="Digestion">Digestion</option>
                        </select>
                        <button id="submitlist"><FontAwesomeIcon icon={faSearch}/></button>
                      </Row>
                      
                    </Form>
                </div>


                <div className="doctorsContainer">


                    <div className="titlediv">
                        <Row>
                            <div id="title1" className="col-md-8"><h1 id="med">Medecins</h1></div>
                            <div id="title2" className="col-md-3"><h4 id="in">Conseils des docteurs</h4></div>
                        </Row>
                    </div>

                    <div>
                        <Row id="docRow" >
                            {this.state.doctors.map((doctor,index) =>(
                             <div id="doctorblock" className='col-md-8' data-index={index}>
                             <Row>
                                 <div className="col-md-3">
                                     <img id="doctorpic" className="rounded" src={"images/doc"+doctor.id+".jpeg"} width="250px" height="230px" />
                                     <div className="onlineoffline"> <span class={doctor.status == "1" ? "dot-red" : "dot-green"}></span>&nbsp;{doctor.status == "1" ? "Offline" : "Online"}</div>
                                 </div>
                                 <div id="infoDoctor" className="col-md-9">

                                     <div className="row">
                                        <div id="name"><h4 id="h">Dr. {doctor.prenom} {doctor.nom}</h4><div id="verified"><Checkmark size='small' /></div></div></div>
                                        <div className="docspecialite">
                                            <p>Spécialiste en {doctor.specialite}</p>
                                        </div>
                                        <div className="diplomes">
                                            <ul className="dipliste" style={{whiteSpace: "pre"}}>
                                                {doctor.description}
                                            </ul>
                                        </div>
                                     

                                        <div class="consult-book-btn"> 
                                            <ul id="listbtn">
                                                <li id="lii"><Link to={{pathname:"/rendezvous",state: doctor}}  className="link-btn">Prendre un rendez vous</Link></li>
                                                <li id="lii"><Link to={{pathname:"/consultInfo",state: doctor}} className="link-btn">Consulter en ligne</Link></li>
                                            </ul>
                                        </div>
                                 </div>
                             </Row>
                         </div>

                             
                             
                             ))}
                            
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



            </Container>
        );
    }
}
