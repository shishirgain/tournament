import { API_URL } from '../config'

export const GetAllFileAPI = () => {
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
    const URL = API_URL + '/file';
    return fetch(URL, data).then((res) => res.json());
}

export const CreateFileAPI = (token, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const data = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        },
        body: formData
    }
    const URL = API_URL + '/file'
    return fetch(URL, data).then((res) => res.json());
}

export const GetFileByIdAPI = (id) => {
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
    const URL = API_URL + '/file' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const UpdateFileByIdAPI = (file, id, token) => {
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
        body: JSON.stringify({ ...file })
    }
    const URL = API_URL + '/file' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const DeleteFileAPI = (token, id) => {
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
    const URL = API_URL + '/file' + id;
    return fetch(URL, data).then((res) => res.json());
}
