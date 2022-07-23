import { Actor, CineroomChart, Stage } from '../../../../aggregate';
import { KollectionRole } from '@nara-way/accent';

class CineroomChartRoleAssignRdo {
  cineroomChart: CineroomChart;
  stages: Stage[];
  kollectionRoles: KollectionRole[];
  actors: Actor[];

  constructor(
    cineroomChart: CineroomChart,
    stages: Stage[],
    kollectionRoles: KollectionRole[],
    actors: Actor[],
  ) {
    this.cineroomChart = cineroomChart;
    this.stages = stages;
    this.kollectionRoles = kollectionRoles;
    this.actors = actors;
  }

  static fromDomain(domain: CineroomChartRoleAssignRdo): CineroomChartRoleAssignRdo {
    const cineroomChartTreeRdo = new CineroomChartRoleAssignRdo(
      domain.cineroomChart,
      domain.stages,
      domain.kollectionRoles,
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
