import { DomainEntity, NameValueList, NameValueType } from '@nara-way/accent';
import { SpacePreference } from '../../shared';

class Cineroom extends DomainEntity {
  name: string;
  preference: SpacePreference | null = null;
  pavilionId: string;
  cineroomId: string | undefined;

  constructor(name: string, pavilionId: string) {
    super();
    this.name = name;
    this.pavilionId = pavilionId;
  }

  static fromDomain(domain: Cineroom): Cineroom {
    const cineroom = new Cineroom(
      domain.name,
      domain.pavilionId,
    );

    cineroom.setDomainEntity(domain);
    cineroom.preference = domain.preference ? SpacePreference.fromDomain(domain.preference) : null;
    return cineroom;
  }

  static fromDomains(domains: Cineroom[]): Cineroom[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: Cineroom): NameValueList {
    return NameValueList.fromModel(Cineroom, model, {
      name: NameValueType.String,
      preference: NameValueType.Json,
    });
  }

  static new(): Cineroom {
    return new Cineroom('', '');
  }

}

export default Cineroom;
