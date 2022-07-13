import { DomainEntity, NameValueList } from '@nara-way/accent';
import { SessionActor, SessionScene, SessionStage } from "~/comp";

class StageDockHistory extends DomainEntity {
  citizenId: string;
  audienceId: string;
  actor: SessionActor | null = null;
  stage: SessionStage | null = null;
  scene: SessionScene | null = null;
  accessTime: number;

  constructor(citizenId: string, audienceId: string, accessTime: number) {
    super();
    this.citizenId = citizenId;
    this.audienceId = audienceId;
    this.accessTime = accessTime;
  }

  static fromDomain(domain: StageDockHistory): StageDockHistory {
    const stageDockHistory = new StageDockHistory(
      domain.citizenId,
      domain.audienceId,
      domain.accessTime,
    );

    stageDockHistory.setDomainEntity(domain);
    stageDockHistory.actor = domain.actor ? SessionActor.fromDomain(domain.actor) : null;
    stageDockHistory.stage = domain.stage ? SessionStage.fromDomain(domain.stage) : null;
    stageDockHistory.scene = domain.scene ? SessionScene.fromDomain(domain.scene) : null;
    return stageDockHistory;
  }

  static fromDomains(domains: StageDockHistory[]): StageDockHistory[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(model: StageDockHistory): NameValueList {
    return NameValueList.fromModel(StageDockHistory, model, {});
  }

  static new(): StageDockHistory {
    return new StageDockHistory('', '', 0);
  }

}

export default StageDockHistory;
