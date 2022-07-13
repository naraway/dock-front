import { CommandResponse } from '@nara-way/accent';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  Actor,
  ContextFlowApiStub,
  FindCurrentActorQuery,
  FindCurrentStageQuery,
  Stage,
  ContextSeekApiStub,
} from '../../../../api';

class StageContextFlowStateKeeper {
  private static _instance: StageContextFlowStateKeeper;

  static get instance() {
    if (!StageContextFlowStateKeeper._instance) {
      StageContextFlowStateKeeper._instance = new StageContextFlowStateKeeper();
    }
    return StageContextFlowStateKeeper._instance;
  }

  private readonly contextFlowApiStub: ContextFlowApiStub;
  private readonly contextSeekApiStub: ContextSeekApiStub;

  currentActor: Actor | null = null;
  currentStage: Stage | null = null;
  defaultStage: Stage | null = null;

  constructor(
    contextFlowApiStub = ContextFlowApiStub.instance,
    contextSeekApiStub = ContextSeekApiStub.instance,
  ) {
    this.contextFlowApiStub = contextFlowApiStub;
    this.contextSeekApiStub = contextSeekApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.currentActor = Actor.new();
    this.currentStage = Stage.new();
    this.defaultStage = Stage.new();
  }

  clear() {
    this.currentActor = null;
    this.currentStage = null;
    this.defaultStage = null;
  }

  async modifyDefaultStage(audienceId: string, defaultStageId: string): Promise<CommandResponse> {
    const response = await this.contextFlowApiStub.modifyDefaultStage(audienceId, defaultStageId);
    return response;
  }

  async modifyLatestStage(audienceId: string, latestStageId: string, url: string, name: string): Promise<CommandResponse> {
    const response = await this.contextFlowApiStub.modifyLatestStage(audienceId, latestStageId, url, name);

    await this.findCurrentActor(audienceId);
    await this.findCurrentStage(audienceId);
    await this.findDefaultStage(audienceId);

    return response;
  }

  async toggleDefaultFirstForStage(audienceId: string, defaultFirst: boolean): Promise<CommandResponse> {
    const response = await this.contextFlowApiStub.toggleDefaultFirstForStage(audienceId, defaultFirst);
    return response;
  }

  async modifyLastScene(actorId: string, url: string, name: string): Promise<CommandResponse> {
    const response = await this.contextFlowApiStub.modifyLatestScene(actorId, url, name);

    return response;
  }

  async findCurrentActor(audienceId: string): Promise<Actor | null> {
    const query = FindCurrentActorQuery.by(audienceId);
    const currentActor = await this.contextSeekApiStub.findCurrentActor(query);

    runInAction(() => {
      this.currentActor = currentActor;
    });
    return currentActor;
  }

  async findCurrentStage(audienceId: string): Promise<Stage | null> {
    const query = FindCurrentStageQuery.by(audienceId);
    const currentStage = await this.contextSeekApiStub.findCurrentStage(query);

    runInAction(() => {
      this.currentStage = currentStage;
    });
    return currentStage;
  }

  async findDefaultStage(audienceId: string): Promise<Stage | null> {
    const query = FindCurrentStageQuery.by(audienceId);
    const defaultStage = await this.contextSeekApiStub.findDefaultStage(query);

    runInAction(() => {
      this.defaultStage = defaultStage;
    });
    return defaultStage;
  }

  private arrayToString(values: string[]): string {
    if (values.length === 0) {
      return '["*"]';
    }
    const valuesString = values.map((value) => `${'"'}${value}${'"'}`).toString();
    return `[${valuesString}]`;
  }
}

export default StageContextFlowStateKeeper;
