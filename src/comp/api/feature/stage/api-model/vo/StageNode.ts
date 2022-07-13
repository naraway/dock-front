import StageNodeType from './StageNodeType';

class StageNode {
  //
  id: string;
  name: string;
  type: StageNodeType;
  townSpace: boolean;
  gallerySpace: boolean;
  children: StageNode[];

  constructor(
    id: string,
    name: string,
    type: StageNodeType,
    townSpace: boolean,
    gallerySpace: boolean,
    children: StageNode[],
  ) {
    //
    this.id = id;
    this.name = name;
    this.type = type;
    this.townSpace = townSpace;
    this.gallerySpace = gallerySpace;
    this.children = children;
  }

  static fromDomain(domain: StageNode): StageNode {
    //
    const sessionStage = new StageNode(
      domain.id,
      domain.name,
      domain.type,
      domain.townSpace,
      domain.gallerySpace,
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
