import { CommandResponse } from '@nara-way/accent';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  Audience,
  Cineroom,
  ContextSeekApiStub,
  ContextFlowApiStub,
  FindCurrentAudienceQuery,
  FindCurrentCineroomQuery,
  FindDefaultCineroomQuery,
} from '../../../../api';

class CineroomContextFlowStateKeeper {
  private static _instance: CineroomContextFlowStateKeeper;

  static get instance() {
    if (!CineroomContextFlowStateKeeper._instance) {
      CineroomContextFlowStateKeeper._instance = new CineroomContextFlowStateKeeper();
    }
    return CineroomContextFlowStateKeeper._instance;
  }

  private readonly contextFlowApiStub: ContextFlowApiStub;
  private readonly contextSeekApiStub: ContextSeekApiStub;

  currentAudience: Audience | null = null;
  currentCineroom: Cineroom | null = null;
  defaultCineroom: Cineroom | null = null;

  constructor(
    contextFlowApiStub = ContextFlowApiStub.instance,
    contextSeekApiStub = ContextSeekApiStub.instance,
  ) {
    this.contextFlowApiStub = contextFlowApiStub;
    this.contextSeekApiStub = contextSeekApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.currentAudience = Audience.new();
    this.currentCineroom = Cineroom.new();
    this.defaultCineroom = Cineroom.new();
  }

  clear() {
    this.currentAudience = null;
    this.currentCineroom = null;
    this.defaultCineroom = null;
  }

  async modifyLatestCineroom(citizenId: string, latestCineroomId: string): Promise<CommandResponse> {
    const response = await this.contextFlowApiStub.modifyLatestCineroom(citizenId, latestCineroomId);

    await this.findCurrentAudience(citizenId);
    await this.findCurrentCineroom(citizenId);
    await this.findDefaultCineroom(citizenId);

    return response;
  }

  async findCurrentAudience(citizenId: string): Promise<Audience | null> {
    const query = FindCurrentAudienceQuery.by(citizenId);
    const currentAudience = await this.contextSeekApiStub.findCurrentAudience(query);

    runInAction(() => {
      this.currentAudience = currentAudience;
    });
    return currentAudience;
  }

  async findCurrentCineroom(citizenId: string): Promise<Cineroom | null> {
    const query = FindCurrentCineroomQuery.by(citizenId);
    const currentCineroom = await this.contextSeekApiStub.findCurrentCineroom(query);

    runInAction(() => {
      this.currentCineroom = currentCineroom;
    });
    return currentCineroom;
  }

  async findDefaultCineroom(citizenId: string): Promise<Cineroom | null> {
    const query = FindDefaultCineroomQuery.by(citizenId);
    const defaultCineroom = await this.contextSeekApiStub.findDefaultCineroom(query);

    runInAction(() => {
      this.defaultCineroom = defaultCineroom;
    });
    return defaultCineroom;
  }

  private arrayToString(values: string[]): string {
    if (values.length === 0) {
      return '["*"]';
    }
    const valuesString = values.map((value) => `${'"'}${value}${'"'}`).toString();
    return `[${valuesString}]`;
  }
}

export default CineroomContextFlowStateKeeper;
