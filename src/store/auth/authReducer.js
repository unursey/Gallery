import {
  AUTH_REQUEST,
  AUTH_REQUEST_SUCCESS,
  AUTH_REQUEST_ERROR,
  AUTH_LOGOUT,
} from './authAction';

const initialState = {
  loading: false,
  data: {},
  error: '',
  status: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: '',
        status: 'login',
      };
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        status: 'error',
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        data: {},
        status: '',
      };
    default:
      return state;
  }
};
