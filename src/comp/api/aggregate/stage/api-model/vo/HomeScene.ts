class HomeScene {
  url: string;
  name: string;
  time: number;

  constructor(url: string, name: string, time: number) {
    this.url = url;
    this.name = name;
    this.time = time;
  }

  static fromDomain(domain: HomeScene): HomeScene {
    const homeScene = new HomeScene(
      domain.url,
      domain.name,
      domain.time,
    );

    return homeScene;
  }

  static fromDomains(domains: HomeScene[]): HomeScene[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default HomeScene;
