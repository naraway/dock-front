import { DomainEntity, NameValueList, NameValueType } from '@nara-way/accent';
import { SessionAudience, SessionCineroom } from '~/comp';

class CineDock extends DomainEntity {
  citizenId: string;
  audience: SessionAudience | null = null;
  cineroom: SessionCineroom | null = null;

  constructor(citizenId: string) {
    super();
    this.citizenId = citizenId;
  }

  static fromDomain(domain: CineDock): CineDock {
    const cineDock = new CineDock(
      domain.citizenId,
    );

    cineDock.setDomainEntity(domain);
    cineDock.audience = domain.audience ? SessionAudience.fromDomain(domain.audience) : null;
    cineDock.cineroom = domain.cineroom ? SessionCineroom.fromDomain(domain.cineroom) : null;
    return cineDock;
  }

  static fromDomains(domains: CineDock[]): CineDock[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: CineDock): NameValueList {
    return NameValueList.fromModel(CineDock, model, {
      audience: NameValueType.Json,
      cineroom: NameValueType.Json,
    });
  }

  static new(): CineDock {
    return new CineDock('');
  }

}

export default CineDock;
