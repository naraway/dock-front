import { DomainEntity, PickWritable } from '@nara-way/accent';
import { SessionActor, SessionScene, SessionStage } from './vo';

export interface StageDock extends DomainEntity {
  actor: SessionActor;
  stage: SessionStage;
  scene?: SessionScene;
  readonly audienceId: string;
  readonly citizenId: string;
}

export const StageDockUpdatable = ['actor', 'stage', 'scene'] as const;
