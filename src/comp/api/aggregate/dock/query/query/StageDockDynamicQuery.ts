import { DynamicQueryRequest } from '@nara-way/accent';
import { StageDock } from '../../api-model';

class StageDockDynamicQuery extends DynamicQueryRequest<StageDock> {
  static fromDomain(domain: StageDockDynamicQuery): StageDockDynamicQuery {
    const query = new StageDockDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default StageDockDynamicQuery;
