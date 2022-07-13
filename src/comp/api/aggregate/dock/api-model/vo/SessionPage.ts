class SessionPage {
  basePath: string;
  actorId: string;
  stageRoleIds: string[] = [];

  constructor(basePath: string, actorId: string, stageRoleIds: string[]) {
    this.basePath = basePath;
    this.actorId = actorId;
    this.stageRoleIds = stageRoleIds;
  }

  static fromDomain(domain: SessionPage): SessionPage {
    const sessionKollectie = new SessionPage(
      domain.basePath,
      domain.actorId,
      domain.stageRoleIds,
    );

    return sessionKollectie;
  }

  static fromDomains(domains: SessionPage[]): SessionPage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionPage;
