import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getDoctorBoard() {
    return axios.get(API_URL + 'doctor', { headers: authHeader() });
  }

}

export default new UserService();