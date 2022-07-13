class HomeStage {
  stageId: string;
  stageName: string;
  time: number;

  constructor(stageId: string, stageName: string, time: number) {
    this.stageId = stageId;
    this.stageName = stageName;
    this.time = time;
  }

  static fromDomain(domain: HomeStage): HomeStage {
    const homeStage = new HomeStage(
      domain.stageId,
      domain.stageName,
      domain.time,
    );

    return homeStage;
  }

  static fromDomains(domains: HomeStage[]): HomeStage[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default HomeStage;
