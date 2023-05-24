import { Box, useTheme } from '@mui/material';
import React from 'react';
import { SessionStage } from '~/models';
import { Workspace } from '../views/Workspace';

export const DockDial = ({
  onLogin = () => undefined,
  onLogout = () => undefined,
  onStage = (stage: SessionStage) => undefined,
}: {
  onLogin?: () => void;
  onLogout?: () => void;
  onStage?: (stage: SessionStage) => void;
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
      <Workspace onLogin={onLogin} onLogout={onLogout} onStage={onStage} />
    </Box>
  );
};
