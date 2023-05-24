import { ValueObject } from '@nara-way/accent';

export interface HomeScene extends ValueObject {
  url?: string;
  name?: string;
  time?: number;
}
