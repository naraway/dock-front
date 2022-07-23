import { QueryRequest } from '@nara-way/accent';
import { ActiveDockRdo } from '../../api-model';

class FindActiveDockQuery extends QueryRequest<ActiveDockRdo> {
  citizenUserId: string;
  email: string;
  pavilionId: string;

  constructor(
    citizenUserId: string,
    email: string,
    pavilionId: string,
  ) {
    super(ActiveDockRdo);
    this.citizenUserId = citizenUserId;
    this.email = email;
    this.pavilionId = pavilionId;
  }

  static fromDomain(domain: FindActiveDockQuery): FindActiveDockQuery {
    const query = new FindActiveDockQuery(
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
  ): FindActiveDockQuery {
    const query = new FindActiveDockQuery(
      citizenUserId,
      email,
      pavilionId
    );
    return query;
  }

  static byCitizenUserId(
    citizenUserId: string,
  ): FindActiveDockQuery {
    const query = new FindActiveDockQuery(
      citizenUserId,
      '',
      ''
    );
    return query;
  }

  static byEmailAndPavilionId(
    email: string,
    pavilionId: string,
  ): FindActiveDockQuery {
    const query = new FindActiveDockQuery(
      '',
      email,
      pavilionId,
    );
    return query;
  }
}

export default FindActiveDockQuery;
