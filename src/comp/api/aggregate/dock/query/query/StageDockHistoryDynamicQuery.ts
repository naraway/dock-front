import { DynamicQueryRequest } from '@nara-way/accent';
import { StageDockHistory } from '../../api-model';

class StageDockHistoryDynamicQuery extends DynamicQueryRequest<StageDockHistory> {
  static fromDomain(domain: StageDockHistoryDynamicQuery): StageDockHistoryDynamicQuery {
    const query = new StageDockHistoryDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default StageDockHistoryDynamicQuery;
