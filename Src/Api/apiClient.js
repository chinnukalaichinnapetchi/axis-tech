import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL 
const API_BASE_URL = "http://5khrm.in/api/";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (e.g., add auth token)
apiClient.interceptors.request.use(
  async (config) => {
    // If you use AsyncStorage for tokens
    // const token = await AsyncStorage.getItem("token");
        const token = await AsyncStorage.getItem("token"); // get stored token
//console.log(token,'token');

    //const token = null; // replace with actual token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
