import { API_URL } from '../config'

export const GetUserAPI = (token) => {
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
    const URL = API_URL + '/user/';
    return fetch(URL, data).then((res) => res.json());
}

export const RegistrationUserAPI = (user) => {
    const { name, email, password } = user;
    const data = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        },
        body: JSON.stringify({ name, email, password })
    }
    const URL = API_URL + '/user/'
    return fetch(URL, data).then((res) => res.json());
}

export const GetAllUserAPI = (token) => {
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
    const URL = API_URL + '/user/all/';
    return fetch(URL, data).then((res) => res.json());
}

export const GetUserByIdAPI = (token, id) => {
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
    const URL = API_URL + '/user/' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const UpdateUserByIdAPI = (user, id) => {
    const { name, email, password } = user;
    const data = {
        method: 'patch',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        },
        body: JSON.stringify({ name, email, password })
    }
    const URL = API_URL + '/user/'
    return fetch(URL, data).then((res) => res.json());
}

export const DeleteUserAPI = (token, id) => {
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
    const URL = API_URL + '/user/' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const LoginUserAPI = (email, password) => {
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
    const URL = API_URL + '/user/login'
    return fetch(URL, data).then((res) => res.json());
}
