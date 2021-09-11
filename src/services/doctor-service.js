import axios from "axios";

const API_URL = "http://localhost:9090/doctor/";

class DoctorService {
    addInfoDoc(id, prenom,nom,telephone,adresse,ville,specialite,description,status) {
        return axios
        .post(API_URL + "add", {
            id,
            prenom,
            nom,
            telephone,
            adresse,
            ville,
            specialite,
            description,
            status
        });
    }

    profileById(id) {

        return axios.get(API_URL +""+id+"").then(
        response => {if (response.data) {
            localStorage.setItem("userInfo", JSON.stringify(response.data));
        }
        return response.data;
        });
         
    }

    getAllDoctors(){
        return axios.get(API_URL +"all").then(
            response => response.data).then(
                (data) => {return data;}
            );
    }


    getCurrentUserInfos() {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}



export default new DoctorService();