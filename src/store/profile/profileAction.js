import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const profileRequestAsync = createAsyncThunk(
  'profile/fetch',
  async (username, {getState}) => {
    const token = getState().token.token;
    if (!token || !username) return;
    console.log('token: ', token);

    try {
      const {data} =
      await axios(`${API_URL}/users/${username}/likes?client_id=${ACCESS_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const photo = data;
      console.log('photos: ', data);
      return {photo};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);
