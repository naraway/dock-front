import { CodeName, IdName } from '@nara-way/accent';

class CineroomRole {
  kollection: IdName;
  kollectionVersionId: string;
  kollectionRole: CodeName;

  constructor(
    kollection: IdName,
    kollectionVersionId: string,
    kollectionRole: CodeName,
  ) {
    this.kollection = kollection;
    this.kollectionVersionId = kollectionVersionId;
    this.kollectionRole = kollectionRole;
  }

  static fromDomain(domain: CineroomRole): CineroomRole {
    const cineroomRole = new CineroomRole(
      domain.kollection,
      domain.kollectionVersionId,
      domain.kollectionRole,
    );

    return cineroomRole;
  }

  static fromDomains(domains: CineroomRole[]): CineroomRole[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default CineroomRole;
