import axios from "axios"
import config from "./config.js"

export const yandexAuth = async (token) => {
    const response = await axios.get(config.yandexUrl + `&format=json&oauth_token=${token}`)
    return response
}
