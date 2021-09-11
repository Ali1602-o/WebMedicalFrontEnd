import axios from "axios";

const API_URL = "http://localhost:9004/book/";


class BookService {
    addReservation(prenom,nom,telephone,date,heure,userId,medId) {
        return axios.post(API_URL + "add", {
            prenom,
            nom,
            telephone,
            date,
            heure,
            userId,
            medId
        });
    }

}

export default new BookService();