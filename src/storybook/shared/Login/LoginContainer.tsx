import { DialogNoticeType, dialogUtil } from '@nara-way/prologue';
import * as React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { CitizenLoginResponseData } from '@nara-way/checkpoint';
import { useState } from 'react';
import { useAuth } from '@nara-way/dock';

interface LoginFrom {
  loginId: string;
  password: string;
  pavilionId: string;
  response: CitizenLoginResponseData | null;
}

const LoginContainer = () => {
  const auth = useAuth();
  const [ loginForm, setLoginForm ] = useState<LoginFrom>({
    loginId: '',
    password: '',
    pavilionId: '',
    response: null,
  });

  const setProp = async (event: any) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleClickLogin = async () => {
    const { loginId, password, pavilionId } = loginForm;

    if (!auth.login) {
      await dialogUtil.alert('Not a login handler.', { title: 'Login' });
      return;
    }

    if (!loginId || !password || !pavilionId) {
      await dialogUtil.alert('Not enough auth information.', { title: 'Login' });
      return;
    }

    await auth.login(loginId, password, pavilionId, handleSuccess, handleFailure);
  };

  const handleClickLogout = async () => {
    auth.logout();
    await dialogUtil.alert('Logged out.', { title: 'Logout' });
    window.location.replace(window.location.href);
  };

  const handleSuccess = async (response: CitizenLoginResponseData) => {
    setLoginForm({ ...loginForm, response });
    auth.reload();
    await dialogUtil.alert('Logged in.', { title: 'Logout' });
  };

  const handleFailure = async (reason: 'Locked' | 'NotDefined' | 'TempPassword' | 'InProgress') => {
    await dialogUtil.alert('Cannot login.', { title: 'Login' });
  };

  const initialize = () => {
    setLoginForm({
      loginId: '',
      password: '',
      pavilionId: '',
      response: null,
    });
  };

  const { loginId, password, pavilionId } = loginForm;

  return (
    <>
      {auth && auth.loggedIn ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Logged in as <small>{auth?.citizen?.loginId}</small>
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button variant={'contained'} fullWidth onClick={event => handleClickLogout()}>Logout</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'caption'}>
              If you want to test login/logout, set `AuthProvider`'s `development` to `false` on `/.storybook/preview.jsx` file.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Not loggedin
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Login Id"
                  name="loginId"
                  value={loginId}
                  onChange={setProp}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={setProp}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Pavilion Id"
                  name="pavilionId"
                  value={pavilionId}
                  onChange={setProp}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button variant={'contained'} fullWidth onClick={event => handleClickLogin()}>Login</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth onClick={event => initialize()}>Reset</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LoginContainer;
