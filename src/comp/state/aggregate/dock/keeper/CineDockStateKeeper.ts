import { CommandResponse, NameValueList, NotInstantiatedException } from '@nara-way/accent';
import { set } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import { CineDock, CineDockCdo, CineDockQuery, CineDockQueryApiStub, DockApiStub } from '../../../../api';

class CineDockStateKeeper {
  private static _instance: CineDockStateKeeper;

  static get instance() {
    if (!CineDockStateKeeper._instance) {
      CineDockStateKeeper._instance = new CineDockStateKeeper();
    }
    return CineDockStateKeeper._instance;
  }

  private readonly dockApiStub: DockApiStub;
  private readonly cineDockQueryApiStub: CineDockQueryApiStub;

  cineDock: CineDock | null = null;

  constructor(
    dockApiStub = DockApiStub.instance,
    cineDockQueryApiStub = CineDockQueryApiStub.instance,
  ) {
    this.dockApiStub = dockApiStub;
    this.cineDockQueryApiStub = cineDockQueryApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.cineDock = CineDock.new();
  }

  clear() {
    this.cineDock = null;
  }

  setProp(name: string, value: any) {
    if (!this.cineDock) {
      throw new NotInstantiatedException('CineDockStateKeeper.setProp', 'cineDock is null');
    }
    this.cineDock = set(this.cineDock, name, value);
  }

  async register(cineDockCdo: CineDockCdo): Promise<CommandResponse> {
    return this.dockApiStub.registerCineDock(cineDockCdo);
  }

  async modify(cineDockId: string, nameValues: NameValueList): Promise<CommandResponse> {
    return this.dockApiStub.modifyCineDock(cineDockId, nameValues);
  }

  async remove(cineDockId: string): Promise<CommandResponse> {
    return this.dockApiStub.removeCineDock(cineDockId);
  }

  async findCineDockById(cineDockId: string): Promise<CineDock> {
    const query = CineDockQuery.by(cineDockId);
    const cineDock = await this.cineDockQueryApiStub.executeCineDockQuery(query);

    runInAction(() => {
      this.cineDock = cineDock;
    });
    return cineDock;
  }
}

export default CineDockStateKeeper;
