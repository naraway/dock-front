import { Current } from '../../../../../module';
import AvailableStage from './AvailableStage';

class AvailableCineroom {
  audience: Current;
  cineroom: Current;
  current: boolean;
  stages: AvailableStage[];

  constructor(
    audience: Current,
    cineroom: Current,
    current: boolean,
    stages: AvailableStage[],
  ) {
    this.audience = audience;
    this.cineroom = cineroom;
    this.current = current;
    this.stages = stages;
  }

  static fromDomain(domain: AvailableCineroom): AvailableCineroom {
    const availableCineroom = new AvailableCineroom(
      domain.audience,
      domain.cineroom,
      domain.current,
      domain.stages,
    );

    return availableCineroom;
  }

  static fromDomains(domains: AvailableCineroom[]): AvailableCineroom[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default AvailableCineroom;
