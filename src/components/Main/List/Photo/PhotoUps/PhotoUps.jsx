import style from './PhotoUps.module.css';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {likeRequest} from '../../../../../api/like';
import {ErrorAuth} from '../../../../ErrorAuth/ErrorAuth';
import {useState} from 'react';

export const PhotoUps = ({id, ups, liked}) => {
  const token = useSelector(state => state.token.token);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);
  const [isLikes, setIsLikes] = useState(ups);

  const handleClick = () => {
    if (token) {
      likeRequest(id, liked, token);
      if (isLiked) {
        setIsLiked(false);
        setIsLikes(ups - 1);
      } else {
        setIsLiked(true);
        setIsLikes(ups + 1);
      }
      if (isLikes === ups - 1) {
        setIsLikes(isLikes + 1);
        setIsLiked(true);
      }
      if (isLikes === ups + 1) {
        setIsLikes(isLikes - 1);
        setIsLiked(false);
      }
    } else {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }
  };

  return (
    <>
      {<button className={style[isLiked ? 'up_active' : 'up']}
        onClick={handleClick}
        aria-label='Поставить лайк'>
        {isLikes}
      </button>}
      {showModal && <ErrorAuth />}
    </>
  );
};


PhotoUps.propTypes = {
  ups: PropTypes.number,
  liked: PropTypes.bool,
  id: PropTypes.string,
};
