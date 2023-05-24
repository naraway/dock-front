import { DomainEntity, PickWritable } from '@nara-way/accent';
import { SessionAudience, SessionCineroom } from './vo';

export interface CineDock extends DomainEntity {
  audience: SessionAudience;
  cineroom: SessionCineroom;
  readonly citizenId: string;
}

export const CineDockUpdatable = ['audience', 'cineroom'] as const;
