import { QueryRequest } from '@nara-way/accent';
import { Stage } from '../../../../../models';

export interface FindSessionStageQuery extends QueryRequest<Stage> {
  audienceId?: string;
}
