import { Actor, CineroomChart, CineroomRoleBook, Stage } from '../../../../aggregate';

class ActiveStageDockRdo {
  //
  cineroomChart: CineroomChart;
  actor: Actor;
  stages: Stage[];
  stage: Stage;
  cineroomRoleBook: CineroomRoleBook;

  constructor(
    cineroomChart: CineroomChart,
    actor: Actor,
    stages: Stage[],
    stage: Stage,
    cineroomRoleBook: CineroomRoleBook,
  ) {
    //
    this.cineroomChart = cineroomChart;
    this.actor = actor;
    this.stages = stages;
    this.stage = stage;
    this.cineroomRoleBook = cineroomRoleBook;
  }

  static fromDomain(domain: ActiveStageDockRdo): ActiveStageDockRdo {
    //
    const activeStageDockRdo = new ActiveStageDockRdo(
      domain.cineroomChart,
      domain.actor,
      domain.stages,
      domain.stage,
      domain.cineroomRoleBook,
    );

    return activeStageDockRdo;
  }

  static fromDomains(domains: ActiveStageDockRdo[]): ActiveStageDockRdo[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  static new(): ActiveStageDockRdo {
    //
    return new ActiveStageDockRdo(CineroomChart.new(), Actor.new(), [], Stage.new(), CineroomRoleBook.new());
  }
}

export default ActiveStageDockRdo;
