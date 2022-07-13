import { HomeScene } from '~/comp';

class ActorPreference {
  defaultFirst: boolean;
  latestScene: HomeScene;

  constructor(defaultFirst: boolean, latestScene: HomeScene) {
    this.defaultFirst = defaultFirst;
    this.latestScene = latestScene;
  }

  static fromDomain(domain: ActorPreference): ActorPreference {
    const actorPreference = new ActorPreference(
      domain.defaultFirst,
      domain.latestScene,
    );

    return actorPreference;
  }

  static fromDomains(domains: ActorPreference[]): ActorPreference[] {
    return domains.map(domain => this.fromDomain(domain));
  }
}

export default ActorPreference;
