import { QueryRequest } from '@nara-way/accent';
import { Cineroom } from '../../../../../models';

export interface FindSessionCineroomQuery extends QueryRequest<Cineroom> {
  citizenId?: string;
}
