import { DynamicQueryRequest } from '@nara-way/accent';
import { CineDockHistory } from '../../api-model';

class CineDockHistorysDynamicQuery extends DynamicQueryRequest<CineDockHistory[]> {
  static fromDomain(domain: CineDockHistorysDynamicQuery): CineDockHistorysDynamicQuery {
    const query = new CineDockHistorysDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default CineDockHistorysDynamicQuery;
