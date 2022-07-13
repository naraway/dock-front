// @ts-ignore
import { useRoles } from '@nara-way/dock';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'module/dock/useRoles',
  component: useRoles,
} as ComponentMeta<typeof useRoles>;

const Template: ComponentStory<typeof useRoles> = (args: any) => {
  const roles = useRoles(args?.drama || '');

  return (
    <Box>
      <Typography variant={'h5'}>roles</Typography>
      <pre>
        {JSON.stringify(roles, null, 2)}
      </pre>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithDrama = Template.bind({});
WithDrama.args = {
  drama: 'product',
};
