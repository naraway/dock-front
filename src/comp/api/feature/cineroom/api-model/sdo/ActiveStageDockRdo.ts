import { Actor, CineroomChart, Stage, StageRole } from "../../../../aggregate";

class ActiveStageDockRdo {
  cineroomChart: CineroomChart;
  actor: Actor;
  stages: Stage[];
  stage: Stage;
  stageRoles: StageRole[];

  constructor(
    cineroomChart: CineroomChart,
    actor: Actor,
    stages: Stage[],
    stage: Stage,
    stageRoles: StageRole[],
  ) {
    this.cineroomChart = cineroomChart;
    this.actor = actor;
    this.stages = stages;
    this.stage = stage;
    this.stageRoles = stageRoles;
  }

  static fromDomain(domain: ActiveStageDockRdo): ActiveStageDockRdo {
    const activeStageDockRdo = new ActiveStageDockRdo(
      domain.cineroomChart,
      domain.actor,
      domain.stages,
      domain.stage,
      domain.stageRoles,
    );

    return activeStageDockRdo;
  }

  static fromDomains(domains: ActiveStageDockRdo[]): ActiveStageDockRdo[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static new(): ActiveStageDockRdo {
    return new ActiveStageDockRdo(CineroomChart.new(), Actor.new(), [], Stage.new(), []);
  }
}

export default ActiveStageDockRdo;
