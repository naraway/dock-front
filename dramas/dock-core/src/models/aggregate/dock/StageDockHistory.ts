import { DomainEntity, PickWritable } from '@nara-way/accent';
import { SessionActor, SessionScene, SessionStage } from './vo';

export interface StageDockHistory extends DomainEntity {
  readonly actor: SessionActor;
  readonly stage: SessionStage;
  readonly scene: SessionScene;
  readonly accessTime: number;
  readonly audienceId: string;
  readonly citizenId: string;
}

export const StageDockHistoryUpdatable = [] as const;
