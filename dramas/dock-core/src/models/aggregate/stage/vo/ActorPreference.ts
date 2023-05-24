import { ValueObject } from '@nara-way/accent';
import { HomeScene } from './HomeScene';

export interface ActorPreference extends ValueObject {
  latestScene?: HomeScene;
}
