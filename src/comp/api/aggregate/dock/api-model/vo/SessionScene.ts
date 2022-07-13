class SessionScene {
  url: string;
  name: string;
  actorId: string;
  stageRoleIds: string[] = [];

  constructor(url: string, name: string, actorId: string, stageRoleIds: string[]) {
    this.url = url;
    this.name = name;
    this.actorId = actorId;
    this.stageRoleIds = stageRoleIds;
  }

  static fromDomain(domain: SessionScene): SessionScene {
    const sessionKollectie = new SessionScene(
      domain.url,
      domain.name,
      domain.actorId,
      domain.stageRoleIds,
    );

    return sessionKollectie;
  }

  static fromDomains(domains: SessionScene[]): SessionScene[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionScene;
