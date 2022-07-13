import { AudienceType, DomainEntity, EntityLifeCycle, NameValueList, NameValueType } from '@nara-way/accent';
import { AudiencePreference } from './vo';

class Audience extends DomainEntity {
  displayName: string;
  email: string;
  type: AudienceType | null = null;
  lifeCycle: EntityLifeCycle | null = null;
  citizenId: string;
  cineroomId: string;
  preference: AudiencePreference | null = null;
  audienceId: string | undefined; // for cdo

  constructor(displayName: string, email: string, citizenId: string, cineroomId: string) {
    super();
    this.displayName = displayName;
    this.email = email;
    this.citizenId = citizenId;
    this.cineroomId = cineroomId;
  }

  static fromDomain(domain: Audience): Audience {
    const audience = new Audience(
      domain.displayName,
      domain.email,
      domain.citizenId,
      domain.cineroomId,
    );

    audience.setDomainEntity(domain);
    audience.type = domain.type;
    audience.lifeCycle = domain.lifeCycle;
    audience.preference = domain.preference ? AudiencePreference.fromDomain(domain.preference) : null;
    return audience;
  }

  static fromDomains(domains: Audience[]): Audience[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: Audience): NameValueList {
    return NameValueList.fromModel(Audience, model, {
      displayName: NameValueType.String,
      email: NameValueType.String,
      lifeCycle: NameValueType.Json,
      preference: NameValueType.Json,
    });
  }

  static new(): Audience {
    return new Audience('', '', '', '');
  }

}

export default Audience;
