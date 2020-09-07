import { request } from '@/services/APIClient'

export async function getProducts (params) {
  return request({
    method: 'GET',
    url: `/goods/category=${params.category}?page=${params.page}`,
    params
  })
}
