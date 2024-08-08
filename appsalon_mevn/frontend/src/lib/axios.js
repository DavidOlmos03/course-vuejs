import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL
})


// Estos interceptors se van a ejecutar en cada request (solicitud), hay de dos tipos de request y de response

api.interceptors.request.use((config)=>{
    // Verificación del token de autenticación
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api