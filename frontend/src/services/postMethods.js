import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

export const registration = async(userName, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/create-account`, {
            username: userName,
            email,
            password
        });
        console.log(response.status);
        return response.status;
    } catch (error) {
        console.log("Error while sending registration details", error);
    }
}

export const authentication = async(email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        });
        const token = response.data.token;
        localStorage.setItem('TOKEN', token);
        console.log(response.status);
        return response.status;
    } catch (error) {
        console.log("Error while sending authentication details", error);
        return(error.response.status);
    }
}