import axios from "axios";

export const baseURL = 'http://localhost:4000'

export const toggleLike = async (postId) => {
  const res = await ins({
    method: 'put',
    url: `${baseURL}/posts/${postId}`,
    params: {
      mode: 'LIKE'
    },
  })
  return res;
}

export const ins = axios.create({ //instance of axios for enabling credentials
  withCredentials: true
})
