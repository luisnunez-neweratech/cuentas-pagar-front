import axios from 'axios'

const cuentasApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

cuentasApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export { cuentasApi }