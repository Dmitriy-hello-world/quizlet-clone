import { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layout';

const MainPage = lazy(async () => await import('../pages/mainPage'));
const PersonalPage = lazy(async () => await import('../pages/personalPage'));
const NotFoundPage = lazy(async () => await import('../pages/notFoundPage'));

const RootRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="personal"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <PersonalPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default RootRouter;
