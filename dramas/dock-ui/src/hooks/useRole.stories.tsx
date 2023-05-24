import { Box, Typography } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { useRole } from './useRole';

export default {
  component: undefined,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template = () => {
  const contextRoles = useRole();
  const boardRoles = useRole('board');

  return (
    <Box>
      <Typography variant={'h5'}>Roles</Typography>
      <pre style={{ border: '1px solid silver', padding: '1em' }}>{JSON.stringify(contextRoles, null, 2)}</pre>
      <Typography variant={'h5'}>Roles for 'metro'</Typography>
      <pre style={{ border: '1px solid silver', padding: '1em' }}>{JSON.stringify(boardRoles, null, 2)}</pre>
    </Box>
  );
};

export const Default = Template.bind({});
