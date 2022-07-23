import { ApiClient, autobind } from '@nara-way/prologue';
import { CineDock, StageDock } from '../../../../aggregate/dock';
import { ActiveDockRdo } from '../../api-model';
import { FindActiveDockQuery, FindActiveCineDockQuery, FindActiveStageDockQuery } from '../query';

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

  async findActiveCineDock(query: FindActiveCineDockQuery): Promise<CineDock | null> {
    return this.client.postNullable<CineDock>(
      CineDock,
      '/find-active-cine-dock/query',
      query,
    );
  }

  async findActiveStageDock(query: FindActiveStageDockQuery): Promise<StageDock | null> {
    return this.client.postNullable<StageDock>(
      StageDock,
      '/find-active-stage-dock/query',
      query,
    );
  }

  async findActiveDock(query: FindActiveDockQuery): Promise<ActiveDockRdo | null> {
    return this.client.postNullable<ActiveDockRdo>(
      ActiveDockRdo,
      '/find-active-dock/query',
      query,
    );
  }
}

export default DockSeekApiStub;
