import axios from "axios";
// const dotenv = require("dotenv");
// dotenv.config();
// console.log(process.env.API_URL)
const apiClient = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        'Content-Type': 'application/json',
    },
});export default apiClient;