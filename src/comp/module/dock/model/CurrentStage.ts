import { AvailableKollection } from '../../../api';

class CurrentStage {
  id: string;
  name: string;
  kollections: AvailableKollection[];

  constructor(id: string = '', name: string = '', kollections: AvailableKollection[] = []) {
    this.id = id;
    this.name = name;
    this.kollections = kollections;
  }

  static fromDomain(domain: CurrentStage) {
    return new CurrentStage(
      domain.id,
      domain.name,
      domain.kollections,
    );
  }

  static new(): CurrentStage {
    return new CurrentStage('', '', []);
  }
}

export default CurrentStage;
