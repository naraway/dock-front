import { OffsetElementList } from '@nara-way/accent';
import { ApiClient, autobind } from '@nara-way/prologue';
import { StageDockHistory } from '../../api-model';
import { StageDockHistoryDynamicQuery, StageDockHistoryQuery, StageDockHistorysDynamicQuery } from '../query';

class StageDockHistoryQueryApiStub {
  private static _instance: StageDockHistoryQueryApiStub;

  static get instance() {
    if (!StageDockHistoryQueryApiStub._instance) {
      StageDockHistoryQueryApiStub._instance = new StageDockHistoryQueryApiStub();
    }
    return StageDockHistoryQueryApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/aggregate/dock/stage-dock-history', {
    resDataName: 'queryResult',
  });

  async executeStageDockHistoryQuery(query: StageDockHistoryQuery): Promise<StageDockHistory> {
    return this.client.postNotNull<StageDockHistory>(
      StageDockHistory,
      '/query',
      query,
    );
  }

  async executeStageDockHistoryDynamicQuery(query: StageDockHistoryDynamicQuery): Promise<StageDockHistory | null> {
    return this.client.postNullable<StageDockHistory>(
      StageDockHistory,
      '/dynamic-single/query',
      query,
    );
  }

  async executeStageDockHistorysDynamicQuery(query: StageDockHistorysDynamicQuery): Promise<StageDockHistory[]> {
    return this.client.postArray<StageDockHistory>(
      StageDockHistory,
      '/dynamic-multi/query',
      query,
    );
  }

  async executeStageDockHistorysPagingDynamicQuery(query: StageDockHistorysDynamicQuery): Promise<OffsetElementList<StageDockHistory>> {
    return this.client.postOffsetElementList<StageDockHistory>(
      StageDockHistory,
      '/dynamic-multi/query',
      query,
    );
  }
}

export default StageDockHistoryQueryApiStub;
