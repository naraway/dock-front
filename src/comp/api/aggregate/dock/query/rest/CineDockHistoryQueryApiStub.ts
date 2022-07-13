import { OffsetElementList } from '@nara-way/accent';
import { ApiClient, autobind } from '@nara-way/prologue';
import { CineDockHistory } from '../../api-model';
import { CineDockHistoryDynamicQuery, CineDockHistoryQuery, CineDockHistorysDynamicQuery } from '../query';

class CineDockHistoryQueryApiStub {
  private static _instance: CineDockHistoryQueryApiStub;

  static get instance() {
    if (!CineDockHistoryQueryApiStub._instance) {
      CineDockHistoryQueryApiStub._instance = new CineDockHistoryQueryApiStub();
    }
    return CineDockHistoryQueryApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/aggregate/dock/cine-dock-history', {
    resDataName: 'queryResult',
  });

  async executeCineDockHistoryQuery(query: CineDockHistoryQuery): Promise<CineDockHistory> {
    return this.client.postNotNull<CineDockHistory>(
      CineDockHistory,
      '/query',
      query,
    );
  }

  async executeCineDockHistoryDynamicQuery(query: CineDockHistoryDynamicQuery): Promise<CineDockHistory | null> {
    return this.client.postNullable<CineDockHistory>(
      CineDockHistory,
      '/dynamic-single/query',
      query,
    );
  }

  async executeCineDockHistorysDynamicQuery(query: CineDockHistorysDynamicQuery): Promise<CineDockHistory[]> {
    return this.client.postArray<CineDockHistory>(
      CineDockHistory,
      '/dynamic-multi/query',
      query,
    );
  }

  async executeCineDockHistorysPagingDynamicQuery(query: CineDockHistorysDynamicQuery): Promise<OffsetElementList<CineDockHistory>> {
    return this.client.postOffsetElementList<CineDockHistory>(
      CineDockHistory,
      '/dynamic-multi/query',
      query,
    );
  }
}

export default CineDockHistoryQueryApiStub;
