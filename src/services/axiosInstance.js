import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    // signal: dashboardController.signal,
  });