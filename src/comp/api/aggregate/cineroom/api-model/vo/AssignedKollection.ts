import { DramaRole, Kollectie, KollectionRole } from '@nara-way/accent';

class AssignedKollection {
  kollectionVersionId: string;
  name: string;
  usid: string;
  path: string;
  version: string;
  builtin: boolean;
  kollecties: Kollectie[];
  kollectionRoles: KollectionRole[];

  constructor(
    kollectionVersionId: string,
    name: string,
    usid: string,
    path: string,
    version: string,
    builtin: boolean,
    kollecties: Kollectie[],
    kollectionRoles: KollectionRole[],
  ) {
    this.kollectionVersionId = kollectionVersionId;
    this.name = name;
    this.usid = usid;
    this.path = path;
    this.version = version;
    this.builtin = builtin;
    this.kollecties = kollecties;
    this.kollectionRoles = kollectionRoles;
  }

  static fromDomain(domain: AssignedKollection): AssignedKollection {
    const assignedKollection = new AssignedKollection(
      domain.kollectionVersionId,
      domain.name,
      domain.usid,
      domain.path,
      domain.version,
      domain.builtin,
      domain.kollecties,
      domain.kollectionRoles,
    );

    return assignedKollection;
  }

  static fromDomains(domains: AssignedKollection[]): AssignedKollection[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default AssignedKollection;
