class Current {
  id: string;
  name: string;

  constructor(id: string = '', name: string = '') {
    this.id = id;
    this.name = name;
  }

  static fromDomain(domain: Current) {
    return new Current(
      domain.id,
      domain.name,
    );
  }

  static new(): Current {
    return new Current('', '');
  }
}

export default Current;
