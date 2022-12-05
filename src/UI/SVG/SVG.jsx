import {ReactComponent as LogoIcon} from '../../img/logo.svg';
import {ReactComponent as LoginIcon} from '../../img/login.svg';
import {ReactComponent as LikeIcon} from '../../img/like.svg';
import PropTypes from 'prop-types';


export const SVG = (prop) => {
  const svgs = {
    logoIcon: LogoIcon,
    loginIcon: LoginIcon,
    likeIcon: LikeIcon,
  };

  const {
    iconName,
    As = svgs[iconName],
    className,
    alt,
    width,
    height,
  } = prop;


  return <As
    className={className}
    alt={alt}
    width={width}
    height={height}
  />;
};

SVG.propTypes = {
  As: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
