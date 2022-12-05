import style from './Auth.module.css';
import {Text} from '../../../UI/Text/Text';
import {SVG} from '../../../UI/SVG/SVG';
import {useState, useEffect} from 'react';
import {urlAuth} from '../../../api/auth';
import {deleteToken} from '../../../store/tokenReducer';
import {useDispatch} from 'react-redux';
import {useAuth} from '../../../hooks/useAuth';
import Preloader from '../../../UI/Preloader';
import {useNavigate, Link} from 'react-router-dom';

export const Auth = () => {
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);
  const [auth, loading, clearAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  });

  return (
    <div className={style.container}>
      {loading ? <Preloader /> : auth.name ? (
        <>
          <button
            className={style.btn}
            onClick={() => {
              logout ? setLogout(false) : setLogout(true);
            }}>
            <img
              className={style.img}
              src={auth['profile_image'].small}
              alt={`Аватар ${auth.name}`}
            />
          </button>
          <Link to="/profile" className={style.link}>
            <Text As='p'>{auth.name}</Text>
          </Link>

          {logout ?
          <button
            className={style.logout}
            onClick={() => {
              clearAuth();
              dispatch(deleteToken());
              navigate('/');
            }}>
            Выйти
          </button> : ''}
        </>
      ) :
      (
        <Text className={style.authLink} As='a' href={urlAuth}>
          <SVG iconName='loginIcon' className={style.svg} />
        </Text>
      )}
    </div>
  );
};
