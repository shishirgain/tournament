import { API_URL } from '../config'

export const GetAllPostAPI = () => {
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
    const URL = API_URL + '/post/';
    return fetch(URL, data).then((res) => res.json());
}

export const CreatePostAPI = (post, token) => {
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
        body: JSON.stringify({ ...post })
    }
    const URL = API_URL + '/post/'
    return fetch(URL, data).then((res) => res.json());
}

export const GetPostByIdAPI = (id) => {
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
    const URL = API_URL + '/post/' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const UpdatePostByIdAPI = (post, id, token) => {
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
        body: JSON.stringify({ ...post })
    }
    const URL = API_URL + '/post/' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const DeletePostAPI = (token, id) => {
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
    const URL = API_URL + '/post/' + id;
    return fetch(URL, data).then((res) => res.json());
}
