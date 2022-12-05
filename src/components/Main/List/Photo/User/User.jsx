import style from './User.module.css';
import {PropTypes} from 'prop-types';

export const User = ({user}) => (
  <p className={style.user}>{user}</p>
);

User.propTypes = {
  user: PropTypes.string,
};

