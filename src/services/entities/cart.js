import { request } from '@/services/APIClient'

export async function orderConfirm (params) {
  return request({
    method: 'POST',
    url: '/order/',
    data: params
  })
};
export async function sendPromo (params) {
  return request({
    method: 'POST',
    url: '/promo/',
    data: params
  })
};
export async function addToCart (params) {
  return request({
    method: 'POST',
    url: '/to-cart/',
    data: params
  })
};

export async function deleteFromCart (param) {
  return request({
    method: 'DELETE',
    url: `/cart-edit/${param}`
  })
};
export async function quantityPlus (param) {
  return request({
    method: 'PUT',
    url: `/cart-edit/${param.productId}`,
    data: param.q
  })
};
export async function productQuantity (param) {
  return request({
    method: 'PUT',
    url: `/cart-edit/${param.productId}`,
    data: param.q
  })
};

export async function getCart () {
  return request({
    method: 'GET',
    url: '/carts/'
  })
};
