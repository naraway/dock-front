import { LangSettings } from '@nara-way/accent';

class SpacePreference {
  zoneId: string;
  langSettings: LangSettings;

  constructor(
    zoneId: string,
    langSettings: LangSettings,
  ) {
    this.zoneId = zoneId;
    this.langSettings = langSettings;
  }

  static fromDomain(domain: SpacePreference): SpacePreference {
    const spacePreference = new SpacePreference(
      domain.zoneId,
      domain.langSettings,
    );

    return spacePreference;
  }

  static fromDomains(domains: SpacePreference[]): SpacePreference[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default SpacePreference;
