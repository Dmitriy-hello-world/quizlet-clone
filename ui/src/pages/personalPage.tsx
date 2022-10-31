import { Box } from '@mui/material';
import { FC } from 'react';

import ModulesTitle from '../features/modules/modulesTitle';
import ModulesList from '../features/modules/modulesList';
import CreateModuleBtn from '../features/modules/CreateModuleBtn';

import ModulePagination from '../features/modules/ModulesPagination';

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
