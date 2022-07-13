import { DomainEntity, NameValueList } from '@nara-way/accent';
import { SessionActor, SessionScene, SessionStage } from '~/comp';

class StageDock extends DomainEntity {
  citizenId: string;
  audienceId: string;
  actor: SessionActor | null = null;
  stage: SessionStage | null = null;
  scene: SessionScene | null = null;

  constructor(citizenId: string, audienceId: string) {
    super();
    this.citizenId = audienceId;
    this.audienceId = audienceId;
  }

  static fromDomain(domain: StageDock): StageDock {
    const stageDock = new StageDock(
      domain.citizenId,
      domain.audienceId,
    );

    stageDock.setDomainEntity(domain);
    stageDock.actor = domain.actor ? SessionActor.fromDomain(domain.actor) : null;
    stageDock.stage = domain.stage ? SessionStage.fromDomain(domain.stage) : null;
    stageDock.scene = domain.scene ? SessionScene.fromDomain(domain.scene) : null;
    return stageDock;
  }

  static fromDomains(domains: StageDock[]): StageDock[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: StageDock): NameValueList {
    return NameValueList.fromModel(StageDock, model, {});
  }

  static new(): StageDock {
    return new StageDock('', '');
  }

}

export default StageDock;
