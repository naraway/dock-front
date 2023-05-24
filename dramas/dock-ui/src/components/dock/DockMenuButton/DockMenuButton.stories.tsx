import { Box, Typography } from '@mui/material';
import React from 'react';
import { SessionStage } from '../../../models';
import { DockDial } from '../DockDial';
import { DockMenuButton } from './DockMenuButton';

export default {
  component: DockMenuButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => {
  const handleStage = (stage: SessionStage) => {
    console.log('stage', stage);
  };

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <Box>
      <Typography variant={'body1'}>To change stage, use DockDial on right-down corner.</Typography>
      <DockDial onStage={handleStage} onLogout={handleLogout} />
    </Box>
  );
};

export const Default = Template.bind({});
