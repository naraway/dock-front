import { QueryRequest } from '@nara-way/accent';
import { SessionDockRdo } from '../../../../../models';

export interface FindSessionDockQuery extends QueryRequest<SessionDockRdo> {
  citizenUserId?: string;
  usid?: string;
  pavilionId?: string;
}
