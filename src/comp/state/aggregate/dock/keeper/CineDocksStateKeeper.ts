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
import { CineDock, CineDockQueryApiStub, CineDocksDynamicQuery } from '../../../../api';

class CineDocksStateKeeper {
  private static _instance: CineDocksStateKeeper;

  static get instance() {
    if (!CineDocksStateKeeper._instance) {
      CineDocksStateKeeper._instance = new CineDocksStateKeeper();
    }
    return CineDocksStateKeeper._instance;
  }

  private readonly cineDockQueryApiStub: CineDockQueryApiStub;

  cineDocks: CineDock[] = [];

  constructor(
    cineDockQueryApiStub = CineDockQueryApiStub.instance,
  ) {
    this.cineDockQueryApiStub = cineDockQueryApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.cineDocks = [];
  }

  clear() {
    this.cineDocks = [];
  }

  setProp(index: number, name: keyof CineDock, value: any) {
    if (!this.cineDocks || !this.cineDocks[index]) {
      throw new NotInstantiatedException('CineDocsStateKeeper.setProp', `cineDocs[${index}] is null`);
    }
    this.cineDocks[index] = set(this.cineDocks[index], name, value);
  }

  async findCineDocks(offset: number, limit: number): Promise<OffsetElementList<CineDock>> {
    const query = CineDocksDynamicQuery.multiParams<CineDock[]>(
      QueryParam.endParam('id', Operator.Equal, '*'),
    );

    query.offset = Offset.newAscending(offset, limit);
    query.offset.sortingField = 'id';

    const offsetElementList = await this.cineDockQueryApiStub.executeCineDocksPagingDynamicQuery(query);

    runInAction(() => {
      this.cineDocks = offsetElementList.results;
    });
    return offsetElementList;
  }

  async findCineDocksWithDynamicQuery(query: DynamicQueryRequest<CineDock[]>): Promise<CineDock[]> {
    const cienDocks = await this.cineDockQueryApiStub.executeCineDocksDynamicQuery(query);

    runInAction(() => {
      this.cineDocks = cienDocks;
    });
    return cienDocks;
  }
}

export default CineDocksStateKeeper;
