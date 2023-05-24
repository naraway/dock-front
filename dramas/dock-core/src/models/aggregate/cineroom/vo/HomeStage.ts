import { ValueObject } from '@nara-way/accent';

export interface HomeStage extends ValueObject {
  id?: string;
  name?: string;
  time?: number;
}
