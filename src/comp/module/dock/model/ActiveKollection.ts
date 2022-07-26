import { Kollectie } from '@nara-way/accent';

class ActiveKollection {
  id: string;
  name: string;
  path: string;
  kollecties: Kollectie[];

  constructor(id: string = '', name: string = '', path: string = '', kollecties: Kollectie[] = []) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.kollecties = kollecties;
  }

  static fromDomain(domain: ActiveKollection) {
    return new ActiveKollection(
      domain.id,
      domain.name,
      domain.path,
      domain.kollecties,
    );
  }

  static new(): ActiveKollection {
    return new ActiveKollection('', '', '', []);
  }
}

export default ActiveKollection;
