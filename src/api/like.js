import {API_URL} from './const';
import axios from 'axios';

export const likeRequest = (id, liked, token) => {
  axios({
    method: liked ? 'delete' : 'post',
    url: `${API_URL}/photos/${id}/like`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => response.json())
    .catch(error =>
      ({error: error.toString()}));
};

