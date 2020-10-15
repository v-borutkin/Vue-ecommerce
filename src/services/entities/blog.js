import { request } from '@/services/APIClient'

export async function loadPosts (data) {
  return request({
    method: 'GET',
    url: '/posts/',
    params: data
  })
}
export async function loadPost (id) {
  return request({
    method: 'GET',
    url: `/post-ops/${id}`
  })
}
