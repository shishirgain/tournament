import { API_URL, token, Header } from '../config'

import { Credentials } from '../interfaces'

// export const GetAdminAPI = () => {
//     const data = {
//         method: 'get',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//             'Access-Control-Allow-Methods': 'POST, GET',
//             'Authorization': 'Bearer ' + token
//         }
//     }
//     const URL = API_URL + '/admin/';
//     return fetch(URL, data).then((res) => res.json());
// }

// export const RegistrationAdminAPI = (admin) => {
//     const { name, type, email, password } = admin;
//     const data = {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//             'Access-Control-Allow-Methods': 'POST, GET'
//         },
//         body: JSON.stringify({ name, type, email, password })
//     }
//     const URL = API_URL + '/admin/'
//     return fetch(URL, data).then((res) => res.json());
// }

// export const GetAdminByIdAPI = (token, id) => {
//     const data = {
//         method: 'get',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Credentials': true,
//             'Access-Control-Allow-Methods': 'POST, GET',
//             'Authorization': 'Bearer ' + token
//         }
//     }
//     const URL = API_URL + '/admin/' + id;
//     return fetch(URL, data).then((res) => res.json());
// }



export const LoginAPI = (credentials: Credentials) => {
    const data = {
        method: 'post',
        headers: Header,
        body: JSON.stringify(credentials)
    }
    const URL = API_URL + '/admin/login'
    return fetch(URL, { ...data }).then(async (res) => {
        const isJson = res.headers.get('content-type')?.includes('application/json');
        if (res.ok) return res.json();
        else {
            const { message } = isJson ? await res.json() : null;
            const error = (message) || res.status;
            return Promise.reject(error);
        }
    });
}

// export const LogOutAPI = () => {
//     const data = {
//         method: 'get',
//         Headers: {
//             ...Header,
//             'Authorization': 'Bearer ' + token
//         }
//     }
//     const URL = API_URL + '/logout'
//     return fetch(URL, data).then(async(res) => {
//         const isJson = res.headers.get('content-type')?.includes('application/json');
//         if (res.ok) return res.json();
//         else {
//             const { message } = isJson ? await res.json() : null;
//             const error = (message) || res.status;
//             return Promise.reject(error);
//         }
//     });
// }
