import { Box, Typography } from '@mui/material';
import { SessionDockRdo } from '@nara-way/dock-core';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect } from 'react';
import { DevAuth, DevDock } from '../models';
import { useAuth } from './useAuth';
import { useDock } from './useDock';

export default {
  component: undefined,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template = () => {
  const { authorized, context, switchContext } = useDock();

  const handleSwitchContext = async (stageId?: string, url?: string) => {
    await switchContext({ stageId, url });
  };

  return (
    <Box>
      <Typography variant={'h5'}>Dock</Typography>
      <pre style={{ border: '1px solid silver', padding: '1em' }}>{JSON.stringify(context, null, 2)}</pre>
      {authorized && (
        <>
          <Typography variant={'h5'}>Tenant Keys</Typography>
          <pre style={{ border: '1px solid silver', padding: '1em' }}>
            <p> - actorId: {context.actor?.id}</p>
            <p> - audienceId: {context.audience?.id}</p>
            <p> - citizenId: {context.citizen?.id}</p>
          </pre>
          <Typography variant={'h5'}>Workspace Keys</Typography>
          <pre style={{ border: '1px solid silver', padding: '1em' }}>
            <p> - stageId: {context.stage?.id}</p>
            <p> - cineroomId: {context.cineroom?.id}</p>
            <p> - pavilionId: {context.pavilion?.id}</p>
          </pre>
        </>
      )}
    </Box>
  );
};

const TemplateWithDevDock: ComponentStory<any> = () => {
  const auth = useAuth();
  const dock = useDock();
  const { authorized, context } = dock;

  // dev auth first
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

  useEffect(() => {
    const info: SessionDockRdo = {
      pavilion: { id: '1:1:1', name: 'NARA Way' },
      citizen: { id: '1@1:1:1', name: 'NARA' },
      cinerooms: [
        {
          cineroom: { id: '1:1:1:1', name: 'Management' },
          audience: { id: '1@1:1:1:1', name: 'NARA' },
          active: true,
          stages: [
            {
              stage: { id: '1:1:1:1-1', name: 'Lab' },
              actor: { id: '1@1:1:1:1-1', name: 'NARA' },
              active: true,
              kollections: [
                {
                  kollection: { code: 'board', name: 'Board' },
                  path: 'board',
                  active: true,
                  kollecties: [
                    {
                      path: 'notice',
                      name: 'Notice',
                      requiredRoles: ['user'],
                    },
                  ],
                  kollectionRoles: [
                    {
                      code: 'user',
                      name: 'User',
                      defaultRole: true,
                      dramaRoles: [
                        {
                          code: 'board:user',
                          name: 'User',
                          dramaId: 'board',
                          defaultRole: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      defaultStage: { id: '1:1:1:1-1', name: 'Workspace' },
      defaultFirstForStage: true,
    };

    const dev: DevDock = {
      development: true,
      session: info,
    };

    dock._dev.init(dev);
  }, []);

  return (
    <Box>
      <Typography variant={'h5'}>Dock</Typography>
      <pre style={{ border: '1px solid silver', padding: '1em' }}>{JSON.stringify(context, null, 2)}</pre>
      {authorized && (
        <>
          <Typography variant={'h5'}>Tenant Keys</Typography>
          <pre style={{ border: '1px solid silver', padding: '1em' }}>
            <p> - actorId: {context.actor?.id}</p>
            <p> - audienceId: {context.audience?.id}</p>
            <p> - citizenId: {context.citizen?.id}</p>
          </pre>
          <Typography variant={'h5'}>Workspace Keys</Typography>
          <pre style={{ border: '1px solid silver', padding: '1em' }}>
            <p> - stageId: {context.stage?.id}</p>
            <p> - cineroomId: {context.cineroom?.id}</p>
            <p> - pavilionId: {context.pavilion?.id}</p>
          </pre>
        </>
      )}
    </Box>
  );
};

export const Default = Template.bind({});
export const WithDevDock = TemplateWithDevDock.bind({});
