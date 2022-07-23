import StageNodeType from './StageNodeType';

class StageNode {
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

  static fromDomain(domain: StageNode): StageNode {
    //
    const sessionStage = new StageNode(
      domain.id,
      domain.name,
      domain.type,
      domain.base,
      domain.children,
    );

    return sessionStage;
  }

  static fromDomains(domains: StageNode[]): StageNode[] {
    //
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default StageNode;
