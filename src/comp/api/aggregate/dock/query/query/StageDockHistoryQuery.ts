import { QueryRequest } from '@nara-way/accent';
import { StageDockHistory } from '../../api-model';

class StageDockHistoryQuery extends QueryRequest<StageDockHistory> {
  stageDockHistoryId: string;

  constructor(stageDockHistoryId: string) {
    super(StageDockHistory);
    this.stageDockHistoryId = stageDockHistoryId;
  }

  static fromDomain(domain: StageDockHistoryQuery): StageDockHistoryQuery {
    const query = new StageDockHistoryQuery(domain.stageDockHistoryId);
    query.setResponse(domain);

    return query;
  }

  static by(stageDockHistoryId: string): StageDockHistoryQuery {
    const query = new StageDockHistoryQuery(stageDockHistoryId);
    return query;
  }
}

export default StageDockHistoryQuery;
