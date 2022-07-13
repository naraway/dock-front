import { DomainEntity, EntityLifeCycle, NameValueList, NameValueType, StringList } from '@nara-way/accent';
import ActorPreference from './vo/ActorPreference';

class Actor extends DomainEntity {
  name: string;
  email: string;
  lifeCycle: EntityLifeCycle | null = null;
  orgRoleKeys: StringList | null = null;
  stageId: string;
  stageRoleIds: string[] = [];
  preference: ActorPreference | null = null;
  audienceId: string | undefined;

  constructor(name: string, email: string, stageId: string, stageRoleIds: string[]) {
    super();
    this.name = name;
    this.email = email;
    this.stageId = stageId;
    this.stageRoleIds = stageRoleIds;
  }

  static fromDomain(domain: Actor): Actor {
    const actor = new Actor(
      domain.name,
      domain.email,
      domain.stageId,
      domain.stageRoleIds,
    );

    actor.setDomainEntity(domain);
    actor.lifeCycle = domain.lifeCycle;
    actor.orgRoleKeys = domain.orgRoleKeys ? StringList.fromDomain(domain.orgRoleKeys) : null;
    actor.preference = domain.preference ? ActorPreference.fromDomain(domain.preference) : null;
    return actor;
  }

  static fromDomains(domains: Actor[]): Actor[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: Actor): NameValueList {
    return NameValueList.fromModel(Actor, model, {
      name: NameValueType.String,
      email: NameValueType.String,
      lifeCycle: NameValueType.Json,
      preference: NameValueType.Json,
      orgRoleKeys: NameValueType.Json,
      stageRoleIds: NameValueType.Json,
    });
  }

  static new(): Actor {
    return new Actor('', '', '', []);
  }

}

export default Actor;
