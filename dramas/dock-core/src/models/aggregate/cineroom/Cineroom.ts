import { DomainEntity, PickWritable } from '@nara-way/accent';
import { SpacePreference } from '../shared/vo/SpacePreference';

export interface Cineroom extends DomainEntity {
  code: string;
  name: string;
  preference: SpacePreference;
  readonly pavilionId: string;
}

export const CineroomUpdatable = ['code', 'name', 'preference'] as const;
