import axios from 'axios'


const instance = axios.create ({
    baseURL: "https://letter-out-backend.onrender.com"
    //process.env.REACT_APP_BACKEND_URL
})

export default instance