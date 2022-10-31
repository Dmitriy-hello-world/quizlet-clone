import { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ReactComponent as Spinner } from '../assets/svg/spinner.svg';

import Layout from './layout';

const MainPage = lazy(async () => await import('../pages/mainPage'));
const PersonalPage = lazy(async () => await import('../pages/personalPage'));
const NotFoundPage = lazy(async () => await import('../pages/notFound/notFoundPage'));
const ModulePage = lazy(async () => await import('../pages/modulePage'));

const RootRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner style={spinnerStyled} />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="personal"
          element={
            <Suspense fallback={<Spinner style={spinnerStyled} />}>
              <PersonalPage />
            </Suspense>
          }
        />
        <Route
          path="personal/:id"
          element={
            <Suspense fallback={<Spinner style={spinnerStyled} />}>
              <ModulePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Spinner style={spinnerStyled} />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

const spinnerStyled = {
  width: '300px',
  height: '300px',
  margin: '50px auto',
  display: 'block',
};

export default RootRouter;
