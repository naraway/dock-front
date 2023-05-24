import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { AuthorizationApi, AuthorizationResponse } from '@nara-way/checkpoint-core';

export default {
  component: undefined,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template = () => {
  const [token, setToken] = useState<AuthorizationResponse>();

  const handleClickIssueToken = async () => {
    const response = await AuthorizationApi.issueToken({
      username: 'admin@nextree.io',
      password: '1234',
      pavilionId: '1:1:1',
    });
    setToken(response.data);
  };

  const handleClickRefreshToken = async () => {
    const response = await AuthorizationApi.refreshToken({ refreshToken: '' });
    console.log(response);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={handleClickIssueToken}>Issue Token</Button>
      </Grid>
      <Grid item xs={12}>
        <TextField rows={5} fullWidth multiline value={token?.access_token} />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleClickRefreshToken}>Refresh Token</Button>
      </Grid>
      <Grid item xs={12}>
        <TextField rows={5} fullWidth multiline />
      </Grid>
    </Grid>
  );
};

export const Default = Template.bind({});
