import { QueryRequest } from '@nara-way/accent';
import { Stage } from '../../../../aggregate/stage';

class FindCurrentStageQuery extends QueryRequest<Stage> {
  audienceId: string;

  constructor(audienceId: string) {
    super(Stage);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindCurrentStageQuery): FindCurrentStageQuery {
    const query = new FindCurrentStageQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindCurrentStageQuery {
    const query = new FindCurrentStageQuery(audienceId);
    return query;
  }
}

export default FindCurrentStageQuery;
