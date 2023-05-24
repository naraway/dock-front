import { IdName } from '@nara-way/accent';
import { DockCineroom } from '../vo';

export interface SessionDockRdo {
  osid?: string;
  usid?: string;
  citizen?: IdName;
  pavilion?: IdName;
  defaultStage?: IdName;
  defaultFirstForStage?: boolean;
  cinerooms?: DockCineroom[];
}
