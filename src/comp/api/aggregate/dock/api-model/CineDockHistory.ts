import { DomainEntity, NameValueList, NameValueType } from '@nara-way/accent';
import { SessionAudience, SessionCineroom } from "~/comp";

class CineDockHistory extends DomainEntity {
  citizenId: string;
  audience: SessionAudience | null = null;
  cineroom: SessionCineroom | null = null;
  accessTime: number;
  audienceId: string | undefined; // for cdo

  constructor(
    citizenId: string,
    accessTime: number,
  ) {
    super();
    this.citizenId = citizenId;
    this.accessTime = accessTime;
  }

  static fromDomain(domain: CineDockHistory): CineDockHistory {
    const cineDockHistory = new CineDockHistory(
      domain.citizenId,
      domain.accessTime,
    );

    cineDockHistory.setDomainEntity(domain);
    cineDockHistory.audience = domain.audience ? SessionAudience.fromDomain(domain.audience) : null;
    cineDockHistory.cineroom = domain.cineroom ? SessionCineroom.fromDomain(domain.cineroom) : null;
    return cineDockHistory;
  }

  static fromDomains(domains: CineDockHistory[]): CineDockHistory[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: CineDockHistory): NameValueList {
    return NameValueList.fromModel(CineDockHistory, model, {
      audience: NameValueType.Json,
      cineroom: NameValueType.Json,
    });
  }

  static new(): CineDockHistory {
    return new CineDockHistory('', 0);
  }

}

export default CineDockHistory;
