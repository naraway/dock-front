import { StringList } from '@nara-way/accent';

class SessionActor {
  id: string;
  name: string;
  email: string;
  orgRoleKeys: StringList;

  constructor(id: string, name: string, email: string, orgRoleKeys: StringList) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.orgRoleKeys = orgRoleKeys;
  }

  static fromDomain(domain: SessionActor): SessionActor {
    const sessionActor = new SessionActor(
      domain.id,
      domain.name,
      domain.email,
      domain.orgRoleKeys,
    );

    return sessionActor;
  }

  static fromDomains(domains: SessionActor[]): SessionActor[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionActor;
