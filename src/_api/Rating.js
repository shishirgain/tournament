import { API_URL } from '../config'

export const GetAllRatingAPI = (token) => {
    const data = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token,
        }
    }
    const URL = API_URL + '/rating/';
    return fetch(URL, data).then((res) => res.json());
}

export const GetAverageRating = (postID) => {
    let data = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET'
        }
    }
    const URL = API_URL + '/rating/average/' + postID;
    return fetch(URL, data).then((res) => res.json());
}

export const SaveRatingAPI = (postId, rating, token) => {
    let data = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            postId: postId,
            rating: rating
        })
    }
    const URL = API_URL + '/rating/';
    return fetch(URL, data).then((res) => res.json());
}

export const GetRating = (postID, token) => {
    let data = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        }
    }
    const URL = API_URL + '/rating/' + postID;
    return fetch(URL, data).then((res) => res.json());
}


export const UpdateRatingByIdAPI = (rating, id, token) => {
    const data = {
        method: 'patch',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'POST, GET',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ ...rating })
    }
    const URL = API_URL + '/rating/' + id;
    return fetch(URL, data).then((res) => res.json());
}

export const DeleteRatingAPI = (token, id) => {
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
    const URL = API_URL + '/rating/' + id;
    return fetch(URL, data).then((res) => res.json());
}
