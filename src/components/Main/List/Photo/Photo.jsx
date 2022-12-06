import style from './Photo.module.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Date} from './Date/Date';
import {User} from './User/User';
import {PhotoUps} from './PhotoUps/PhotoUps';
import LoadImg from '../../../../UI/LoadImg';


export const Photo = ({photo}) => {
  const {
    id,
    user,
    created_at: date,
    urls,
    alt_description: description,
    likes,
    liked_by_user: liked,
    width,
    height
  } = photo;


  return (
    <>
      <div className={style.photo} id={id}>
        <Link to={`/photo/${id}`}>
          <LoadImg src={urls.small}
            alt={description}
            className={style.image}
            height={height}
            width={width}
          />
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
