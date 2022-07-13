import { DynamicQueryRequest } from '@nara-way/accent';
import { CineDock } from '../../api-model';

class CineDocksDynamicQuery extends DynamicQueryRequest<CineDock[]> {
  static fromDomain(domain: CineDocksDynamicQuery): CineDocksDynamicQuery {
    const query = new CineDocksDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default CineDocksDynamicQuery;
