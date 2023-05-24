import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { CitizenUser } from '@nara-way/checkpoint-core';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useDialog } from 'muibox';
import React, { useEffect, useState } from 'react';
import { DevAuth } from '../models';
import { useAuth } from './useAuth';

export default {
  component: undefined,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TemplateWithLogin = () => {
  const auth = useAuth();

  return (
    <Box>
      <Typography variant={'h5'}>auth</Typography>
      <Login />
    </Box>
  );
};

const TemplateWithStatus: ComponentStory<any> = () => {
  const auth = useAuth();
  const { _dev, ...info } = auth;

  return (
    <Box>
      <Typography variant={'h5'}>auth</Typography>
      <pre style={{ border: '1px solid silver', padding: '1em' }}>{JSON.stringify(info, null, 2)}</pre>
    </Box>
  );
};

const TemplateWithDev: ComponentStory<any> = () => {
  const auth = useAuth();

  useEffect(() => {
    const dev: DevAuth = {
      development: true,
      user: {
        username: 'nara',
        displayName: 'NARA',
        pavilionId: '1:1:1',
        email: 'nara@naraway.io',
        additionalInformation: {},
      },
      token: {
        access:
          'eyJraWQiOiJuYXJhIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJsb2NhbCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTAwMiIsImRpc3BsYXlfbmFtZSI6ImxvY2FsIiwiYXVkIjoibmFyYSIsInBhc3N3b3JkIjoiIiwibmJmIjoxNjc5Mjc1MDA4LCJzY29wZSI6WyJpbnRlcm5hbCJdLCJhdHRyaWJ1dGVzIjp7ImNpdGl6ZW5faWQiOiIwQDA6MDowIiwicGF2aWxpb25faWQiOiIwOjA6MCIsImNpbmVyb29tX2lkcyI6W10sInVzaWQiOiJsb2NhbCJ9LCJleHAiOjE3MTA4MTEwMDgsImlhdCI6MTY3OTI3NTAwOCwianRpIjoiZXlnZU5aZ0ZRNWo4ejVuMW00VWlhViIsImVtYWlsIjoiIiwidXNlcm5hbWUiOiJsb2NhbCJ9.hUyhCW-Z0WE6E5u53qBt6AsCgjERMhJ74IW-EA9xpGlLy9BBZ86cXHa_OWCJVraHu8dPQD28CTR9FaVUlPhYwtZ7O64G_NTx_ESJvRMWhjz0zohs6RdDh16805xcLfh3xaQggXOc2EVb1nE_c1OlBK2k4T32MfU2pxOnWEZSQF_swIZeqpaM6irqMdnNnAivGVQ8ixSmR9JDUFZPPrmZm7HMJcBpOhsYqVfrgQD6_GzUWNn1NirKfXWzftva_SWzM8XgOHNF-sJkjV7KJqlKVCTTjtH7C11opihTJhIEWKcQn_YC0D8iG-ZFSPMxaFVbPwXxrKSMQ8VH1jpqnKGESA',
        refresh:
          'eyJraWQiOiJuYXJhIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJsb2NhbCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6OTAwMiIsImRpc3BsYXlfbmFtZSI6ImxvY2FsIiwiYXVkIjoibmFyYSIsInBhc3N3b3JkIjoiIiwibmJmIjoxNjc5Mjc1MDA4LCJzY29wZSI6WyJpbnRlcm5hbCJdLCJhdGkiOiJleWdlTlpnRlE1ajh6NW4xbTRVaWFWIiwiYXR0cmlidXRlcyI6eyJjaXRpemVuX2lkIjoiMEAwOjA6MCIsInBhdmlsaW9uX2lkIjoiMDowOjAiLCJjaW5lcm9vbV9pZHMiOltdLCJ1c2lkIjoibG9jYWwifSwiZXhwIjoxNjc5ODc5ODA4LCJpYXQiOjE2NzkyNzUwMDgsImp0aSI6IjNhMXlvVmhRNDdFYW0xY0NMa2NJR1giLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoibG9jYWwifQ.PiLPvdMH8WRd8n5gDDERL2FnVKOIoXPVkEpBQk9dWJukjYDdieeFiiA44bX4t6PPAPCUq4ldVU0PLa8hmokKdmEOoynXJjPCWpLwvDD69qZdhV87IcfV0hUJk0Hf19wWOyp-c9jw6Gj55a0UWZ9pOj55GL7COtVPZ0A2j_ozXcRDzQHgIJ6GVD8PACJF6CA7-kvclsYrRUwReu3rt-9q3Q35zpGiy5RsWvUf-WOvip5aVveJIz4zc3FyMUkw1_7Qw_rntXoyjh0-ua8UvOTCuk4X0HyemYmqzWAY-qAG_HS3FahqE6z_yCawcb_DsoQyRhjKXttMJYqrWx13L3GtMg',
        refreshed: false,
        remembered: false,
      },
    };

    auth._dev.init(dev);
  }, []);

  const { _dev, ...info } = auth;

  return (
    <Box>
      <Typography variant={'h5'}>auth</Typography>
      <pre style={{ border: '1px solid silver', padding: '1em' }}>{JSON.stringify(info, null, 2)}</pre>
    </Box>
  );
};

export const Default = TemplateWithLogin.bind({});
export const WithStatus = TemplateWithStatus.bind({});
export const WithDevAuth = TemplateWithDev.bind({});

//

interface LoginFrom {
  username: string;
  password: string;
  pavilionId: string;
  response?: CitizenUser;
}

const Login = () => {
  const dialog = useDialog();
  const { authenticated, user, login, logout, remembered, remember } = useAuth();

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
    pavilionId: '1:1:1',
  } as LoginFrom);

  const handleForm = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleRemember = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    remember(target.checked);
  };

  const handleLogin = async () => {
    const { username, password, pavilionId } = loginForm;

    if (!username || !password || !pavilionId) {
      await dialog.alert('Not enough auth information.', { title: 'Login' });
      return;
    }

    await login({
      username,
      password,
      pavilionId,
    }).catch((e) => handleError(e));
  };

  const handleLogout = async () => {
    await logout();
    await dialog.alert('Logged out.', { title: 'Logout' });
  };

  const handleError = (e: Error) => {
    dialog.alert(`Cannot login: ${e.message}`, { title: 'Login' });
  };

  const initialize = () => {
    setLoginForm({
      username: '',
      password: '',
      pavilionId: '',
    });
  };

  const { username, password, pavilionId } = loginForm;

  return (
    <>
      {authenticated ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Logged in as <small>{user?.username ?? ''}</small>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button variant={'contained'} fullWidth onClick={(event) => handleLogout()}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>Not loggedin</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField fullWidth label="username" name="username" value={username ?? ''} onChange={handleForm} />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type="password"
                  label="password"
                  name="password"
                  value={password ?? ''}
                  onChange={handleForm}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField fullWidth label="pavilion" name="pavilionId" value={pavilionId} onChange={handleForm} />
              </Grid>
              <Grid item xs={8}>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" checked={remembered} onChange={handleRemember} />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button variant={'contained'} fullWidth onClick={handleLogin}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth onClick={(event) => initialize()}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};
