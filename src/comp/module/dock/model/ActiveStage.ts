import { DockKollection } from '../../../api';

class ActiveStage {
  id: string;
  name: string;
  kollections: DockKollection[];

  constructor(id: string = '', name: string = '', kollections: DockKollection[] = []) {
    this.id = id;
    this.name = name;
    this.kollections = kollections;
  }

  static fromDomain(domain: ActiveStage) {
    return new ActiveStage(
      domain.id,
      domain.name,
      domain.kollections,
    );
  }

  static new(): ActiveStage {
    return new ActiveStage('', '', []);
  }
}

export default ActiveStage;
