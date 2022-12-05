import {createSlice} from '@reduxjs/toolkit';
import {profileRequestAsync} from './profileAction';

const initialState = {
  loading: false,
  photo: [],
  error: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [profileRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [profileRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photo = action.payload.data;
      state.error = '';
    },
    [profileRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default profileSlice.reducer;
