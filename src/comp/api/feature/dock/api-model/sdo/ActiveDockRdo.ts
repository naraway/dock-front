import { ActiveInfo } from '../../../../../module';
import { DockCineroom } from '../vo';

class ActiveDockRdo {
  citizen: ActiveInfo | null;
  pavilion: ActiveInfo | null;
  defaultStage: ActiveInfo | null;
  defaultFirstForStage: boolean | null;
  cinerooms: DockCineroom[];

  constructor(
    citizen: ActiveInfo | null,
    pavilion: ActiveInfo | null,
    defaultStage: ActiveInfo | null,
    defaultFirstForStage: boolean | null,
    cinerooms: DockCineroom[],
  ) {
    this.citizen = citizen;
    this.pavilion = pavilion;
    this.defaultStage = defaultStage;
    this.defaultFirstForStage = defaultFirstForStage;
    this.cinerooms = cinerooms;
  }

  static fromDomain(domain: ActiveDockRdo): ActiveDockRdo {
    const availableDockRdo = new ActiveDockRdo(
      domain.citizen,
      domain.pavilion,
      domain.defaultStage,
      domain.defaultFirstForStage,
      domain.cinerooms,
    );

    return availableDockRdo;
  }

  static fromDomains(domains: ActiveDockRdo[]): ActiveDockRdo[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static new(): ActiveDockRdo {
    return new ActiveDockRdo(null, null, null, null, []);
  }
}

export default ActiveDockRdo;
