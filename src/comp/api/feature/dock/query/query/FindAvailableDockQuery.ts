import { QueryRequest } from '@nara-way/accent';
import { AvailableDockRdo } from '../../api-model';

class FindAvailableDockQuery extends QueryRequest<AvailableDockRdo> {
  citizenUserId: string;
  email: string;
  pavilionId: string;

  constructor(
    citizenUserId: string,
    email: string,
    pavilionId: string,
  ) {
    super(AvailableDockRdo);
    this.citizenUserId = citizenUserId;
    this.email = email;
    this.pavilionId = pavilionId;
  }

  static fromDomain(domain: FindAvailableDockQuery): FindAvailableDockQuery {
    const query = new FindAvailableDockQuery(
      domain.citizenUserId,
      domain.email,
      domain.pavilionId,
    );
    query.setResponse(domain);

    return query;
  }

  static by(
    citizenUserId: string,
    email: string,
    pavilionId: string,
  ): FindAvailableDockQuery {
    const query = new FindAvailableDockQuery(
      citizenUserId,
      email,
      pavilionId
    );
    return query;
  }

  static byCitizenUserId(
    citizenUserId: string,
  ): FindAvailableDockQuery {
    const query = new FindAvailableDockQuery(
      citizenUserId,
      '',
      ''
    );
    return query;
  }

  static byEmailAndPavilionId(
    email: string,
    pavilionId: string,
  ): FindAvailableDockQuery {
    const query = new FindAvailableDockQuery(
      '',
      email,
      pavilionId,
    );
    return query;
  }
}

export default FindAvailableDockQuery;
