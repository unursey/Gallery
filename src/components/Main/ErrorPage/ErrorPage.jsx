import style from './ErrorPage.module.css';
import {Text} from '../../../UI/Text/Text';

export const ErrorPage = () => {
  console.log(style);
  return (
    <div>
      <Text As="p" center>
        Ошибка 404.
      </Text>
    </div>
  );
};
