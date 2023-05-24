import { QueryRequest } from '@nara-way/accent';
import { StageDock } from '../../../../../models';

export interface FindSessionStageDockQuery extends QueryRequest<StageDock> {
  audienceId?: string;
}
