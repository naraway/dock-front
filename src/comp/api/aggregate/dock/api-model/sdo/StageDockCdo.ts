import { validationUtils } from '@nara-way/prologue';
import { SessionActor, SessionStage, StageDock } from '~/comp';
import { SessionScene } from '../vo';

class StageDockCdo {
  actor: SessionActor;
  stage: SessionStage;
  scene: SessionScene;

  constructor(actor: SessionActor, stage: SessionStage, scene: SessionScene) {
    this.actor = actor;
    this.stage = stage;
    this.scene = scene;
  }

  static fromModel(domain: StageDock): StageDockCdo {
    const params = validationUtils.checkNullableParams<StageDock, keyof StageDock>(
      domain,
      [
        'actor',
        'stage',
        'scene',
      ],
    );

    return new StageDockCdo(
      params.actor,
      params.stage,
      params.scene,
    );
  }
}

export default StageDockCdo;
