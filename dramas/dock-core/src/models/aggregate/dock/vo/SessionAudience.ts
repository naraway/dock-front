import { ValueObject } from '@nara-way/accent';

export interface SessionAudience extends ValueObject {
  id?: string;
  displayName?: string;
  email?: string;
}
