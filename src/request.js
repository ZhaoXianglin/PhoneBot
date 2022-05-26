import axios from 'axios'

export const instance = axios.create({
    baseURL: "https://www.chatbot.fans:8080",
    //baseURL: "http://127.0.0.1:8000",
    timeout: 20000,
})
