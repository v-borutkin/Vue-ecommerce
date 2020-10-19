import { request } from '@/services/APIClient'

export async function loadComments (params) {
  return request({
    method: 'GET',
    url: '/comments/',
    params
  })
};

export async function setComment (params) {
  return request({
    method: 'GET',
    url: '/comments/',
    data: params
  })
};
