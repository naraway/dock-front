import { ValueObject } from '@nara-way/accent';

export interface Creator extends ValueObject {
  name?: string;
  title?: string;
  email?: string;
}
