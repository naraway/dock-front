class CurrentKollection {
  id: string;
  name: string;
  path: string;

  constructor(id: string = '', name: string = '', path: string = '') {
    this.id = id;
    this.name = name;
    this.path = path;
  }

  static fromDomain(domain: CurrentKollection) {
    return new CurrentKollection(
      domain.id,
      domain.name,
      domain.path,
    );
  }

  static new(): CurrentKollection {
    return new CurrentKollection('', '', '');
  }
}

export default CurrentKollection;
