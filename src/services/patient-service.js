import axios from "axios";

const API_URL = "http://localhost:9002/patient/";

class PatientService {
    addInfoProfile(id, prenom,nom,dtNaissance,telephone) {
        return axios
        .post(API_URL + "add", {
            id,
            prenom,
            nom,
            dtNaissance,
            telephone
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


    getCurrentUserInfos() {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}



export default new PatientService();