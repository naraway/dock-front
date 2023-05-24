import { QueryRequest } from '@nara-way/accent';
import { Stage } from '../../../../../models';

export interface FindDefaultStageQuery extends QueryRequest<Stage> {
  audienceId?: string;
}
