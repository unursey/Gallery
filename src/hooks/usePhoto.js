import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {thisPhotoRequestAsync} from '../store/thisPhoto/thisPhotoAction';

export const usePhoto = (id) => {
  const thisPhoto = useSelector(state => state.thisPhoto.thisPhoto);
  const loading = useSelector(state => state.thisPhoto.loading);
  const liked = useSelector(state => state.thisPhoto.liked);
  const likes = useSelector(state => state.thisPhoto.likes);
  const error = useSelector(state => state.thisPhoto.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thisPhotoRequestAsync(id));
  }, []);


  return [thisPhoto, loading, liked, likes, error];
};
