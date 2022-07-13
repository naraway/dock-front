import { Current, CurrentStage } from '../../../../../module';
import AvailableKollection from './AvailableKollection';

class AvailableStage {
  actor: Current;
  stage: CurrentStage;
  current: boolean;
  kollections: AvailableKollection[];

  constructor(
    actor: Current,
    stage: CurrentStage,
    current: boolean,
    kollections: AvailableKollection[],
  ) {
    this.actor = actor;
    this.stage = stage;
    this.stage.kollections = kollections;
    this.current = current;
    this.kollections = kollections;
  }

  static fromDomain(domain: AvailableStage): AvailableStage {
    const availableStage = new AvailableStage(
      domain.actor,
      domain.stage,
      domain.current,
      domain.kollections,
    );

    return availableStage;
  }

  static fromDomains(domains: AvailableStage[]): AvailableStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default AvailableStage;
