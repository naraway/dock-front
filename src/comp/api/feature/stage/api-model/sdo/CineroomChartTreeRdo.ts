import { StageNode, StageNodeType } from '../vo';

class CineroomChartTreeRdo {
  //
  id: string;
  name: string;
  type: StageNodeType;
  base: boolean;
  children: StageNode[];

  constructor(
    id: string,
    name: string,
    type: StageNodeType,
    base: boolean,
    children: StageNode[],
  ) {
    //
    this.id = id;
    this.name = name;
    this.type = type;
    this.base = base;
    this.children = children;
  }

  static fromDomain(domain: CineroomChartTreeRdo): CineroomChartTreeRdo {
    //
    const cineroomChartTreeRdo = new CineroomChartTreeRdo(
      domain.id,
      domain.name,
      domain.type,
      domain.base,
      domain.children,
    );

    return cineroomChartTreeRdo;
  }

  static fromDomains(domains: CineroomChartTreeRdo[]): CineroomChartTreeRdo[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }

  static new(): CineroomChartTreeRdo {
    //
    return new CineroomChartTreeRdo('', '', StageNodeType.BackStage, false, []);
  }
}

export default CineroomChartTreeRdo;
