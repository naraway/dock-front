import { QueryRequest } from '@nara-way/accent';
import { Stage } from '../../../../aggregate/stage';

class FindDefaultStageQuery extends QueryRequest<Stage> {
  audienceId: string;

  constructor(audienceId: string) {
    super(Stage);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindDefaultStageQuery): FindDefaultStageQuery {
    const query = new FindDefaultStageQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindDefaultStageQuery {
    const query = new FindDefaultStageQuery(audienceId);
    return query;
  }
}

export default FindDefaultStageQuery;
