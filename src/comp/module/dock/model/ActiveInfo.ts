class ActiveInfo {
  id: string;
  name: string;

  constructor(id: string = '', name: string = '') {
    this.id = id;
    this.name = name;
  }

  static fromDomain(domain: ActiveInfo) {
    return new ActiveInfo(
      domain.id,
      domain.name,
    );
  }

  static new(): ActiveInfo {
    return new ActiveInfo('', '');
  }
}

export default ActiveInfo;
