import React from 'react';
import { CurrentStage } from '../../../module';
import WorkspaceView from './view/WorkspaceView';


const DockMenuButtonContainer =
  ({
     onLogin = () => undefined,
     onLogout = () => undefined,
     onStage = (stage: CurrentStage) => undefined,
   }: {
    onLogin?: () => void,
    onLogout?: () => void,
    onStage?: (stage: CurrentStage) => void,
  }) => {
    return (
      <WorkspaceView onLogin={onLogin} onLogout={onLogout} onStage={onStage}/>
    );
  };

export default DockMenuButtonContainer;
