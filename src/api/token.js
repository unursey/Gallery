import axios from 'axios';
import {
  API_URL_TOKEN,
  ACCESS_KEY,
  REDIRECT_URI,
  SECRET_KEY,
  GRANT_TYPE
} from './const';
import {deleteToken, updateToken} from '../store/tokenReducer';
import {useDispatch} from 'react-redux';

const createTokenUrl = (code) => {
  const searchParams = new URLSearchParams();

  searchParams.append('client_id', ACCESS_KEY);
  searchParams.append('client_secret', SECRET_KEY);
  searchParams.append('redirect_uri', REDIRECT_URI);
  searchParams.append('code', code);
  searchParams.append('grant_type', GRANT_TYPE);

  return `${API_URL_TOKEN}${searchParams.toString()}`;
};

export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  // const navigate = useNavigate();
  let token = localStorage.getItem('bearer') || '';
  const dispatch = useDispatch();

  if (!token) {
    if (location.search.includes('code')) {
      const code = new URLSearchParams(location.search).get('code');
      const urlToken = createTokenUrl(code);
      axios.post(urlToken)
        .then(({data}) => {
          token = data.access_token;
          setToken(token);
          dispatch(updateToken(token));
        })
        .catch(err => {
          console.error(err);
          dispatch(deleteToken());
        });
      // token && setToken(token);
    }
  }

  return token;
};
