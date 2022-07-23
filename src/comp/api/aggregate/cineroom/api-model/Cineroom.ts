import { DomainEntity, NameValueList, NameValueType } from '@nara-way/accent';
import { SpacePreference } from '~/comp';

class Cineroom extends DomainEntity {
  name: string;
  preference: SpacePreference | null = null;
  pavilionId: string;
  cineroomId: string | undefined;
  base: boolean;

  constructor(
    name: string,
    pavilionId: string,
    base: boolean,
  ) {
    super();
    this.name = name;
    this.pavilionId = pavilionId;
    this.base = base;
  }

  static fromDomain(domain: Cineroom): Cineroom {
    const cineroom = new Cineroom(
      domain.name,
      domain.pavilionId,
      domain.base,
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
    return new Cineroom('', '', false);
  }

}

export default Cineroom;
