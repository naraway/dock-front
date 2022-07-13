// @ts-ignore
import { useAuth } from '@nara-way/dock';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Login } from '../../../shared';

export default {
  title: 'module/auth/useAuth',
  component: useAuth,
} as ComponentMeta<typeof useAuth>;

const Template: ComponentStory<typeof useAuth> = () => {
  const auth = useAuth();

  return (
    <Box>
      <Typography variant={'h5'}>auth</Typography>
      <pre>
        {JSON.stringify(auth, null, 2)}
      </pre>
    </Box>
  );
};

const LoginTemplate: ComponentStory<typeof useAuth> = () => {
  const auth = useAuth();

  return (
    <Box>
      <Typography variant={'h5'}>auth</Typography>
        <Login />
    </Box>
  );
};

export const Default = Template.bind({});
export const WithLogin = LoginTemplate.bind({});
