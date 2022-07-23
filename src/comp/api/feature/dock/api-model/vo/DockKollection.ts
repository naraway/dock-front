import { Kollectie, KollectionRole } from '@nara-way/accent';
import { ActiveKollection } from '../../../../../module';

class DockKollection {
  kollection: ActiveKollection;
  path: string;
  active: boolean;
  kollecties: Kollectie[];
  kollectionRoles: KollectionRole[];

  constructor(
    kollection: ActiveKollection,
    path: string,
    active: boolean,
    kollecties: Kollectie[],
    kollectionRoles: KollectionRole[],
  ) {
    this.kollection = kollection;
    this.kollection.path = path;
    this.path = path;
    this.active = active;
    this.kollecties = kollecties;
    this.kollectionRoles = kollectionRoles;
  }

  static fromDomain(domain: DockKollection): DockKollection {
    const availableKollection = new DockKollection(
      domain.kollection,
      domain.path,
      domain.active,
      domain.kollecties,
      domain.kollectionRoles,
    );

    return availableKollection;
  }

  static fromDomains(domains: DockKollection[]): DockKollection[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default DockKollection;
