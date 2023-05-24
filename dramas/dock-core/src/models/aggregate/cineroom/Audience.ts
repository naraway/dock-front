import { DomainEntity, MemberType, PickWritable } from '@nara-way/accent';
import { EntityLifeCycle } from '../shared/vo/EntityLifeCycle';
import { AudiencePreference } from './vo';

export interface Audience extends DomainEntity {
  usid: string;
  email: string;
  displayName: string;
  type: keyof typeof MemberType;
  lifeCycle: keyof typeof EntityLifeCycle;
  preference: AudiencePreference;
  readonly citizenId: string;
  readonly cineroomId: string;
  readonly pavilionId: string;
}

export const AudienceUpdatable = ['usid', 'displayName', 'email', 'type', 'lifeCycle', 'preference'] as const;
