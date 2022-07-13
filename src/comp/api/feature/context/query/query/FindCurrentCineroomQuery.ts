import { QueryRequest } from '@nara-way/accent';
import { Cineroom } from '../../../../aggregate/cineroom';

class FindCurrentCineroomQuery extends QueryRequest<Cineroom> {
  citizenId: string;

  constructor(citizenId: string) {
    super(Cineroom);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindCurrentCineroomQuery): FindCurrentCineroomQuery {
    const query = new FindCurrentCineroomQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindCurrentCineroomQuery {
    const query = new FindCurrentCineroomQuery(citizenId);
    return query;
  }
}

export default FindCurrentCineroomQuery;
