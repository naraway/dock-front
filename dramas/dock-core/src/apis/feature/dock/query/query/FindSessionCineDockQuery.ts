import { QueryRequest } from '@nara-way/accent';
import { CineDock } from '../../../../../models';

export interface FindSessionCineDockQuery extends QueryRequest<CineDock> {
  citizenId?: string;
}
