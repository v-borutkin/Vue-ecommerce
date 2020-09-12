import { request } from '@/services/APIClient'

export async function getProductFavoriteList () {
  return request({
    method: 'GET',
    url: '/favorite/'
  })
}

export async function setFavorite (productId) {
  return request({
    method: 'POST',
    url: '/favorite/',
    data: productId
  })
}

export async function delFavorite (productId) {
  return request({
    method: 'DELETE',
    url: '/favorite/',
    data: productId
  })
}
