import { NaraException, StageKey } from '@nara-way/accent';
import { autobind, WebStorage } from '@nara-way/prologue';
import { DockCineroom, ActiveDockRdo, DockKollection, DockStage } from '~/comp/api';
import { CineroomContextFlowStateKeeper, DockFlowStateKeeper, StageContextFlowStateKeeper } from '~/comp/state';
import { ActiveInfo, ActiveKollection, ActiveStage } from '../model';

class DockStorage {
  private static _instance: DockStorage;

  static get instance() {
    if (!DockStorage._instance) {
      DockStorage._instance = new DockStorage();
    }
    return DockStorage._instance;
  }

  private readonly dockFlowStateKeeper: DockFlowStateKeeper;
  private readonly cineroomContextFlowStateKeeper: CineroomContextFlowStateKeeper;
  private readonly stageContextFlowStateKeeper: StageContextFlowStateKeeper;

  private _activeDock = WebStorage.newSession<ActiveDockRdo>('activeDock', ActiveDockRdo.fromDomain);
  private _activeCitizen = WebStorage.newSession<ActiveInfo>('activeCitizen', ActiveInfo.fromDomain);
  private _activePavilion = WebStorage.newSession<ActiveInfo>('activePavilion', ActiveInfo.fromDomain);
  private _activeAudience = WebStorage.newSession<ActiveInfo>('activeAudience', ActiveInfo.fromDomain);
  private _activeCineroom = WebStorage.newSession<ActiveInfo>('activeCineroom', ActiveInfo.fromDomain);
  private _activeActor = WebStorage.newSession<ActiveInfo>('activeActor', ActiveInfo.fromDomain);
  private _activeStage = WebStorage.newSession<ActiveStage>('activeStage', ActiveStage.fromDomain);
  private _activeKollection = WebStorage.newSession<ActiveKollection>('activeKollection', ActiveKollection.fromDomain);
  private _activeKollectionRoles = WebStorage.newSession<string[]>('activeKollectionRoles', Array);
  private _activeDramaRoles = WebStorage.newSession<string[]>('activeDramaRoles', Array);
  private _baseActor = WebStorage.newSession<ActiveInfo>('baseActor', ActiveInfo.fromDomain);
  private _baseStage = WebStorage.newSession<ActiveStage>('baseStage', ActiveStage.fromDomain);
  private _baseKollection = WebStorage.newSession<ActiveKollection>('baseKollection', ActiveKollection.fromDomain);
  private _baseKollectionRoles = WebStorage.newSession<string[]>('baseKollectionRoles', Array);
  private _baseDramaRoles = WebStorage.newSession<string[]>('baseDramaRoles', Array);
  private _defaultStage = WebStorage.newSession<ActiveInfo>('defaultStage', ActiveInfo.fromDomain);
  private _defaultFirst = WebStorage.newSession<boolean>('defaultFirst');
  private _loaded = WebStorage.newSession<boolean>('isLoaded');
  private _development: boolean = false;

  constructor(
    dockFlowStateKeeper: DockFlowStateKeeper = DockFlowStateKeeper.instance,
    cineroomContextFlowStateKeeper: CineroomContextFlowStateKeeper = CineroomContextFlowStateKeeper.instance,
    stageContextFlowStateKeeper: StageContextFlowStateKeeper = StageContextFlowStateKeeper.instance,
  ) {
    this.dockFlowStateKeeper = dockFlowStateKeeper;
    this.cineroomContextFlowStateKeeper = cineroomContextFlowStateKeeper;
    this.stageContextFlowStateKeeper = stageContextFlowStateKeeper;
    autobind(this);
  }

  async clear(): Promise<void> {
    this._activeDock.remove();
    this._defaultStage.remove();
    this._defaultFirst.remove();
    this._activeCitizen.remove();
    this._activePavilion.remove();
    this._activeAudience.remove();
    this._activeCineroom.remove();
    this._activeActor.remove();
    this._activeStage.remove();
    this._activeKollection.remove();
    this._activeKollectionRoles.remove();
    this._activeDramaRoles.remove();
    this._baseActor.remove();
    this._baseStage.remove();
    this._baseKollection.remove();
    this._baseKollectionRoles.remove();
    this._baseDramaRoles.remove();
    this._loaded.remove();
  }

