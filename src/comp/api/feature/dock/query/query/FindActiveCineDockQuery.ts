import { QueryRequest } from '@nara-way/accent';
import { ActiveDockRdo } from '../../api-model';

class FindActiveCineDockQuery extends QueryRequest<ActiveDockRdo> {
  citizenId: string;

  constructor(citizenId: string) {
    super(ActiveDockRdo);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindActiveCineDockQuery): FindActiveCineDockQuery {
    const query = new FindActiveCineDockQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindActiveCineDockQuery {
    const query = new FindActiveCineDockQuery(citizenId);
    return query;
  }
}

export default FindActiveCineDockQuery;
