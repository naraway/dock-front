import { QueryRequest } from '@nara-way/accent';
import { Actor } from '../../../../aggregate/stage';

class FindActiveActorQuery extends QueryRequest<Actor> {
  audienceId: string;

  constructor(audienceId: string) {
    super(Actor);
    this.audienceId = audienceId;
  }

  static fromDomain(domain: FindActiveActorQuery): FindActiveActorQuery {
    const query = new FindActiveActorQuery(domain.audienceId);
    query.setResponse(domain);

    return query;
  }

  static by(audienceId: string): FindActiveActorQuery {
    const query = new FindActiveActorQuery(audienceId);
    return query;
  }
}

export default FindActiveActorQuery;
