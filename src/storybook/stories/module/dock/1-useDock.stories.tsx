// @ts-ignore
import { useDock } from '@nara-way/dock';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { ActorKey } from '@nara-way/accent';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'module/dock/useDock',
  component: useDock,
} as ComponentMeta<typeof useDock>;

const Template: ComponentStory<typeof useDock> = () => {
  const dock = useDock();

  const onClickSwitchContext = async (pageUrl: string, stageId?: string) => {
    await dock.switchContext(pageUrl, stageId);
    await dock.reload();
  };

  return (
    <Box>
      <Typography variant={'h5'}>dock</Typography>
      <pre>
        {JSON.stringify({ ...dock }, null, 2)}
      </pre>
      {dock.currentActor && (
        <>
          <Typography variant={'h5'}>member keys</Typography>
          <pre>
            <p>  - actorId: {ActorKey.fromId(dock.currentActor.id).id}</p>
            <p>  - audienceId: {ActorKey.fromId(dock.currentActor.id).genAudienceId()}</p>
            <p>  - citizenId: {ActorKey.fromId(dock.currentActor.id).genCitizenId()}</p>
            <p>  - denizenId: {ActorKey.fromId(dock.currentActor.id).genDenizenId()}</p>
          </pre>
          <Typography variant={'h5'}>space keys</Typography>
          <pre>
            <p>  - stageId: {ActorKey.fromId(dock.currentActor.id).genStageId()}</p>
            <p>  - cineroomId: {ActorKey.fromId(dock.currentActor.id).genCineroomId()}</p>
            <p>  - pavilionId: {ActorKey.fromId(dock.currentActor.id).genPavilionId()}</p>
            <p>  - squareId: {ActorKey.fromId(dock.currentActor.id).genSquareId()}</p>
            <p>  - stationId: {ActorKey.fromId(dock.currentActor.id).genStationId()}</p>
          </pre>
        </>
      )}
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {};
