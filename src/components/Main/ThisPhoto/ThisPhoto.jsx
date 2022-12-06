import style from './ThisPhoto.module.css';
import {useEffect, useState} from 'react';
import {SVG} from '../../../UI/SVG/SVG';
import Preloader from '../../../UI/Preloader';
import formatDate from '../../../utils/formatDate';
import Layout from '../../Layout';
import {useDispatch, useSelector} from 'react-redux';
import {thisPhotoSlice} from '../../../store/thisPhoto/thisPhotoSlice';
import {useParams, Link} from 'react-router-dom';
import {usePhoto} from '../../../hooks/usePhoto';
import {useNavigate} from 'react-router-dom';
import {ErrorAuth} from '../../ErrorAuth/ErrorAuth';
import {likeRequest} from '../../../api/like';
import LoadImg from '../../../UI/LoadImg';

export const ThisPhoto = () => {
  const {id} = useParams();
  const [thisPhoto, loading, liked, likes, error] = usePhoto(id);
  const token = useSelector(state => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    if (token) {
      likeRequest(id, liked, token);
      dispatch(thisPhotoSlice.actions.changeLike());
    } else {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (error) {
      console.log('error: ', error);
      navigate('/');
    }
  });

  return (
    <Layout>
      {thisPhoto ? (
      <div className={style.container}>
        {!error && (loading ? <Preloader /> : thisPhoto.urls ? (
          <>
            <LoadImg
              src={thisPhoto.urls.full}
              alt={thisPhoto.description}
              className={style.img}
              height={thisPhoto.height}
              width={thisPhoto.width}
            />
            <div className={style.block}>
              <a className={style.link} href={thisPhoto.links.html}>
                <div className={style.user}><img
                  src={thisPhoto.user['profile_image'].small}
                  alt='Аватар' /></div>
                {thisPhoto.user.name}
              </a>
              <time dateTime={thisPhoto['created_at']}>
                {formatDate(thisPhoto['created_at'])}
              </time>
            </div>
            <div className={style.likesBlock}>
              <span className={style.likes}>{likes}</span>
              <button className={style.btnLike}
                onClick={handleLike}>
                <SVG
                  iconName='likeIcon'
                  className={style[liked ?
                    'like_active' : 'like']}
                  alt='Изменить лайк'>
                </SVG>
              </button>
            </div>
            <Link to='/'><p>Назад</p></Link>
          </>
        ) : (
          <p>not photo</p>
        ))}
        {showModal && <ErrorAuth />}
      </div>) :
      (<p>Испытайте удачу позже.</p>)}
    </Layout>
  );
};
