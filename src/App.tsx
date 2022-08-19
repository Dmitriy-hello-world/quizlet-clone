import { Fragment } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import RootRouter from './router/rootRouter';

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <RootRouter />
    </Fragment>
  );
};

export default App;
