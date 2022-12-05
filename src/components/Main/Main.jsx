import style from './Main.module.css';
import Layout from '../Layout';
import ThisPhoto from '../Main/ThisPhoto';
import List from './List';
import Favorites from '../Main/Favorites';
import ErrorPage from '../Main/ErrorPage';
import {Routes, Route, Navigate} from 'react-router-dom';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path='/auth' element={<Navigate to='/' />} />
        <Route path='/' element={<List />} />
        <Route path='photos/:id' element={<ThisPhoto />} />
        <Route path='/profile' element={<Favorites />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Layout>
  </main>
);
