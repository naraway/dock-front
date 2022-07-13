class KollectionRole {
  code: string;
  name: string;
  description: string;
  defaultRole: boolean;

  constructor(code: string, name: string, description: string, defaultRole: boolean) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.defaultRole = defaultRole;
  }

  static fromDomain(domain: KollectionRole): KollectionRole {
    const kollectionRole = new KollectionRole(
      domain.code,
      domain.name,
      domain.description,
      domain.defaultRole,
    );

    return kollectionRole;
  }

  static fromDomains(domains: KollectionRole[]): KollectionRole[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default KollectionRole;
