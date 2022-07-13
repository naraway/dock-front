import { CommandResponse, NameValueList, NotInstantiatedException } from '@nara-way/accent';
import { set } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';
import { DockApiStub, StageDock, StageDockCdo, StageDockQuery, StageDockQueryApiStub } from '../../../../api';

class StageDockStateKeeper {
  private static _instance: StageDockStateKeeper;

  static get instance() {
    if (!StageDockStateKeeper._instance) {
      StageDockStateKeeper._instance = new StageDockStateKeeper();
    }
    return StageDockStateKeeper._instance;
  }

  private readonly stageApiStub: DockApiStub;
  private readonly cineDockQueryApiStub: StageDockQueryApiStub;

  cineDock: StageDock | null = null;

  constructor(
    stageApiStub = DockApiStub.instance,
    cineDockQueryApiStub = StageDockQueryApiStub.instance,
  ) {
    this.stageApiStub = stageApiStub;
    this.cineDockQueryApiStub = cineDockQueryApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.cineDock = StageDock.new();
  }

  clear() {
    this.cineDock = null;
  }

  setProp(name: string, value: any) {
    if (!this.cineDock) {
      throw new NotInstantiatedException('StageDockStateKeeper.setProp', 'cineDock is null');
    }
    this.cineDock = set(this.cineDock, name, value);
  }

  async register(cineDockCdo: StageDockCdo): Promise<CommandResponse> {
    return this.stageApiStub.registerStageDock(cineDockCdo);
  }

  async modify(cineDockId: string, nameValues: NameValueList): Promise<CommandResponse> {
    return this.stageApiStub.modifyStageDock(cineDockId, nameValues);
  }

  async remove(cineDockId: string): Promise<CommandResponse> {
    return this.stageApiStub.removeStageDock(cineDockId);
  }

  async findStageDockById(cineDockId: string): Promise<StageDock> {
    const query = StageDockQuery.by(cineDockId);
    const cineDock = await this.cineDockQueryApiStub.executeStageDockQuery(query);

    runInAction(() => {
      this.cineDock = cineDock;
    });
    return cineDock;
  }
}

export default StageDockStateKeeper;
