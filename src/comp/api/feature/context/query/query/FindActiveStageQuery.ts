import { QueryRequest } from '@nara-way/accent';
import { Stage } from '../../../../aggregate/stage';

class FindActiveStageQuery extends QueryRequest<Stage> {
  audienceId: string;

  constructor(audienceId: string) {
    super(Stage);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindActiveStageQuery): FindActiveStageQuery {
    const query = new FindActiveStageQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindActiveStageQuery {
    const query = new FindActiveStageQuery(audienceId);
    return query;
  }
}

export default FindActiveStageQuery;
