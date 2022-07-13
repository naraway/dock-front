import { ApiClient, autobind } from '@nara-way/prologue';
import { CineDock, StageDock } from '../../../../aggregate/dock';
import { AvailableDockRdo } from '../../api-model';
import { FindAvailableDockQuery, FindCurrentCineDockQuery, FindCurrentStageDockQuery } from '../query';

class DockSeekApiStub {
  private static _instance: DockSeekApiStub;

  static get instance() {
    if (!DockSeekApiStub._instance) {
      DockSeekApiStub._instance = new DockSeekApiStub();
    }
    return DockSeekApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/feature/dock', {
    resDataName: 'queryResult',
  });

  async findCurrentCineDock(query: FindCurrentCineDockQuery): Promise<CineDock | null> {
    return this.client.postNullable<CineDock>(
      CineDock,
      '/find-current-cine-dock/query',
      query,
    );
  }

  async findCurrentStageDock(query: FindCurrentStageDockQuery): Promise<StageDock | null> {
    return this.client.postNullable<StageDock>(
      StageDock,
      '/find-current-stage-dock/query',
      query,
    );
  }

  async findAvailableDock(query: FindAvailableDockQuery): Promise<AvailableDockRdo | null> {
    return this.client.postNullable<AvailableDockRdo>(
      AvailableDockRdo,
      '/find-available-dock/query',
      query,
    );
  }
}

export default DockSeekApiStub;
