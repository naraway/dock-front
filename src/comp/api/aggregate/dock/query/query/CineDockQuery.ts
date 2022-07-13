import { QueryRequest } from '@nara-way/accent';
import { CineDock } from '../../api-model';

class CineDockQuery extends QueryRequest<CineDock> {
  cineDockId: string;

  constructor(cineDockId: string) {
    super(CineDock);
    this.cineDockId = cineDockId;
  }

  static fromDomain(domain: CineDockQuery): CineDockQuery {
    const query = new CineDockQuery(domain.cineDockId);
    query.setResponse(domain);

    return query;
  }

  static by(cineDockId: string): CineDockQuery {
    const query = new CineDockQuery(cineDockId);
    return query;
  }
}

export default CineDockQuery;
