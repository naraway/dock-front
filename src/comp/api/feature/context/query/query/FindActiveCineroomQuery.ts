import { QueryRequest } from '@nara-way/accent';
import { Cineroom } from '../../../../aggregate/cineroom';

class FindActiveCineroomQuery extends QueryRequest<Cineroom> {
  citizenId: string;

  constructor(citizenId: string) {
    super(Cineroom);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindActiveCineroomQuery): FindActiveCineroomQuery {
    const query = new FindActiveCineroomQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindActiveCineroomQuery {
    const query = new FindActiveCineroomQuery(citizenId);
    return query;
  }
}

export default FindActiveCineroomQuery;
