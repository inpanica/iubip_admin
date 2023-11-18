import axios from "axios"
import config from "./config.js"

export const register = async (full_name, password, email = '', yandex = '', fd) => {
    try {
        const response = await axios.post(config.url + `/auth/register?full_name=${full_name}&password=${password}` + (email ? `&email=${email}` : '') + (yandex ? `&yandex=${yandex}` : ''), fd, {
            headers: {
                'Content-Type': 'multipart/formdata',
                'Accept': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const login = async (password, email = '', yandex = '') => {
    try {
        const response = await axios.post(config.url + `/auth/login?password=${password}` + (email ? `&email=${email}` : '') + (yandex ? `&yandex=${yandex}` : ''), {
            headers: {
                'Content-Type': 'multipart/formdata',
                'Accept': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getUser = async (token) => {
    try {
        const response = await axios.get(config.url + `/auth/me`, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const refreshToken = async (token) => {
    try {
        const response = await axios.get(config.url + `/auth/refresh`, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const changeUser = async (token, name) => {
    try {
        const response = await axios.patch(config.url + `/auth/me`,
            {
                full_name: name
            },
            {
                headers: {
                    'Authorization': `Selezenka ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(config.url + `/auth/all`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const changePhoto = async (formdata, token) => {
    try {
        const response = await axios.patch(config.url + `/auth/photo`, formdata, {
            headers: {
                'Authorization': `Selezenka ${token}`,
                'Content-Type': 'multipart/formdata'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const addStatusTable = async (statuses) => {
    try {
        const response = axios.post(config.url + '/auth/status', statuses, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e){
        return e.response
    }
}

export const changeStatusTable = async (statuses) => {
    try {
        const response = axios.patch(config.url + '/auth/status', statuses, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e){
        return e.response
    }
}

export const getUsersTasks = async (email) => {
    try {
        const response = await axios.get(config.url + `/task/get?email=${email}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const deleteUsersTasks = async (id) => {
    try {
        const response = await axios.delete(config.url + `/task/delete?id_=${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}

export const getALlTasks = async () => {
    try {
        const response = await axios.get(config.url + `/task/all`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
    catch (e) {
        return e.response
    }
}