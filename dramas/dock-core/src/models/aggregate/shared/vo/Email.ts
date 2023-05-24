import { ValueObject } from '@nara-way/accent';
import { Tier } from './Tier';

export interface Email extends ValueObject {
  email?: string;
  tier?: keyof typeof Tier;
  verified?: boolean;
}
