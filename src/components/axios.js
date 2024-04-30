import axios from 'axios'


const instance = axios.create ({
    baseURL: "https://letter-out-backend.onrender.com"
})

export default instance