  setDock(
    activeDock: ActiveDockRdo,
    defaultStage: ActiveInfo,
    defaultFirst: boolean,
    activeCitizen: ActiveInfo,
    activePavilion: ActiveInfo,
    activeAudience: ActiveInfo,
    activeCineroom: ActiveInfo,
    activeActor: ActiveInfo,
    activeStage: ActiveStage,
    activeKollection: ActiveKollection,
    activeKollectionRoles: string[],
    activeDramaRoles: string[],
    baseActor: ActiveInfo,
    baseStage: ActiveStage,
    baseKollection: ActiveKollection,
    baseKollectionRoles: string[],
    baseDramaRoles: string[],
    development: boolean = false,
  ) {
    this.setActiveDock(activeDock);
    this.setDefaultStage(defaultStage);
    this.setDefaultFirst(defaultFirst);
    this.setActivePavilion(activePavilion);
    this.setActiveCitizen(activeCitizen);
    this.setActiveCineroom(activeCineroom);
    this.setActiveAudience(activeAudience);
    this.setActiveActor(activeActor);
    this.setActiveStage(activeStage);
    this.setActiveKollection(activeKollection);
    this.setActiveKollectionRoles(activeKollectionRoles);
    this.setActiveDramaRoles(activeDramaRoles);
    this.setBaseActor(baseActor);
    this.setBaseStage(baseStage);
    this.setBaseKollection(baseKollection);
    this.setBaseKollectionRoles(baseKollectionRoles);
    this.setBaseDramaRoles(baseDramaRoles);
    this.setDevelopment(development);
    this.setLoaded(true);
  }

  async findAvailableDockWithCitizenId(citizenId: string): Promise<ActiveDockRdo> {
    const activeDock = await this.dockFlowStateKeeper.findAvailableDockWithCitizenId(citizenId);
    return await this.findAvailableDock(activeDock);
  }

  async findAvailableDockWithEmailAndPavilionId(email: string, pavilionId: string): Promise<ActiveDockRdo> {
    const activeDock = await this.dockFlowStateKeeper.findAvailableDockWithEmailAndPavilionId(email, pavilionId);
    return await this.findAvailableDock(activeDock);
  }

  async findAvailableDock(activeDock: ActiveDockRdo | null): Promise<ActiveDockRdo> {
    if (!activeDock) {
      throw new NaraException('DockStorage.findAvailableDock', 'cannot find active dock');
    }

    this.setLoaded(true);

    this.setActiveDock(activeDock);

    if (activeDock.defaultStage) {
      this.setDefaultStage(activeDock.defaultStage);
    }

    this.setDefaultFirst(activeDock.defaultFirstForStage || false);

    if (activeDock.citizen) {
      this.setActiveCitizen(activeDock.citizen);
    }
    if (activeDock.pavilion) {
      this.setActivePavilion(activeDock.pavilion);
    }

    if (activeDock.cinerooms && activeDock.cinerooms.some(cineroom => cineroom.active)) {
      const dockCineroom = activeDock.cinerooms.find(cineroom => cineroom.active);
      if (dockCineroom) {
        this.setActiveAudienceAndCineroom(dockCineroom);
      }
    } else if (activeDock.cinerooms && activeDock.cinerooms.length > 0) {
      const dockCineroom = activeDock.cinerooms[0];
      this.setActiveAudienceAndCineroom(dockCineroom);
    }

    return activeDock;
  }

  private setActiveAudienceAndCineroom(dockCineroom: DockCineroom) {
    if (dockCineroom.audience) {
      this.setActiveAudience(dockCineroom.audience);
    }
    if (dockCineroom.cineroom) {
      this.setActiveCineroom(dockCineroom.cineroom);
    }

    // set active
    if (dockCineroom.stages && dockCineroom.stages.some(stage => stage.active)) {
      const dockStage = dockCineroom.stages.find(stage => stage.active);
      if (dockStage) {
        this.setActiveActorAndStage(dockStage);
      }
    } else if (dockCineroom.stages && dockCineroom.stages.length > 0) {
      const dockStage = dockCineroom.stages[0];
      this.setActiveActorAndStage(dockStage);
    }

    // set base
    if (dockCineroom.stages && dockCineroom.stages.some(stage => stage.base)) {
      const dockStage = dockCineroom.stages.find(stage => stage.base);
      if (dockStage) {
        this.setBaseActorAndStage(dockStage);
      }
    } else if (dockCineroom.stages && dockCineroom.stages.length > 0) {
      const dockStage = dockCineroom.stages[0];
      this.setBaseActorAndStage(dockStage);
    }
  }

