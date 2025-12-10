import axios from 'axios'

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
})

// Aquí luego puedes agregar interceptores para token, logs, errores, etc.
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api
