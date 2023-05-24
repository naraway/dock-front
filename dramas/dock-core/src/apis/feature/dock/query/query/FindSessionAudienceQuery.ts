import { QueryRequest } from '@nara-way/accent';
import { Audience } from '../../../../../models';

export interface FindSessionAudienceQuery extends QueryRequest<Audience> {
  citizenId?: string;
}
