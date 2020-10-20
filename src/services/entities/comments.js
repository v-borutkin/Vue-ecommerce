import { request } from '@/services/APIClient'

export async function loadComments (params) {
  return request({
    method: 'GET',
    url: '/comments/',
    params
  })
};

export async function setBlogPostComment (params) {
  return request({
    method: 'POST',
    url: `/comments/${params?.childrenId}`,
    data: params
  })
};
