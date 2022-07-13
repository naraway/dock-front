import { validationUtils } from '@nara-way/prologue';
import { SessionActor, SessionScene, SessionStage, StageDockHistory } from '~/comp';

class StageDockHistoryCdo {
  actor: SessionActor;
  stage: SessionStage;
  scene: SessionScene;

  constructor(actor: SessionActor, stage: SessionStage, scene: SessionScene) {
    this.actor = actor;
    this.stage = stage;
    this.scene = scene;
  }

  static fromModel(domain: StageDockHistory): StageDockHistoryCdo {
    const params = validationUtils.checkNullableParams<StageDockHistory, keyof StageDockHistory>(
      domain,
      [
        'actor',
        'stage',
        'scene',
      ],
    );

    return new StageDockHistoryCdo(
      params.actor,
      params.stage,
      params.scene,
    );
  }
}

export default StageDockHistoryCdo;
