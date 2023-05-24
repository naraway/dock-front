import { DomainEntity, PickWritable } from '@nara-way/accent';
import { SessionAudience, SessionCineroom } from './vo';

export interface CineDockHistory extends DomainEntity {
  readonly audience: SessionAudience;
  readonly cineroom: SessionCineroom;
  readonly accessTime: number;
  readonly citizenId: string;
}

export const CineDockHistoryUpdatable = [] as const;
