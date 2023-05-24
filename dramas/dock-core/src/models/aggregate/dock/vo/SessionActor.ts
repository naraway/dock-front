import { ValueObject } from '@nara-way/accent';

export interface SessionActor extends ValueObject {
  id?: string;
  name?: string;
  email?: string;
}
