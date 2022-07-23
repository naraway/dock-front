import { makeAutoObservable, runInAction } from 'mobx';
import {
  FindActiveDockQuery,
  ActiveDockRdo,
  CineDock,
  FindActiveCineDockQuery,
  FindActiveStageDockQuery,
  DockSeekApiStub,
  StageDock,
} from '../../../../api';

class DockFlowStateKeeper {
  private static _instance: DockFlowStateKeeper;

  static get instance() {
    if (!DockFlowStateKeeper._instance) {
      DockFlowStateKeeper._instance = new DockFlowStateKeeper();
    }
    return DockFlowStateKeeper._instance;
  }

  private readonly dockFlowQueryApiStub: DockSeekApiStub;

  availableDock: ActiveDockRdo | null = null;
  currentCineDock: CineDock | null = null;
  currentStageDock: StageDock | null = null;

  constructor(
    dockFlowQueryApiStub = DockSeekApiStub.instance,
  ) {
    this.dockFlowQueryApiStub = dockFlowQueryApiStub;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init() {
    this.availableDock = ActiveDockRdo.new();
    this.currentCineDock = CineDock.new();
    this.currentStageDock = StageDock.new();
  }

  clear() {
    this.availableDock = null;
    this.currentCineDock = null;
    this.currentStageDock = null;
  }

  async findAvailableDockWithCitizenId(
    citizenUserId: string,
  ): Promise<ActiveDockRdo | null> {
    const query = FindActiveDockQuery.byCitizenUserId(citizenUserId);
    const availableDock = await this.dockFlowQueryApiStub.findActiveDock(query);

    runInAction(() => {
      this.availableDock = availableDock;
    });
    return availableDock;
  }

  async findAvailableDockWithEmailAndPavilionId(
    email: string,
    pavilionId: string,
  ): Promise<ActiveDockRdo | null> {
    const query = FindActiveDockQuery.byEmailAndPavilionId(email, pavilionId);
    const availableDock = await this.dockFlowQueryApiStub.findActiveDock(query);

    runInAction(() => {
      this.availableDock = availableDock;
    });
    return availableDock;
  }

  async findCurrentCineDock(citizenId: string): Promise<CineDock | null> {
    const query = FindActiveCineDockQuery.by(citizenId);
    const currentCineDock = await this.dockFlowQueryApiStub.findActiveCineDock(query);

    runInAction(() => {
      this.currentCineDock = currentCineDock;
    });
    return currentCineDock;
  }

  async findCurrentStageDock(audienceId: string): Promise<StageDock | null> {
    const query = FindActiveStageDockQuery.by(audienceId);
    const currentStageDock = await this.dockFlowQueryApiStub.findActiveStageDock(query);

    runInAction(() => {
      this.currentStageDock = currentStageDock;
    });
    return currentStageDock;
  }

  private arrayToString(values: string[]): string {
    if (values.length === 0) {
      return '["*"]';
    }
    const valuesString = values.map((value) => `${'"'}${value}${'"'}`).toString();
    return `[${valuesString}]`;
  }
}

export default DockFlowStateKeeper;
