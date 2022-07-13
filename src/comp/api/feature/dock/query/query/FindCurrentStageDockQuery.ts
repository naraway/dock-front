import { QueryRequest } from '@nara-way/accent';
import { AvailableDockRdo } from '../../api-model';

class FindCurrentStageDockQuery extends QueryRequest<AvailableDockRdo> {
  audienceId: string;

  constructor(audienceId: string) {
    super(AvailableDockRdo);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindCurrentStageDockQuery): FindCurrentStageDockQuery {
    const query = new FindCurrentStageDockQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindCurrentStageDockQuery {
    const query = new FindCurrentStageDockQuery(audienceId);
    return query;
  }
}

export default FindCurrentStageDockQuery;
