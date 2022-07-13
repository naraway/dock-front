import { QueryRequest } from '@nara-way/accent';
import { StageDock } from '../../api-model';

class StageDockQuery extends QueryRequest<StageDock> {
  stageDockId: string;

  constructor(stageDockId: string) {
    super(StageDock);
    this.stageDockId = stageDockId;
  }

  static fromDomain(domain: StageDockQuery): StageDockQuery {
    const query = new StageDockQuery(domain.stageDockId);
    query.setResponse(domain);

    return query;
  }

  static by(stageDockId: string): StageDockQuery {
    const query = new StageDockQuery(stageDockId);
    return query;
  }
}

export default StageDockQuery;
