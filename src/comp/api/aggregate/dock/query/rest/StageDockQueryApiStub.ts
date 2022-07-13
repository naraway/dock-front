import { OffsetElementList } from '@nara-way/accent';
import { ApiClient, autobind } from '@nara-way/prologue';
import { StageDock } from '../../api-model';
import { StageDockDynamicQuery, StageDockQuery, StageDocksDynamicQuery } from '../query';

class StageDockQueryApiStub {
  private static _instance: StageDockQueryApiStub;

  static get instance() {
    if (!StageDockQueryApiStub._instance) {
      StageDockQueryApiStub._instance = new StageDockQueryApiStub();
    }
    return StageDockQueryApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/aggregate/dock/stage-dock', {
    resDataName: 'queryResult',
  });

  async executeStageDockQuery(query: StageDockQuery): Promise<StageDock> {
    return this.client.postNotNull<StageDock>(
      StageDock,
      '/query',
      query,
    );
  }

  async executeStageDockDynamicQuery(query: StageDockDynamicQuery): Promise<StageDock | null> {
    return this.client.postNullable<StageDock>(
      StageDock,
      '/dynamic-single/query',
      query,
    );
  }

  async executeStageDocksDynamicQuery(query: StageDocksDynamicQuery): Promise<StageDock[]> {
    return this.client.postArray<StageDock>(
      StageDock,
      '/dynamic-multi/query',
      query,
    );
  }

  async executeStageDocksPagingDynamicQuery(query: StageDocksDynamicQuery): Promise<OffsetElementList<StageDock>> {
    return this.client.postOffsetElementList<StageDock>(
      StageDock,
      '/dynamic-multi/query',
      query,
    );
  }
}

export default StageDockQueryApiStub;
