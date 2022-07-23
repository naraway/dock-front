// @ts-ignore
import { ActiveStage, DockDial } from '@nara-way/dock';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { Box, Typography } from "@mui/material";

export default {
  title: 'view/dock/DockDial',
  component: DockDial,
} as ComponentMeta<typeof DockDial>;

const Template: ComponentStory<typeof DockDial> = () => {
  const handleStage = (stage: ActiveStage) => {
    console.log('stage', stage);
  };

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <Box>
      <Typography variant={'body1'}>
        To change stage, use DockDial on right-down corner.
      </Typography>
      <DockDial
        onStage={handleStage}
        onLogout={handleLogout}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {};
