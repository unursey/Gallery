import {createSlice} from '@reduxjs/toolkit';
import {photoRequestAsync} from './photoAction';

const initialState = {
  loading: false,
  photo: [],
  error: '',
  num: 1,
  like: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    deletePhoto: (state) => {
      state.photo = [];
      state.num = 1;
      state.like = '';
    },
  },
  extraReducers: {
    [photoRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [photoRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photo = action.payload.photo;
      state.error = '';
      state.num = action.payload.num;
      state.like = action.payload.like;
    },
    [photoRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default photoSlice.reducer;
