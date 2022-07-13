class SessionStage {
  id: string;
  name: string;
  kollectionVersionIds: string[];

  constructor(id: string, name: string, kollectionVersionIds: string[]) {
    this.id = id;
    this.name = name;
    this.kollectionVersionIds = kollectionVersionIds;
  }

  static fromDomain(domain: SessionStage): SessionStage {
    const sessionStage = new SessionStage(
      domain.id,
      domain.name,
      domain.kollectionVersionIds,
    );

    return sessionStage;
  }

  static fromDomains(domains: SessionStage[]): SessionStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionStage;
