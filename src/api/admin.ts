import { API_URL, token } from '../config'

export const GetAdminAPI = () => {
    const data = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        }
    }
    const URL = API_URL + '/admin/';
    return fetch(URL, data).then((res) => res.json());
}

export const RegistrationAdminAPI = (admin) => {
    const { name, type, email, password } = admin;
    const data = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        },
        body: JSON.stringify({ name, type, email, password })
    }
    const URL = API_URL + '/admin/'
    return fetch(URL, data).then((res) => res.json());
}

export const GetAdminByIdAPI = (token, id) => {
    const data = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        }
    }
    const URL = API_URL + '/admin/' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const UpdateAdminByIdAPI = (admin, id) => {
    const { name, type, email, password } = admin;
    const data = {
        method: 'patch',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        },
        body: JSON.stringify({ name, type, email, password })
    }
    const URL = API_URL + '/admin/'
    return fetch(URL, data).then((res) => res.json());
}

export const DeleteAdminAPI = (token) => {
    const data = {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        }
    }
    const URL = API_URL + '/admin/';
    return fetch(URL, data).then((res) => res.json());
}

export const LoginAdminAPI = (email, password) => {
    const data = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }
    const URL = API_URL + '/admin/login'
    return fetch(URL, data).then((res) => res.json());
}
