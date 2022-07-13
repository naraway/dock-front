import { KollectionRole } from './index';
import { DramaRole } from "@nara-way/accent";

class AssignedKollection {
  kollectionVersionId: string;
  name: string;
  usid: string;
  version: string;
  stageRoles: KollectionRole[];
  dramaRoles: DramaRole[];

  constructor(kollectionVersionId: string, name: string, usid: string, version: string, stageRoles: KollectionRole[], dramaRoles: DramaRole[]) {
    this.kollectionVersionId = kollectionVersionId;
    this.name = name;
    this.usid = usid;
    this.version = version;
    this.stageRoles = stageRoles;
    this.dramaRoles = dramaRoles;
  }

  static fromDomain(domain: AssignedKollection): AssignedKollection {
    const assignedKollection = new AssignedKollection(
      domain.kollectionVersionId,
      domain.name,
      domain.usid,
      domain.version,
      domain.stageRoles,
      domain.dramaRoles,
    );

    return assignedKollection;
  }

  static fromDomains(domains: AssignedKollection[]): AssignedKollection[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default AssignedKollection;
