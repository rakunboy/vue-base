import axios from 'axios'

export const apiPoke = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
})

const api = axios.create({
  baseURL: '/api/api',
  timeout: 10000,
})
// localhost:5173/api/api/demouuid

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const deleteToken = () => {
  localStorage.setItem('token', '')
  api.defaults.headers.common['Authorization'] = ''
}

export const loadToken = () => {
  const token = localStorage.getItem('token')

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

// Aquí luego puedes agregar interceptores para token, logs, errores, etc.
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api
