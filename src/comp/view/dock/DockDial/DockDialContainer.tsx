import { Box, useTheme } from '@mui/material';
import React from 'react';
import { ActiveStage } from '../../../module';
import WorkspaceView from './view/WorkspaceView';


const DockDialContainer =
  ({
     onLogin = () => undefined,
     onLogout = () => undefined,
     onStage = (stage: ActiveStage) => undefined,
   }: {
    onLogin?: () => void,
    onLogout?: () => void,
    onStage?: (stage: ActiveStage) => void,
  }) => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <WorkspaceView onLogin={onLogin} onLogout={onLogout} onStage={onStage}/>
      </Box>
    );
  };

export default DockDialContainer;
