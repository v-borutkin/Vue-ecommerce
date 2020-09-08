import { request } from '@/services/APIClient'

export async function getProducts (params) {
  return request({
    method: 'GET',
    url: `/goods/category=${params.category}?page=${params.page}`,
    params
  })
}
export async function getProduct (id) {
  return request({
    method: 'GET',
    url: `http://77.66.177.88:8181/api/v1/goods-ops/${id}`
  })
}
export async function getRandomProduct () {
  return request({
    method: 'GET',
    url: '/goods-random/'
  })
}
