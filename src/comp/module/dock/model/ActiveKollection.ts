class ActiveKollection {
  id: string;
  name: string;
  path: string;

  constructor(id: string = '', name: string = '', path: string = '') {
    this.id = id;
    this.name = name;
    this.path = path;
  }

  static fromDomain(domain: ActiveKollection) {
    return new ActiveKollection(
      domain.id,
      domain.name,
      domain.path,
    );
  }

  static new(): ActiveKollection {
    return new ActiveKollection('', '', '');
  }
}

export default ActiveKollection;
