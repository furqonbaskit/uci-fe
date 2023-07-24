import axios from 'axios';
import authHeader from './auth.header';

const API_URL = "http://localhost:8080/api/user";

const getAll = async () => {
    return axios.get(`${API_URL}/getall`, { headers: authHeader() })
}

const UserService = {
    getAll
}

export default UserService;