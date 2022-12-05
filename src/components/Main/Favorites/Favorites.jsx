import style from './Favorites.module.css';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Preloader from '../../../UI/Preloader';
import {profileRequestAsync} from '../../../store/profile/profileAction';
import Photo from '../List/Photo';
import Masonry from 'react-masonry-css';
import {Outlet} from 'react-router-dom';

export const Favorites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const token = useSelector(state => state.token.token);
  const auth = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.profile.loading);
  const photo = useSelector(state => state.profile.photo);

  useEffect(() => {
    if (!token) {
      navigation('/');
    }
    dispatch(profileRequestAsync(auth.username));
  }, [auth]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      {photo ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={style.masonryGrid}
          columnClassName={style.masonryGridColumn}>
          {photo.map((data) => (
            <li key={`${data.id}`}>
              <Photo
                photo={data}
              />
            </li>
          ))}
          {loading &&
            <div className={style.more}><Preloader /></div>}
          <Outlet/>
        </Masonry>
    ) :
    (<p>Испытайте удачу позже.</p>)}
    </>
  );
};
