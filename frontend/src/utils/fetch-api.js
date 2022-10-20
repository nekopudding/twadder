import axios from "axios";
import { getCookie } from "./cookies";

export const baseURL = 'http://localhost:4000'

export const toggleLike = async (postId) => {
  const res = await axios({
    method: 'put',
    url: `${baseURL}/posts/${postId}`,
    params: {
      sessionId: getCookie('sessionId'),
      mode: 'LIKE'
    },
  })
  return res;
}