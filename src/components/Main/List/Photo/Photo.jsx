import style from './Photo.module.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Date} from './Date/Date';
import {User} from './User/User';
import {PhotoUps} from './PhotoUps/PhotoUps';

export const Photo = ({photo}) => {
  const {
    id,
    user,
    created_at: date,
    urls,
    alt_description: description,
    likes,
    liked_by_user: liked
  } = photo;

  return (
    <>
      <div className={style.photo} id={id}>
        <Link to={`photos/${id}`}>
          <img src={urls.small} alt={description} className={style.image} />
          <User user={user.name}/>
          <Date date={date}/>
        </Link>
        <PhotoUps ups={likes} liked={liked} id={id}/>
      </div>
    </>
  );
};

Photo.propTypes = {
  photo: PropTypes.object,
};
