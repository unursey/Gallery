import {tokenReducer, tokenMiddleware} from './tokenReducer';
import {authReducer} from './auth/authReducer';
import photoSlice from './photo/photoSlice';
import profileSlice from './profile/profileSlice';
import thisPhotoSlice from './thisPhoto/thisPhotoSlice';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';


export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photo: photoSlice,
    thisPhoto: thisPhotoSlice,
    profile: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware, thunk),
});
