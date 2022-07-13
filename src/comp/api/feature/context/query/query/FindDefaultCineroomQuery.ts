import { QueryRequest } from '@nara-way/accent';
import { Cineroom } from '../../../../aggregate/cineroom';

class FindDefaultCineroomQuery extends QueryRequest<Cineroom> {
  citizenId: string;

  constructor(citizenId: string) {
    super(Cineroom);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindDefaultCineroomQuery): FindDefaultCineroomQuery {
    const query = new FindDefaultCineroomQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindDefaultCineroomQuery {
    const query = new FindDefaultCineroomQuery(citizenId);
    return query;
  }
}

export default FindDefaultCineroomQuery;
