import { ValueObject } from '@nara-way/accent';
import { HomeStage } from './HomeStage';

export interface AudiencePreference extends ValueObject {
  defaultFirst?: boolean;
  defaultStage?: HomeStage;
  latestStage?: HomeStage;
}