  private setActiveActorAndStage(dockStage: DockStage) {
    if (dockStage.actor) {
      this.setActiveActor(dockStage.actor);
    }
    if (dockStage.stage) {
      const { id, name } = dockStage.stage;
      this.setActiveStage(new ActiveStage(id, name, dockStage.kollections));
    }

    if (dockStage.kollections && dockStage.kollections.some(kollection => kollection.active)) {
      const dockKollection = dockStage.kollections.find(kollection => kollection.active);
      if (dockKollection) {
        dockKollection.kollection.path = dockKollection.path;
        this.setActiveKollectionsAndRoles(dockKollection);
      }
    } else if (dockStage.kollections && dockStage.kollections.length > 0) {
      const dockKollection = dockStage.kollections[0];
      dockKollection.kollection.path = dockKollection.path;
      this.setActiveKollectionsAndRoles(dockKollection);
    }
  }

  private setActiveKollectionsAndRoles(dockKollection: DockKollection) {
    if (dockKollection.kollection && dockKollection.path) {
      const activeKollection = new ActiveKollection(dockKollection.kollection.id, dockKollection.kollection.name, dockKollection.path);
      this.setActiveKollection(activeKollection);
    }

    const kollectionRoles: string[] = [];
    const dramaRoles: string[] = [];
    if (dockKollection.kollectionRoles) {
      dockKollection.kollectionRoles.forEach(kollectionRole => {
        kollectionRoles.push(kollectionRole.code);
        kollectionRole.dramaRoles.forEach(role => {
          const roleCode = `${role.dramaId}:${role.code}`;
          if (!dramaRoles.includes(roleCode)) {
            dramaRoles.push(roleCode);
          }
        });
      });
    }
    this.setActiveKollectionRoles(kollectionRoles);
    this.setActiveDramaRoles(dramaRoles);
  }

  private setBaseActorAndStage(dockStage: DockStage) {
    if (dockStage.actor) {
      this.setBaseActor(dockStage.actor);
    }
    if (dockStage.stage) {
      const { id, name } = dockStage.stage;
      this.setBaseStage(new ActiveStage(id, name, dockStage.kollections));
    }

    if (dockStage.kollections && dockStage.kollections.some(kollection => kollection.active)) {
      const dockKollection = dockStage.kollections.find(kollection => kollection.active);
      if (dockKollection) {
        dockKollection.kollection.path = dockKollection.path;
        this.setBaseKollectionsAndRoles(dockKollection);
      }
    } else if (dockStage.kollections && dockStage.kollections.length > 0) {
      const dockKollection = dockStage.kollections[0];
      dockKollection.kollection.path = dockKollection.path;
      this.setBaseKollectionsAndRoles(dockKollection);
    }
  }

  private setBaseKollectionsAndRoles(dockKollection: DockKollection) {
    if (dockKollection.kollection && dockKollection.path) {
      const baseKollection = new ActiveKollection(dockKollection.kollection.id, dockKollection.kollection.name, dockKollection.path);
      this.setBaseKollection(baseKollection);
    }

    const kollectionRoles: string[] = [];
    const dramaRoles: string[] = [];
    if (dockKollection.kollectionRoles) {
      dockKollection.kollectionRoles.forEach(kollectionRole => {
        kollectionRoles.push(kollectionRole.code);
        kollectionRole.dramaRoles.forEach(role => {
          const roleCode = `${role.dramaId}:${role.code}`;
          if (!dramaRoles.includes(roleCode)) {
            dramaRoles.push(roleCode);
          }
        });
      });
    }
    this.setBaseKollectionRoles(kollectionRoles);
    this.setBaseDramaRoles(dramaRoles);
  }

  async updateDefaultStage(stageId: string) {
    const activeAudience = this.activeAudience;
    if (!activeAudience || !activeAudience.id) {
      throw new NaraException('DockStorage.updateDefaultStage', 'active audience is required');
    }

    const defaultStage = this.defaultStage;
    if (!defaultStage || !defaultStage.id) {
      throw new NaraException('DockStorage.updateDefaultStage', 'default stage is required');
    }

    // set default stage if needed
    if (defaultStage.id !== stageId) {
      const stages: DockStage[] = [];
      this.activeDock?.cinerooms.filter(cineroom => !!cineroom.stages).forEach(cineroom => stages.push(...cineroom.stages));

      const stage = stages.find(stage => stage.stage.id === stageId);
      if (!stage) {
        throw new NaraException(
          'DockStorage.updateDefaultStage',
          `cannot find stage with stage id = ${stageId}`,
        );
      }
      this.setDefaultStage(new ActiveInfo(stage.stage.id, stage.stage.name));

      if (!this.development) {
        this.stageContextFlowStateKeeper.modifyDefaultStage(
          activeAudience?.id || '',
          stageId,
        );
      }
    }
  }

