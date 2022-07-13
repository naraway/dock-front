import { OffsetElementList } from '@nara-way/accent';
import { ApiClient, autobind } from '@nara-way/prologue';
import { CineDock } from '../../api-model';
import { CineDockDynamicQuery, CineDockQuery, CineDocksDynamicQuery } from '../query';

class CineDockQueryApiStub {
  private static _instance: CineDockQueryApiStub;

  static get instance() {
    if (!CineDockQueryApiStub._instance) {
      CineDockQueryApiStub._instance = new CineDockQueryApiStub();
    }
    return CineDockQueryApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/aggregate/dock/cine-dock', {
    resDataName: 'queryResult',
  });

  async executeCineDockQuery(query: CineDockQuery): Promise<CineDock> {
    return this.client.postNotNull<CineDock>(
      CineDock,
      '/query',
      query,
    );
  }

  async executeCineDockDynamicQuery(query: CineDockDynamicQuery): Promise<CineDock | null> {
    return this.client.postNullable<CineDock>(
      CineDock,
      '/dynamic-single/query',
      query,
    );
  }

  async executeCineDocksDynamicQuery(query: CineDocksDynamicQuery): Promise<CineDock[]> {
    return this.client.postArray<CineDock>(
      CineDock,
      '/dynamic-multi/query',
      query,
    );
  }

  async executeCineDocksPagingDynamicQuery(query: CineDocksDynamicQuery): Promise<OffsetElementList<CineDock>> {
    return this.client.postOffsetElementList<CineDock>(
      CineDock,
      '/dynamic-multi/query',
      query,
    );
  }
}

export default CineDockQueryApiStub;
