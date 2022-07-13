import { DynamicQueryRequest } from '@nara-way/accent';
import { StageDock } from '../../api-model';

class StageDocksDynamicQuery extends DynamicQueryRequest<StageDock[]> {
  static fromDomain(domain: StageDocksDynamicQuery): StageDocksDynamicQuery {
    const query = new StageDocksDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default StageDocksDynamicQuery;
