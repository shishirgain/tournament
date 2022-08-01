export const APP_URL = import.meta.env.VITE_APP_URL
export const token = localStorage.token
export const API_URL = `${import.meta.env.VITE_APP_URL}/api/v/1.0.0`

const requestheaders: HeadersInit = new Headers()
requestheaders.set('Accept', 'application/json')
requestheaders.set('Content-Type', 'application/json')
requestheaders.set('Access-Control-Allow-Origin', '*')
requestheaders.set('Access-Control-Allow-Methods', 'POST, GET')

export const Header = requestheaders