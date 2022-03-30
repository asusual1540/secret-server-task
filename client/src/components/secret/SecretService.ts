import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export const getSecrets = async () => {
    return await axios.get('/secrets')
}
export const addSecret = async (secret:object) => {
    return await axios.post('/secrets', secret)
}
export const getSecret = async (hash:string) => {
    return await axios.get(`/secrets/${hash}`)
}