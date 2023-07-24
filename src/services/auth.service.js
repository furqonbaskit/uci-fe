import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {
    try {
        const result = await axios.post(`${API_URL}/login`, {username, password});

    if (result?.data?.accessToken) {
        localStorage.setItem("user", JSON.stringify(result?.data));
    }

        return result.data
    } catch (error) {
        return error?.response?.data;
    }
    
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const logout = () => {
    localStorage.removeItem("user")
}

const AuthService = {
    login,
    getCurrentUser,
    logout
}

export default AuthService;