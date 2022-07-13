import { QueryRequest } from '@nara-way/accent';
import { CineDockHistory } from '../../api-model';

class CineDockHistoryQuery extends QueryRequest<CineDockHistory> {
  cineDockHistoryId: string;

  constructor(cineDockHistoryId: string) {
    super(CineDockHistory);
    this.cineDockHistoryId = cineDockHistoryId;
  }

  static fromDomain(domain: CineDockHistoryQuery): CineDockHistoryQuery {
    const query = new CineDockHistoryQuery(domain.cineDockHistoryId);
    query.setResponse(domain);

    return query;
  }

  static by(cineDockHistoryId: string): CineDockHistoryQuery {
    const query = new CineDockHistoryQuery(cineDockHistoryId);
    return query;
  }
}

export default CineDockHistoryQuery;
