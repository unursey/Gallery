import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const thisPhotoRequestAsync = createAsyncThunk(
  'thisPhoto/fetch',
  async (id, {getState}) => {
    const token = getState().token.token;

    try {
      const {data} = token ?
      await axios(`${API_URL}/photos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) :
      await axios(`${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`);
      console.log('data thisPhoto: ', data);
      const liked = data.liked_by_user;
      const likes = data.likes;
      return {data, liked, likes};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);
