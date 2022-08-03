import React from 'react';
import { ActiveStage } from '../../../module';
import WorkspaceView from './view/WorkspaceView';

const DockMenuButtonContainer =
  ({
     onLogin = () => undefined,
     onLogout = () => undefined,
     onStage = (stage: ActiveStage) => undefined,
   }: {
    onLogin?: () => void,
    onLogout?: () => void,
    onStage?: (stage: ActiveStage) => void,
  }) => {
    return (
      <WorkspaceView onLogin={onLogin} onLogout={onLogout} onStage={onStage}/>
    );
  };

export default DockMenuButtonContainer;
