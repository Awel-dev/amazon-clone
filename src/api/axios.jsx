import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:5001/clone-90b80/us-central1/api"
})

export {instance}