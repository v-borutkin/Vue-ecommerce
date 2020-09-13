import { request } from '@/services/APIClient'

export async function passwordReset (params) {
  return request({
    method: 'POST',
    url: '/rest-auth/password/reset/',
    data: params
  })
}

export async function registrationConfirm (params) {
  return request({
    method: 'POST',
    url: '/rest-User/registration/verify-email/',
    data: params
  })
}
export async function registration (params) {
  return request({
    method: 'POST',
    url: '/rest-User/registration/',
    data: params
  })
}
export async function auth (params) {
  return request({
    method: 'POST',
    url: '/rest-auth/login/',
    data: params
  })
}
export async function sendNewPassword (params) {
  return request({
    method: 'POST',
    url: '/rest-auth/password/change/',
    data: params
  })
}
