import { QueryRequest } from '@nara-way/accent';
import { Cineroom } from '../../../../../models';

export interface FindDefaultCineroomQuery extends QueryRequest<Cineroom> {
  citizenId?: string;
}
