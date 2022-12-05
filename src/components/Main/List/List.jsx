import style from './List.module.css';
import {useRef, useEffect} from 'react';
import Photo from './Photo';
import Preloader from '../../../UI/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {photoRequestAsync} from '../../../store/photo/photoAction';
import Masonry from 'react-masonry-css';
import {Outlet} from 'react-router-dom';

export const List = () => {
  const photo = useSelector(state => state.photo.photo);
  const loading = useSelector(state => state.photo.loading);
  // const status = useSelector(state => state.auth.status);
  const num = useSelector(state => state.photo.num);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(photoRequestAsync());
      }
    }, {
      rootMargin: '100px',
    });

    if (endList.current && !loading) {
      observer.observe(endList.current);
    }

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

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
          <li key={`${data.id}${num}`}>
            <Photo
              photo={data}
            />
          </li>
        ))}
        {loading &&
          <div className={style.more}><Preloader /></div>}

        <li ref={endList} className={style.end}/>
        <Outlet/>
      </Masonry>
      ) :
      (<p>Испытайте удачу позже.</p>)}
    </>
  );
};
