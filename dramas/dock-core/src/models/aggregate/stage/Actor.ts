import { DomainEntity, IdNameList, PickWritable } from '@nara-way/accent';
import { EntityLifeCycle } from '../shared';
import { ActorPreference } from './vo';

export interface Actor extends DomainEntity {
  usid: string;
  displayName: string;
  email: string;
  lifeCycle: keyof typeof EntityLifeCycle;
  preference: ActorPreference;
  cineroomRoleBooks: IdNameList;
  readonly audienceId: string;
  readonly citizenId: string;
  readonly stageId: string;
  readonly cineroomId: string;
  readonly pavilionId: string;
}

export const ActorUpdatable = ['usid', 'displayName', 'email', 'lifeCycle', 'preference', 'cineroomRoleBooks'] as const;
