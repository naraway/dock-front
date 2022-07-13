import {
  DynamicQueryRequest,
  NotInstantiatedException,
  Offset,
  OffsetElementList,
  Operator,
  QueryParam,
} from '@nara-way/accent';
import { set } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import { StageDock, StageDockQueryApiStub, StageDocksDynamicQuery } from '../../../../api';

class StageDocksStateKeeper {
  private static _instance: StageDocksStateKeeper;

  static get instance() {
    if (!StageDocksStateKeeper._instance) {
      StageDocksStateKeeper._instance = new StageDocksStateKeeper();
    }
    return StageDocksStateKeeper._instance;
  }

  private readonly stageDockQueryApiStub: StageDockQueryApiStub;

  stageDocks: StageDock[] = [];

  constructor(
    stageDockQueryApiStub = StageDockQueryApiStub.instance,
  ) {
    this.stageDockQueryApiStub = stageDockQueryApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.stageDocks = [];
  }

  clear() {
    this.stageDocks = [];
  }

  setProp(index: number, name: keyof StageDock, value: any) {
    if (!this.stageDocks || !this.stageDocks[index]) {
      throw new NotInstantiatedException('StageDocsStateKeeper.setProp', `stageDocs[${index}] is null`);
    }
    this.stageDocks[index] = set(this.stageDocks[index], name, value);
  }

  async findStageDocks(offset: number, limit: number): Promise<OffsetElementList<StageDock>> {
    const query = StageDocksDynamicQuery.multiParams<StageDock[]>(
      QueryParam.endParam('id', Operator.Equal, '*'),
    );

    query.offset = Offset.newAscending(offset, limit);
    query.offset.sortingField = 'id';

    const offsetElementList = await this.stageDockQueryApiStub.executeStageDocksPagingDynamicQuery(query);

    runInAction(() => {
      this.stageDocks = offsetElementList.results;
    });
    return offsetElementList;
  }

  async findStageDocksWithDynamicQuery(query: DynamicQueryRequest<StageDock[]>): Promise<StageDock[]> {
    const cienDocks = await this.stageDockQueryApiStub.executeStageDocksDynamicQuery(query);

    runInAction(() => {
      this.stageDocks = cienDocks;
    });
    return cienDocks;
  }
}

export default StageDocksStateKeeper;
