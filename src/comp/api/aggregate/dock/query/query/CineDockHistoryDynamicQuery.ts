import { DynamicQueryRequest } from '@nara-way/accent';
import { CineDockHistory } from '../../api-model';

class CineDockHistoryDynamicQuery extends DynamicQueryRequest<CineDockHistory> {
  static fromDomain(domain: CineDockHistoryDynamicQuery): CineDockHistoryDynamicQuery {
    const query = new CineDockHistoryDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default CineDockHistoryDynamicQuery;
