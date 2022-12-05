import {createSlice} from '@reduxjs/toolkit';
import {thisPhotoRequestAsync} from './thisPhotoAction';

const initialState = {
  loading: false,
  thisPhoto: {},
  error: '',
  likes: 0,
  liked: false,
};

export const thisPhotoSlice = createSlice({
  name: 'thisPhoto',
  initialState,
  reducers: {
    changeLike: (state) => {
      state.liked = !state.liked;
      state.likes += state.liked ? 1 : -1;
    },
  },
  extraReducers: {
    [thisPhotoRequestAsync.pending.type]: (state) => {
      state.loading = true,
      state.error = '';
    },
    [thisPhotoRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false,
      state.thisPhoto = action.payload.data;
      state.liked = action.payload.liked;
      state.likes = action.payload.likes;
      state.error = '';
    },
    [thisPhotoRequestAsync.rejected.type]: (state, action) => {
      state.loading = false,
      state.error = action.payload.error;
    }
  }
});

export default thisPhotoSlice.reducer;
