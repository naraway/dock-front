import { HomeStage } from './index';

class AudiencePreference {
  defaultFirst: boolean;
  defaultStage: HomeStage;
  latestStage: HomeStage;

  constructor(defaultFirst: boolean, defaultStage: HomeStage, latestStage: HomeStage) {
    this.defaultFirst = defaultFirst;
    this.defaultStage = defaultStage;
    this.latestStage = latestStage;
  }

  static fromDomain(domain: AudiencePreference): AudiencePreference {
    const audiencePreference = new AudiencePreference(
      domain.defaultFirst,
      domain.defaultStage,
      domain.latestStage,
    );

    return audiencePreference;
  }

  static fromDomains(domains: AudiencePreference[]): AudiencePreference[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default AudiencePreference;
