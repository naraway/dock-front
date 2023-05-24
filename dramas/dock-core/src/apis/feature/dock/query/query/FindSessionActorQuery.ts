import { QueryRequest } from '@nara-way/accent';
import { Actor } from '../../../../../models';

export interface FindSessionActorQuery extends QueryRequest<Actor> {
  audienceId?: string;
}
