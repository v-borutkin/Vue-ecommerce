import axios from 'axios'
import store from './store/index'
import NProgress from 'nprogress'
axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://77.66.177.88:8181/api/v1'
NProgress.configure({ easing: 'ease', speed: 500 })

axios.interceptors.request.use(
  config => {
    NProgress.start()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Token ' + token
    }
    return config
  }
)

axios.interceptors.response.use(
  data => {
    NProgress.done()
    return data
  },
  error => {
    NProgress.done()
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      store.commit('AUTH', false)
    }
    return Promise.reject(error)
  }
)

export default axios
