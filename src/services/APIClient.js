import axios from 'axios'
import NProgress from 'nprogress'
import { port } from '@/consts'
NProgress.configure({ easing: 'ease', speed: 500 })

let APIClient
export function initAPIClient (store) {
  APIClient = axios.create({
    baseURL: `${port}/api/v1`,
    timeout: 30000
  })
  APIClient.interceptors.request.use(
    config => {
      NProgress.start()
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = 'Token ' + token
      }
      return config
    }
  )
  APIClient.interceptors.response.use(
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
}

export async function request (options = {}) {
  try {
    const { data } = await APIClient(options)
    return data
  } catch (e) {
    return Promise.reject(e)
  }
}
