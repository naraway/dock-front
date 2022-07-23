import { QueryRequest } from '@nara-way/accent';
import { ActiveDockRdo } from '../../api-model';

class FindActiveStageDockQuery extends QueryRequest<ActiveDockRdo> {
  audienceId: string;

  constructor(audienceId: string) {
    super(ActiveDockRdo);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindActiveStageDockQuery): FindActiveStageDockQuery {
    const query = new FindActiveStageDockQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindActiveStageDockQuery {
    const query = new FindActiveStageDockQuery(audienceId);
    return query;
  }
}

export default FindActiveStageDockQuery;
