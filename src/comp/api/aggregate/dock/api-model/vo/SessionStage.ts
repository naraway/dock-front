class SessionStage {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDomain(domain: SessionStage): SessionStage {
    const sessionStage = new SessionStage(
      domain.id,
      domain.name,
    );

    return sessionStage;
  }

  static fromDomains(domains: SessionStage[]): SessionStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionStage;
