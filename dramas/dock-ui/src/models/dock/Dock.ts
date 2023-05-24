import { SessionDockRdo } from '@nara-way/dock-core';
import { DockContext } from './DockContext';

export interface Dock {
  session: SessionDockRdo;
  context: DockContext;
}

export interface DevDock {
  development: boolean;
  session: SessionDockRdo;
  context?: DockContext;
}
