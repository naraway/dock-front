import { ApiClient, autobind } from '@nara-way/prologue';
import { Audience, Cineroom } from '../../../../aggregate/cineroom';
import {
  FindActiveActorQuery,
  FindActiveAudienceQuery,
  FindActiveCineroomQuery, FindActiveStageQuery,
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

  async findActiveAudience(query: FindActiveAudienceQuery): Promise<Audience | null> {
    return this.client.postNullable<Audience>(
      Audience,
      '/find-active-audience/query',
      query,
    );
  }

  async findActiveCineroom(query: FindActiveCineroomQuery): Promise<Cineroom | null> {
    return this.client.postNullable<Cineroom>(
      Cineroom,
      '/find-active-cineroom/query',
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

  async findActiveActor(query: FindActiveActorQuery): Promise<Actor | null> {
    return this.client.postNullable<Actor>(
      Actor,
      '/find-active-actor/query',
      query,
    );
  }

  async findActiveStage(query: FindActiveStageQuery): Promise<Stage | null> {
    return this.client.postNullable<Stage>(
      Stage,
      '/find-active-stage/query',
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
