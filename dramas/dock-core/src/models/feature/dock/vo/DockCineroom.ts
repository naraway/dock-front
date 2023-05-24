import { IdName, ValueObject } from '@nara-way/accent';
import { DockStage } from './index';

export interface DockCineroom extends ValueObject {
  audience?: IdName;
  cineroom?: IdName;
  active?: boolean;
  stages?: DockStage[];
}
