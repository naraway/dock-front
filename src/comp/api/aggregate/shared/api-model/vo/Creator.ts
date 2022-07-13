class Creator {
  name: string;
  title: string;
  email: string;

  constructor(name: string, title: string, email: string) {
    this.name = name;
    this.title = title;
    this.email = email;
  }

  static fromDomain(domain: Creator): Creator {
    const creator = new Creator(
      domain.name,
      domain.title,
      domain.email,
    );

    return creator;
  }

  static fromDomains(domains: Creator[]): Creator[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default Creator;
