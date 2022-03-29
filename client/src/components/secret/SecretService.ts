import axios from 'axios'

export const getSecrets = async () => {
    return await axios.get('http://localhost:4000/secrets')
}
export const addSecret = async (secret:object) => {
    return await axios.post('http://localhost:4000/secrets', secret)
}
export const getSecret = async (hash:string) => {
    return await axios.get(`http://localhost:4000/secrets/${hash}`)
}