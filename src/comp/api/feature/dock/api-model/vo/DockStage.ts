import { ActiveInfo, ActiveStage } from '../../../../../module';
import DockKollection from './DockKollection';

class DockStage {
  actor: ActiveInfo;
  stage: ActiveStage;
  base: boolean;
  active: boolean;
  kollections: DockKollection[];

  constructor(
    actor: ActiveInfo,
    stage: ActiveStage,
    base: boolean,
    active: boolean,
    kollections: DockKollection[],
  ) {
    this.actor = actor;
    this.stage = stage;
    this.stage.kollections = kollections;
    this.base = base;
    this.active = active;
    this.kollections = kollections;
  }

  static fromDomain(domain: DockStage): DockStage {
    const availableStage = new DockStage(
      domain.actor,
      domain.stage,
      domain.base,
      domain.active,
      domain.kollections,
    );

    return availableStage;
  }

  static fromDomains(domains: DockStage[]): DockStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default DockStage;
