import { Kollectie } from '@nara-way/accent';
import { CurrentKollection } from '../../../../../module';
import { StageRole } from '../../../../aggregate/stage';

class AvailableKollection {
  kollection: CurrentKollection;
  path: string;
  current: boolean;
  kollecties: Kollectie[];
  stageRoles: StageRole[];

  constructor(
    kollection: CurrentKollection,
    path: string,
    current: boolean,
    kollecties: Kollectie[],
    stageRoles: StageRole[],
  ) {
    this.kollection = kollection;
    this.kollection.path = path;
    this.path = path;
    this.current = current;
    this.kollecties = kollecties;
    this.stageRoles = stageRoles;
  }

  static fromDomain(domain: AvailableKollection): AvailableKollection {
    const availableKollection = new AvailableKollection(
      domain.kollection,
      domain.path,
      domain.current,
      domain.kollecties,
      domain.stageRoles,
    );

    return availableKollection;
  }

  static fromDomains(domains: AvailableKollection[]): AvailableKollection[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default AvailableKollection;
