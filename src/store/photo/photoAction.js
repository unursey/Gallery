import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const photoRequestAsync = createAsyncThunk(
  'photo/fetch',
  async (_newPage, {getState}) => {
    let num = getState().photo.num;
    const oldPhoto = getState().photo.photo;
    const token = getState().token.token;
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      headers.Authorization = `Client-ID ${ACCESS_KEY}`;
    }

    try {
      const {data} = await axios(`${API_URL}/photos?per_page=30&${num > 0 ?
        `page=${num}` : ``}`,
      {
        headers,
      });

      let like;
      const photo = [...oldPhoto, ...data];
      if (data['liked_by_user']) {
        like = 'liked';
      }
      num++;
      return {photo, num, like};
    } catch (err) {
      return ({error: err.toString()});
    }
  }
);
