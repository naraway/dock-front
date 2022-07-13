import { QueryRequest } from '@nara-way/accent';
import { Actor } from '../../../../aggregate/stage';

class FindCurrentActorQuery extends QueryRequest<Actor> {
  audienceId: string;

  constructor(audienceId: string) {
    super(Actor);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindCurrentActorQuery): FindCurrentActorQuery {
    const query = new FindCurrentActorQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindCurrentActorQuery {
    const query = new FindCurrentActorQuery(audienceId);
    return query;
  }
}

export default FindCurrentActorQuery;
