import { StageNode, StageNodeType } from './vo';

class CineroomChartTreeRdo {
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

  static fromDomain(domain: CineroomChartTreeRdo): CineroomChartTreeRdo {
    //
    const cineroomChartTreeRdo = new CineroomChartTreeRdo(
      domain.id,
      domain.name,
      domain.type,
      domain.townSpace,
      domain.gallerySpace,
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
    return new CineroomChartTreeRdo('', '', StageNodeType.BackStage, false, false,[]);
  }
}

export default CineroomChartTreeRdo;
