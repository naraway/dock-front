import React from 'react';
import { SessionStage } from '../../../models';
import { Workspace } from '../views/Workspace';

export const DockMenuButton = ({
  onLogin = () => undefined,
  onLogout = () => undefined,
  onStage = (stage: SessionStage) => undefined,
}: {
  onLogin?: () => void;
  onLogout?: () => void;
  onStage?: (stage: SessionStage) => void;
}) => {
  return <Workspace onLogin={onLogin} onLogout={onLogout} onStage={onStage} />;
};
