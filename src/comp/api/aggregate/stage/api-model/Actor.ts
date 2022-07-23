import { DomainEntity, EntityLifeCycle, IdNameList, NameValueList, NameValueType } from '@nara-way/accent';
import ActorPreference from './vo/ActorPreference';

class Actor extends DomainEntity {
  name: string;
  email: string;
  lifeCycle: EntityLifeCycle | null = null;
  stageId: string;
  preference: ActorPreference | null = null;
  cineroomRoleBooks: IdNameList | null = null;
  citizenId: string | null = null;
  audienceId: string | null = null;

  constructor(name: string, email: string, stageId: string) {
    super();
    this.name = name;
    this.email = email;
    this.stageId = stageId;
  }

  static fromDomain(domain: Actor): Actor {
    const actor = new Actor(
      domain.name,
      domain.email,
      domain.stageId,
    );

    actor.setDomainEntity(domain);
    actor.lifeCycle = domain.lifeCycle;
    actor.preference = domain.preference ? ActorPreference.fromDomain(domain.preference) : null;
    actor.cineroomRoleBooks = domain.cineroomRoleBooks;
    actor.audienceId = domain.audienceId ? domain.audienceId : null;
    actor.citizenId = domain.citizenId ? domain.citizenId : null;
    return actor;
  }

  static fromDomains(domains: Actor[]): Actor[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: Actor): NameValueList {
    return NameValueList.fromModel(Actor, model, {
      name: NameValueType.String,
      email: NameValueType.String,
      lifeCycle: NameValueType.String,
      preference: NameValueType.Json,
      cineroomRoleBooks: NameValueType.Json,
    });
  }

  static new(): Actor {
    return new Actor('', '', '');
  }

}

export default Actor;
