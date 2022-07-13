import { Current } from '../../../../../module';
import { AvailableCineroom } from '../vo';

class AvailableDockRdo {
  citizen: Current | null;
  pavilion: Current | null;
  defaultStage: Current | null;
  defaultFirstForStage: boolean | null;
  cinerooms: AvailableCineroom[];

  constructor(
    citizen: Current | null,
    pavilion: Current | null,
    defaultStage: Current | null,
    defaultFirstForStage: boolean | null,
    cinerooms: AvailableCineroom[],
  ) {
    this.citizen = citizen;
    this.pavilion = pavilion;
    this.defaultStage = defaultStage;
    this.defaultFirstForStage = defaultFirstForStage;
    this.cinerooms = cinerooms;
  }

  static fromDomain(domain: AvailableDockRdo): AvailableDockRdo {
    const availableDockRdo = new AvailableDockRdo(
      domain.citizen,
      domain.pavilion,
      domain.defaultStage,
      domain.defaultFirstForStage,
      domain.cinerooms,
    );

    return availableDockRdo;
  }

  static fromDomains(domains: AvailableDockRdo[]): AvailableDockRdo[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static new(): AvailableDockRdo {
    return new AvailableDockRdo(null, null, null, null, []);
  }
}

export default AvailableDockRdo;
