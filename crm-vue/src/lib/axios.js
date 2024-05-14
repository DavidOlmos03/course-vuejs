import axios from 'axios'

const api = axios.create({
    baseURL: 'https://repeated-tinted-prepared.glitch.me'
})

export default api