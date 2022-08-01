import { API_URL } from '../config'

export const GetAllCategoryAPI = () => {
    const data = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        }
    }
    const URL = API_URL + '/category';
    return fetch(URL, data).then((res) => res.json());
}

export const CreateCategoryAPI = (token, category) => {
    const data = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ ...category })
    }
    const URL = API_URL + '/category'
    return fetch(URL, data).then((res) => res.json());
}

export const GetCategoryByIdAPI = (id) => {
    const data = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        }
    }
    const URL = API_URL + '/category' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const UpdateCategoryByIdAPI = (category, id, token) => {
    const data = {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ ...category })
    }
    const URL = API_URL + '/category' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const DeleteCategoryAPI = (token, id) => {
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
    const URL = API_URL + '/category' + id;
    return fetch(URL, data).then((res) => res.json());
}
