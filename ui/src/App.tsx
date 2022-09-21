import { Fragment } from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import RootRouter from './router/rootRouter';
import BasicModal from './features/form/modal';

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <RootRouter />
      <BasicModal />
    </Fragment>
  );
};

export default App;