  async toggleDefaultFirst(defaultFirst: boolean) {
    const activeAudience = this.activeAudience;
    if (!activeAudience || !activeAudience.id) {
      throw new NaraException('DockStorage.updateDefaultStage', 'active audience is required');
    }

    const _defaultFirst = this.defaultFirst;

    // set default first for stage if needed
    if (_defaultFirst !== defaultFirst) {
      this.setDefaultFirst(defaultFirst);

      if (!this.development) {
        this.stageContextFlowStateKeeper.toggleDefaultFirstForStage(
          activeAudience?.id || '',
          defaultFirst,
        );
      }
    }
  }

  private async verify() {
    const activeDock = this.activeDock;
    if (!activeDock || !activeDock.cinerooms) {
      throw new NaraException('DockStorage.switchContext', 'active dock is required');
    }

    const activeCitizen = this.activeCitizen;
    if (!activeCitizen || !activeCitizen.id) {
      throw new NaraException('DockStorage.switchContext', 'active citizen is required');
    }

    const activeAudience = this.activeAudience;
    if (!activeAudience || !activeAudience.id) {
      throw new NaraException('DockStorage.switchContext', 'active audience is required');
    }

    const activeActor = this.activeActor;
    if (!activeActor || !activeActor.id) {
      throw new NaraException('DockStorage.switchContext', 'active actor is required');
    }

    const activeStage = this.activeStage;
    if (!activeStage || !activeStage.id) {
      throw new NaraException('DockStorage.switchContext', 'active stage is required');
    }

    const activeKollection = this.activeKollection;
    if (!activeKollection || !activeKollection.id) {
      throw new NaraException('DockStorage.switchContext', 'active kollection is required');
    }
  }

  async switchStage(stageId: string) {
    await this.verify();

    const activeDock = this.activeDock;
    const activeCitizen = this.activeCitizen;
    const activeAudience = this.activeAudience;
    const activeActor = this.activeActor;
    const activeStage = this.activeStage;

    const cineroomId = StageKey.fromId(stageId || activeStage?.id || '').genCineroomId();
    const nextCineroom = activeDock?.cinerooms.find(cineroom => cineroom.cineroom.id === cineroomId);

    if (!nextCineroom) {
      throw new NaraException(
        'DockStorage.switchContext',
        `cannot find cineroom with id = ${cineroomId}`,
      );
    }

    // switch cineroom if changed
    if (nextCineroom && nextCineroom.audience.id !== activeAudience?.id) {
      this.setActiveAudience(nextCineroom.audience);
      this.setActiveCineroom(nextCineroom.cineroom);

      if (!this.development) {
        this.cineroomContextFlowStateKeeper.modifyLatestCineroom(
          activeCitizen?.id || '',
          nextCineroom.cineroom.id,
        );
      }
    }

    const stages: DockStage[] = [];
    activeDock?.cinerooms.filter(cineroom => !!cineroom.stages).forEach(cineroom => stages.push(...cineroom.stages));
    const nextStage = stages.find(stage => stage.stage.id === (stageId || activeStage?.id));

    if (!nextStage) {
      throw new NaraException(
        'DockStorage.switchContext',
        `cannot find stage with stage id = ${(stageId || activeStage?.id)}`,
      );
    }

    // switch stage if changed
    if (nextStage && nextStage.actor.id !== activeActor?.id) {
      this.setActiveActor(nextStage.actor);
      const { id, name } = nextStage.stage;
      this.setActiveStage(new ActiveStage(id, name, nextStage.kollections));

      let nextKollection: DockKollection | undefined;
      if (nextStage.kollections && nextStage.kollections.some(kollection => kollection.active)) {
        nextKollection = nextStage.kollections.find(kollection => kollection.active);
      } else if (nextStage.kollections && nextStage.kollections.length > 0) {
        nextKollection = nextStage.kollections[0];
      }

      if (!nextKollection) {
        throw new NaraException(
          'DockStorage.switchContext',
          `cannot find kollection with stage id = ${(stageId || activeStage?.id)}`,
        );
      }

      if (!this.development) {
        this.stageContextFlowStateKeeper.modifyLatestStage(
          nextCineroom.audience.id,
          nextStage.stage.id,
          nextKollection.path,
          nextKollection.kollection.name,
        );
      }
    }
  }

