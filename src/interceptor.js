import axios from 'axios'
import store from './store/index'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://77.66.177.88:8181/api/v1'

axios.interceptors.request.use(
  config => {
    document.body.classList.add('loading-indicator')
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token ' + token
    }
    return config
  }
)

axios.interceptors.response.use(
  data => {
    document.body.classList.remove('loading-indicator')
    return data
  },
  error => {
    document.body.classList.remove('loading-indicator')
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      store.commit('AUTH', false)
    }
    return Promise.reject(error)
  }
)

export default axios
