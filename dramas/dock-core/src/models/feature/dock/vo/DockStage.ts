import { IdName, ValueObject } from '@nara-way/accent';
import { DockKollection } from './DockKollection';

export interface DockStage extends ValueObject {
  actor?: IdName;
  stage?: IdName;
  active?: boolean;
  kollections?: DockKollection[];
}
