import { request } from '@/services/APIClient'

export async function getCategories () {
  return request({
    method: 'GET',
    url: '/category/'
  })
}
