import { Box } from '@mui/material';
import { FC } from 'react';

import ModulesTitle from '../components/modulesTitle';
import ModulesList from '../features/modules/modulesList';
import CreateModuleBtn from '../components/CreateModuleBtn';

import ModulePagination from './../components/ModulePagination';

const PersonalPage: FC = () => {
  return (
    <Box sx={BoxStyled}>
      <ModulesTitle />
      <CreateModuleBtn />
      <ModulesList />
      <ModulePagination />
    </Box>
  );
};

export default PersonalPage;

const BoxStyled = {
  padding: '50px',
  textAlign: 'center',
};
