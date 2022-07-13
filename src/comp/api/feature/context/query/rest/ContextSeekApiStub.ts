import { ApiClient, autobind } from '@nara-way/prologue';
import { Audience, Cineroom } from '../../../../aggregate/cineroom';
import {
  FindCurrentActorQuery,
  FindCurrentAudienceQuery,
  FindCurrentCineroomQuery, FindCurrentStageQuery,
  FindDefaultCineroomQuery, FindDefaultStageQuery
} from '../query';
import { Actor, Stage } from "~/comp";

class ContextSeekApiStub {
  private static _instance: ContextSeekApiStub;

  static get instance() {
    if (!ContextSeekApiStub._instance) {
      ContextSeekApiStub._instance = new ContextSeekApiStub();
    }
    return ContextSeekApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/feature/context', {
    resDataName: 'queryResult',
  });

  async findCurrentAudience(query: FindCurrentAudienceQuery): Promise<Audience | null> {
    return this.client.postNullable<Audience>(
      Audience,
      '/find-current-audience/query',
      query,
    );
  }

  async findCurrentCineroom(query: FindCurrentCineroomQuery): Promise<Cineroom | null> {
    return this.client.postNullable<Cineroom>(
      Cineroom,
      '/find-current-cineroom/query',
      query,
    );
  }

  async findDefaultCineroom(query: FindDefaultCineroomQuery): Promise<Cineroom | null> {
    return this.client.postNullable<Cineroom>(
      Cineroom,
      '/find-default-cineroom/query',
      query,
    );
  }

  async findCurrentActor(query: FindCurrentActorQuery): Promise<Actor | null> {
    return this.client.postNullable<Actor>(
      Actor,
      '/find-current-actor/query',
      query,
    );
  }

  async findCurrentStage(query: FindCurrentStageQuery): Promise<Stage | null> {
    return this.client.postNullable<Stage>(
      Stage,
      '/find-current-stage/query',
      query,
    );
  }

  async findDefaultStage(query: FindDefaultStageQuery): Promise<Stage | null> {
    return this.client.postNullable<Stage>(
      Stage,
      '/find-default-stage/query',
      query,
    );
  }
}

export default ContextSeekApiStub;
