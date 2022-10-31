import { FC } from 'react';
import { Link } from 'react-router-dom';

import ErrorGif from '../../assets/img/error.gif';

import './notFound.css';
const NotFoundPage: FC = () => {
  return (
    <div className="pageNotFound">
      <img src={ErrorGif} alt="error404" />
      <div className="pageNotFound__text">Error 404! Page not Found!</div>
      <div className="pageNotFound__text">
        go to
        <Link className="pageNotFound__link" to="/">
          {' Home '}
        </Link>
        page
      </div>
    </div>
  );
};

export default NotFoundPage;
