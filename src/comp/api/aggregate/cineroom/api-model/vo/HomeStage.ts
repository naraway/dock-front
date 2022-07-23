class HomeStage {
  id: string;
  name: string;
  time: number;

  constructor(id: string, name: string, time: number) {
    this.id = id;
    this.name = name;
    this.time = time;
  }

  static fromDomain(domain: HomeStage): HomeStage {
    const homeStage = new HomeStage(
      domain.id,
      domain.name,
      domain.time,
    );

    return homeStage;
  }

  static fromDomains(domains: HomeStage[]): HomeStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default HomeStage;
