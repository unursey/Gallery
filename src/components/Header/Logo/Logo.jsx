import style from './Logo.module.css';
import {SVG} from '../../../UI/SVG/SVG';

export const Logo = () =>
  (
    <a className={style.link} href='/'>
      <SVG
        iconName='logoIcon'
        className={style.logo}
        alt='Логотип'>
      </SVG>
    </a>
  );
