import { DynamicQueryRequest } from '@nara-way/accent';
import { StageDockHistory } from '../../api-model';

class StageDockHistorysDynamicQuery extends DynamicQueryRequest<StageDockHistory[]> {
  static fromDomain(domain: StageDockHistorysDynamicQuery): StageDockHistorysDynamicQuery {
    const query = new StageDockHistorysDynamicQuery();
    query.setResponse(domain);

    return query;
  }
}

export default StageDockHistorysDynamicQuery;
