import { QueryRequest } from '@nara-way/accent';
import { AvailableDockRdo } from '../../api-model';

class FindCurrentCineDockQuery extends QueryRequest<AvailableDockRdo> {
  citizenId: string;

  constructor(citizenId: string) {
    super(AvailableDockRdo);
    this.citizenId = citizenId;
  }

  static fromDomain(domain: FindCurrentCineDockQuery): FindCurrentCineDockQuery {
    const query = new FindCurrentCineDockQuery(domain.citizenId);
    query.setResponse(domain);

    return query;
  }

  static by(citizenId: string): FindCurrentCineDockQuery {
    const query = new FindCurrentCineDockQuery(citizenId);
    return query;
  }
}

export default FindCurrentCineDockQuery;
