import { QueryRequest } from '@nara-way/accent';
import { Audience } from '../../../../aggregate/cineroom';

class FindActiveAudienceQuery extends QueryRequest<Audience> {
  citizenId: string;

  constructor(citizenId: string) {
    super(Audience);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindActiveAudienceQuery): FindActiveAudienceQuery {
    const query = new FindActiveAudienceQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindActiveAudienceQuery {
    const query = new FindActiveAudienceQuery(citizenId);
    return query;
  }
}

export default FindActiveAudienceQuery;
