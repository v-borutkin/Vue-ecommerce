import axios from 'axios'
import store from './store/index'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://77.66.177.88:8181/api/v1'

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token && !config.url.includes('http://geohelper.info/api/v1/')) {
      config.headers.Authorization = 'Token ' + token
    }
    return config
  }
)

axios.interceptors.response.use(
  data => {
    return data
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      store.commit('AUTH', false)
    }
    return Promise.reject(error)
  }
)

export default axios
