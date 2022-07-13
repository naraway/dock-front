class SessionAudience {
  id: string;
  displayName: string;
  email: string;

  constructor(id: string, displayName: string, email: string) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
  }

  static fromDomain(domain: SessionAudience): SessionAudience {
    const sessionAudience = new SessionAudience(
      domain.id,
      domain.displayName,
      domain.email,
    );

    return sessionAudience;
  }

  static fromDomains(domains: SessionAudience[]): SessionAudience[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionAudience;
