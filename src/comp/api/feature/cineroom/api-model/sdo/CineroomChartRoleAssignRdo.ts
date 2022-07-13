import { Actor, CineroomChart, Stage, StageRole } from "../../../../aggregate";

class CineroomChartRoleAssignRdo {
  cineroomChart: CineroomChart;
  stages: Stage[];
  stageRoles: StageRole[];
  actors: Actor[];

  constructor(
    cineroomChart: CineroomChart,
    stages: Stage[],
    stageRoles: StageRole[],
    actors: Actor[],
  ) {
    this.cineroomChart = cineroomChart;
    this.stages = stages;
    this.stageRoles = stageRoles;
    this.actors = actors;
  }

  static fromDomain(domain: CineroomChartRoleAssignRdo): CineroomChartRoleAssignRdo {
    const cineroomChartTreeRdo = new CineroomChartRoleAssignRdo(
      domain.cineroomChart,
      domain.stages,
      domain.stageRoles,
      domain.actors,
    );

    return cineroomChartTreeRdo;
  }

  static fromDomains(domains: CineroomChartRoleAssignRdo[]): CineroomChartRoleAssignRdo[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static new(): CineroomChartRoleAssignRdo {
    return new CineroomChartRoleAssignRdo(CineroomChart.new(), [], [], []);
  }
}

export default CineroomChartRoleAssignRdo;
