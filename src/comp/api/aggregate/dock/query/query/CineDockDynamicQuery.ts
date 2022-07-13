import { DynamicQueryRequest } from '@nara-way/accent';
import { CineDock } from '../../api-model';

class CineDockDynamicQuery extends DynamicQueryRequest<CineDock> {
  static fromDomain(domain: CineDockDynamicQuery): CineDockDynamicQuery {
    const query = new CineDockDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default CineDockDynamicQuery;
