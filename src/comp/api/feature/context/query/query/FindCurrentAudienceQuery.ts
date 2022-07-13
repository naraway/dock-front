import { QueryRequest } from '@nara-way/accent';
import { Audience } from '../../../../aggregate/cineroom';

class FindCurrentAudienceQuery extends QueryRequest<Audience> {
  citizenId: string;

  constructor(citizenId: string) {
    super(Audience);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindCurrentAudienceQuery): FindCurrentAudienceQuery {
    const query = new FindCurrentAudienceQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindCurrentAudienceQuery {
    const query = new FindCurrentAudienceQuery(citizenId);
    return query;
  }
}

export default FindCurrentAudienceQuery;