  async switchContext(url: string, name: string = '') {
    await this.verify();

    const activeActor = this.activeActor;
    const activeStage = this.activeStage;
    const activeKollection = this.activeKollection;

    const nextStage = activeStage;
    const nextKollection = nextStage?.kollections.find(kollection => url.includes(`${kollection.path}`));

    if (!nextKollection) {
      throw new NaraException(
        'DockStorage.switchContext',
        `cannot find kollection with page url = ${url}`,
      );
    }

    // switch kollection if changed
    if (nextKollection && nextKollection.kollection.id !== activeKollection?.id) {
      this.setActiveKollection(new ActiveKollection(nextKollection.kollection.id, nextKollection.kollection.name, nextKollection.path));

      const stageRoles: string[] = [];
      const dramaRoles: string[] = [];
      if (nextKollection.kollectionRoles) {
        nextKollection.kollectionRoles.forEach(kollectionRole => {
          stageRoles.push(kollectionRole.code);
          kollectionRole.dramaRoles.forEach(role => dramaRoles.push(`${role.dramaId}:${role.code}`));
        });
      }
      this.setActiveKollectionRoles(stageRoles);
      this.setActiveDramaRoles(dramaRoles);

      if (!this.development) {
        this.stageContextFlowStateKeeper.modifyLastScene(
          activeActor?.id || '',
          url,
          name,
        );
      }
    }
  }

  get development(): boolean {
    return this._development;
  }

  private setDevelopment(development: boolean) {
    this._development = development;
  }

  get loaded(): boolean {
    return this._loaded.load() || false;
  }

  private setLoaded(loaded: boolean) {
    this._loaded.save(loaded);
  }

  get activeDock(): ActiveDockRdo | null {
    return this._activeDock.load();
  }

  private setActiveDock(value: ActiveDockRdo): void {
    this._activeDock.save(value);
  }

  get activeCitizen(): ActiveInfo | null {
    return this._activeCitizen.load();
  }

  private setActiveCitizen(value: ActiveInfo): void {
    this._activeCitizen.save(value);
  }

  get activePavilion(): ActiveInfo | null {
    return this._activePavilion.load();
  }

  private setActivePavilion(value: ActiveInfo): void {
    this._activePavilion.save(value);
  }

  get activeAudience(): ActiveInfo | null {
    return this._activeAudience.load();
  }

  private setActiveAudience(value: ActiveInfo): void {
    this._activeAudience.save(value);
  }

  get activeCineroom(): ActiveInfo | null {
    return this._activeCineroom.load();
  }

  private setActiveCineroom(value: ActiveInfo): void {
    this._activeCineroom.save(value);
  }

  get activeActor(): ActiveInfo | null {
    return this._activeActor.load();
  }

  private setActiveActor(value: ActiveInfo): void {
    this._activeActor.save(value);
  }

  get activeStage(): ActiveStage | null {
    return this._activeStage.load();
  }

  private setActiveStage(value: ActiveStage): void {
    this._activeStage.save(value);
  }

  get activeKollection(): ActiveKollection | null {
    return this._activeKollection.load();
  }

  private setActiveKollection(value: ActiveKollection): void {
    this._activeKollection.save(value);
  }

  get activeKollectionRoles(): string[] {
    // @ts-ignore
    return (this._activeKollectionRoles.load() || [])[0] || [];
  }

  private setActiveKollectionRoles(values: string[]): void {
    this._activeKollectionRoles.save(values);
  }

  get activeDramaRoles(): string[] {
    // @ts-ignore
    return (this._activeDramaRoles.load() || [])[0] || [];
  }

  private setActiveDramaRoles(values: string[]): void {
    this._activeDramaRoles.save(values);
  }

  get baseActor(): ActiveInfo | null {
    return this._baseActor.load();
  }

  private setBaseActor(value: ActiveInfo): void {
    this._baseActor.save(value);
  }

  get baseStage(): ActiveStage | null {
    return this._baseStage.load();
  }

  private setBaseStage(value: ActiveStage): void {
    this._baseStage.save(value);
  }

  get baseKollection(): ActiveKollection | null {
    return this._baseKollection.load();
  }

  private setBaseKollection(value: ActiveKollection): void {
    this._baseKollection.save(value);
  }

  get baseKollectionRoles(): string[] {
    // @ts-ignore
    return (this._baseKollectionRoles.load() || [])[0] || [];
  }

  private setBaseKollectionRoles(values: string[]): void {
    this._baseKollectionRoles.save(values);
  }

  get baseDramaRoles(): string[] {
    // @ts-ignore
    return (this._baseDramaRoles.load() || [])[0] || [];
  }

  private setBaseDramaRoles(values: string[]): void {
    this._baseDramaRoles.save(values);
  }

  get defaultStage(): ActiveInfo | null {
    return this._defaultStage.load();
  }

  private setDefaultStage(value: ActiveInfo): void {
    this._defaultStage.save(value);
  }

  get defaultFirst(): boolean {
    return this._defaultFirst.load() || false;
  }

  private setDefaultFirst(value: boolean): void {
    this._defaultFirst.save(value);
  }
}

export default DockStorage;
