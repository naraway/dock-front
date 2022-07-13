class SessionCineroom {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromDomain(domain: SessionCineroom): SessionCineroom {
    const sessionCineroom = new SessionCineroom(
      domain.id,
      domain.name,
    );

    return sessionCineroom;
  }

  static fromDomains(domains: SessionCineroom[]): SessionCineroom[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SessionCineroom;
