import { ActiveInfo } from '../../../../../module';
import DockStage from './DockStage';

class DockCineroom {
  audience: ActiveInfo;
  cineroom: ActiveInfo;
  base: boolean;
  active: boolean;
  stages: DockStage[];

  constructor(
    audience: ActiveInfo,
    cineroom: ActiveInfo,
    base: boolean,
    active: boolean,
    stages: DockStage[],
  ) {
    this.audience = audience;
    this.cineroom = cineroom;
    this.base = base;
    this.active = active;
    this.stages = stages;
  }

  static fromDomain(domain: DockCineroom): DockCineroom {
    const availableCineroom = new DockCineroom(
      domain.audience,
      domain.cineroom,
      domain.base,
      domain.active,
      domain.stages,
    );

    return availableCineroom;
  }

  static fromDomains(domains: DockCineroom[]): DockCineroom[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default DockCineroom;
