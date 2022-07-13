import { NaraException, StageKey } from '@nara-way/accent';
import { autobind, WebStorage } from '@nara-way/prologue';
import { AvailableCineroom, AvailableDockRdo, AvailableKollection, AvailableStage } from '~/comp/api';
import { CineroomContextFlowStateKeeper, DockFlowStateKeeper, StageContextFlowStateKeeper } from '~/comp/state';
import { Current, CurrentKollection, CurrentStage } from '../model';

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

  private _availableDock = WebStorage.newSession<AvailableDockRdo>('availableDock', AvailableDockRdo.fromDomain);
  private _currentCitizen = WebStorage.newSession<Current>('currentCitizen', Current.fromDomain);
  private _currentPavilion = WebStorage.newSession<Current>('currentPavilion', Current.fromDomain);
  private _currentAudience = WebStorage.newSession<Current>('currentAudience', Current.fromDomain);
  private _currentCineroom = WebStorage.newSession<Current>('currentCineroom', Current.fromDomain);
  private _currentActor = WebStorage.newSession<Current>('currentActor', Current.fromDomain);
  private _currentStage = WebStorage.newSession<CurrentStage>('currentStage', CurrentStage.fromDomain);
  private _currentKollection = WebStorage.newSession<CurrentKollection>('currentKollection', CurrentKollection.fromDomain);
  private _currentStageRoles = WebStorage.newSession<string[]>('currentStageRoles', Array);
  private _currentDramaRoles = WebStorage.newSession<string[]>('currentDramaRoles', Array);
  private _defaultStage = WebStorage.newSession<Current>('defaultStage', Current.fromDomain);
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
    this._availableDock.remove();
    this._defaultStage.remove();
    this._defaultFirst.remove();
    this._currentCitizen.remove();
    this._currentPavilion.remove();
    this._currentAudience.remove();
    this._currentCineroom.remove();
    this._currentActor.remove();
    this._currentStage.remove();
    this._currentKollection.remove();
    this._currentStageRoles.remove();
    this._currentDramaRoles.remove();
    this._loaded.remove();
  }

  setDock(
    availableDock: AvailableDockRdo,
    defaultStage: Current,
    defaultFirst: boolean,
    currentCitizen: Current,
    currentPavilion: Current,
    currentAudience: Current,
    currentCineroom: Current,
    currentActor: Current,
    currentStage: CurrentStage,
    currentKollection: CurrentKollection,
    currentStageRoles: string[],
    currentDramaRoles: string[],
    development: boolean = false,
  ) {
    this.setAvailableDock(availableDock);
    this.setDefaultStage(defaultStage);
    this.setDefaultFirst(defaultFirst);
    this.setCurrentPavilion(currentPavilion);
    this.setCurrentCitizen(currentCitizen);
    this.setCurrentCineroom(currentCineroom);
    this.setCurrentAudience(currentAudience);
    this.setCurrentStage(currentStage);
    this.setCurrentActor(currentActor);
    this.setCurrentKollection(currentKollection);
    this.setCurrentStageRoles(currentStageRoles);
    this.setCurrentDramaRoles(currentDramaRoles);
    this.setDevelopment(development);
    this.setLoaded(true);
  }

  async findAvailableDockWithCitizenId(citizenId: string): Promise<AvailableDockRdo> {
    const availableDock = await this.dockFlowStateKeeper.findAvailableDockWithCitizenId(citizenId);
    return await this.findAvailableDock(availableDock);
  }

  async findAvailableDockWithEmailAndPavilionId(email: string, pavilionId: string): Promise<AvailableDockRdo> {
    const availableDock = await this.dockFlowStateKeeper.findAvailableDockWithEmailAndPavilionId(email, pavilionId);
    return await this.findAvailableDock(availableDock);
  }

  async findAvailableDock(availableDock: AvailableDockRdo | null): Promise<AvailableDockRdo> {
    if (!availableDock) {
      throw new NaraException('DockStorage.findAvailableDock', 'cannot find available dock');
    }

    this.setLoaded(true);

    this.setAvailableDock(availableDock);

    if (availableDock.defaultStage) {
      this.setDefaultStage(availableDock.defaultStage);
    }

    this.setDefaultFirst(availableDock.defaultFirstForStage || false);

    if (availableDock.citizen) {
      this.setCurrentCitizen(availableDock.citizen);
    }
    if (availableDock.pavilion) {
      this.setCurrentPavilion(availableDock.pavilion);
    }

    if (availableDock.cinerooms && availableDock.cinerooms.some(cineroom => cineroom.current)) {
      const availableCineroom = availableDock.cinerooms.find(cineroom => cineroom.current);
      if (availableCineroom) {
        this.setCurrentAudienceAndCineroom(availableCineroom);
      }
    } else if (availableDock.cinerooms && availableDock.cinerooms.length > 0) {
      const availableCineroom = availableDock.cinerooms[0];
      this.setCurrentAudienceAndCineroom(availableCineroom);
    }

    return availableDock;
  }

  private setCurrentAudienceAndCineroom(availableCineroom: AvailableCineroom) {
    if (availableCineroom.audience) {
      this.setCurrentAudience(availableCineroom.audience);
    }
    if (availableCineroom.cineroom) {
      this.setCurrentCineroom(availableCineroom.cineroom);
    }

    if (availableCineroom.stages && availableCineroom.stages.some(stage => stage.current)) {
      const availableStage = availableCineroom.stages.find(stage => stage.current);
      if (availableStage) {
        this.setCurrentActorAndStage(availableStage);
      }
    } else if (availableCineroom.stages && availableCineroom.stages.length > 0) {
      const availableStage = availableCineroom.stages[0];
      this.setCurrentActorAndStage(availableStage);
    }
  }

  private setCurrentActorAndStage(availableStage: AvailableStage) {
    if (availableStage.actor) {
      this.setCurrentActor(availableStage.actor);
    }
    if (availableStage.stage) {
      const { id, name } = availableStage.stage;
      this.setCurrentStage(new CurrentStage(id, name, availableStage.kollections));
    }

    if (availableStage.kollections && availableStage.kollections.some(kollection => kollection.current)) {
      const availableKollection = availableStage.kollections.find(kollection => kollection.current);
      if (availableKollection) {
        availableKollection.kollection.path = availableKollection.path;
        this.setCurrentKollectionsAndRoles(availableKollection);
      }
    } else if (availableStage.kollections && availableStage.kollections.length > 0) {
      const availableKollection = availableStage.kollections[0];
      availableKollection.kollection.path = availableKollection.path;
      this.setCurrentKollectionsAndRoles(availableKollection);
    }
  }

  private setCurrentKollectionsAndRoles(availableKollection: AvailableKollection) {
    if (availableKollection.kollection && availableKollection.path) {
      const currentKollection = new CurrentKollection(availableKollection.kollection.id, availableKollection.kollection.name, availableKollection.path);
      this.setCurrentKollection(currentKollection);
    }

    const stageRoles: string[] = [];
    const dramaRoles: string[] = [];
    if (availableKollection.stageRoles) {
      availableKollection.stageRoles.forEach(stageRole => {
        stageRoles.push(stageRole.code);
        stageRole.dramaRoles.forEach(role => {
          const roleCode = `${role.dramaId}:${role.code}`;
          if (!dramaRoles.includes(roleCode)) {
            dramaRoles.push(roleCode);
          }
        });
      });
    }
    this.setCurrentStageRoles(stageRoles);
    this.setCurrentDramaRoles(dramaRoles);
  }

  async updateDefaultStage(stageId: string) {
    const currentAudience = this.currentAudience;
    if (!currentAudience || !currentAudience.id) {
      throw new NaraException('DockStorage.updateDefaultStage', 'current audience is required');
    }

    const defaultStage = this.defaultStage;
    if (!defaultStage || !defaultStage.id) {
      throw new NaraException('DockStorage.updateDefaultStage', 'default stage is required');
    }

    // set default stage if needed
    if (defaultStage.id !== stageId) {
      const stages: AvailableStage[] = [];
      this.availableDock?.cinerooms.filter(cineroom => !!cineroom.stages).forEach(cineroom => stages.push(...cineroom.stages));

      const stage = stages.find(stage => stage.stage.id === stageId);
      if (!stage) {
        throw new NaraException(
          'DockStorage.updateDefaultStage',
          `cannot find stage with stage id = ${stageId}`,
        );
      }
      this.setDefaultStage(new Current(stage.stage.id, stage.stage.name));

      if (!this.development) {
        this.stageContextFlowStateKeeper.modifyDefaultStage(
          currentAudience?.id || '',
          stageId,
        );
      }
    }
  }

  async toggleDefaultFirst(defaultFirst: boolean) {
    const currentAudience = this.currentAudience;
    if (!currentAudience || !currentAudience.id) {
      throw new NaraException('DockStorage.updateDefaultStage', 'current audience is required');
    }

    const currentDefaultFirst = this.defaultFirst;

    // set default first for stage if needed
    if (currentDefaultFirst !== defaultFirst) {
      this.setDefaultFirst(defaultFirst);

      if (!this.development) {
        this.stageContextFlowStateKeeper.toggleDefaultFirstForStage(
          currentAudience?.id || '',
          defaultFirst,
        );
      }
    }
  }

  private async verify() {
    const availableDock = this.availableDock;
    if (!availableDock || !availableDock.cinerooms) {
      throw new NaraException('DockStorage.switchContext', 'available dock is required');
    }

    const currentCitizen = this.currentCitizen;
    if (!currentCitizen || !currentCitizen.id) {
      throw new NaraException('DockStorage.switchContext', 'current citizen is required');
    }

    const currentAudience = this.currentAudience;
    if (!currentAudience || !currentAudience.id) {
      throw new NaraException('DockStorage.switchContext', 'current audience is required');
    }

    const currentActor = this.currentActor;
    if (!currentActor || !currentActor.id) {
      throw new NaraException('DockStorage.switchContext', 'current actor is required');
    }

    const currentStage = this.currentStage;
    if (!currentStage || !currentStage.id) {
      throw new NaraException('DockStorage.switchContext', 'current stage is required');
    }

    const currentKollection = this.currentKollection;
    if (!currentKollection || !currentKollection.id) {
      throw new NaraException('DockStorage.switchContext', 'current kollection is required');
    }
  }

  async switchStage(stageId: string) {
    await this.verify();

    const availableDock = this.availableDock;
    const currentCitizen = this.currentCitizen;
    const currentAudience = this.currentAudience;
    const currentActor = this.currentActor;
    const currentStage = this.currentStage;

    const cineroomId = StageKey.fromId(stageId || currentStage?.id || '').genCineroomId();
    const nextCineroom = availableDock?.cinerooms.find(cineroom => cineroom.cineroom.id === cineroomId);

    if (!nextCineroom) {
      throw new NaraException(
        'DockStorage.switchContext',
        `cannot find cineroom with id = ${cineroomId}`,
      );
    }

    // switch cineroom if changed
    if (nextCineroom && nextCineroom.audience.id !== currentAudience?.id) {
      this.setCurrentAudience(nextCineroom.audience);
      this.setCurrentCineroom(nextCineroom.cineroom);

      if (!this.development) {
        this.cineroomContextFlowStateKeeper.modifyLatestCineroom(
          currentCitizen?.id || '',
          nextCineroom.cineroom.id,
        );
      }
    }

    const stages: AvailableStage[] = [];
    availableDock?.cinerooms.filter(cineroom => !!cineroom.stages).forEach(cineroom => stages.push(...cineroom.stages));
    const nextStage = stages.find(stage => stage.stage.id === (stageId || currentStage?.id));

    if (!nextStage) {
      throw new NaraException(
        'DockStorage.switchContext',
        `cannot find stage with stage id = ${(stageId || currentStage?.id)}`,
      );
    }

    // switch stage if changed
    if (nextStage && nextStage.actor.id !== currentActor?.id) {
      this.setCurrentActor(nextStage.actor);
      const { id, name } = nextStage.stage;
      this.setCurrentStage(new CurrentStage(id, name, nextStage.kollections));

      let nextKollection: AvailableKollection | undefined;
      if (nextStage.kollections && nextStage.kollections.some(kollection => kollection.current)) {
        nextKollection = nextStage.kollections.find(kollection => kollection.current);
      } else if (nextStage.kollections && nextStage.kollections.length > 0) {
        nextKollection = nextStage.kollections[0];
      }

      if (!nextKollection) {
        throw new NaraException(
          'DockStorage.switchContext',
          `cannot find kollection with stage id = ${(stageId || currentStage?.id)}`,
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

    const currentActor = this.currentActor;
    const currentStage = this.currentStage;
    const currentKollection = this.currentKollection;

    const nextStage = currentStage;
    const nextKollection = nextStage?.kollections.find(kollection => url.includes(`${kollection.path}`));

    if (!nextKollection) {
      throw new NaraException(
        'DockStorage.switchContext',
        `cannot find kollection with page url = ${url}`,
      );
    }

    // switch kollection if changed
    if (nextKollection && nextKollection.kollection.id !== currentKollection?.id) {
      this.setCurrentKollection(new CurrentKollection(nextKollection.kollection.id, nextKollection.kollection.name, nextKollection.path));

      const stageRoles: string[] = [];
      const dramaRoles: string[] = [];
      if (nextKollection.stageRoles) {
        nextKollection.stageRoles.forEach(stageRole => {
          stageRoles.push(stageRole.code);
          stageRole.dramaRoles.forEach(role => dramaRoles.push(`${role.dramaId}:${role.code}`));
        });
      }
      this.setCurrentStageRoles(stageRoles);
      this.setCurrentDramaRoles(dramaRoles);

      if (!this.development) {
        this.stageContextFlowStateKeeper.modifyLastScene(
          currentActor?.id || '',
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

  get availableDock(): AvailableDockRdo | null {
    return this._availableDock.load();
  }

  private setAvailableDock(value: AvailableDockRdo): void {
    this._availableDock.save(value);
  }

  get currentCitizen(): Current | null {
    return this._currentCitizen.load();
  }

  private setCurrentCitizen(value: Current): void {
    this._currentCitizen.save(value);
  }

  get currentPavilion(): Current | null {
    return this._currentPavilion.load();
  }

  private setCurrentPavilion(value: Current): void {
    this._currentPavilion.save(value);
  }

  get currentAudience(): Current | null {
    return this._currentAudience.load();
  }

  private setCurrentAudience(value: Current): void {
    this._currentAudience.save(value);
  }

  get currentCineroom(): Current | null {
    return this._currentCineroom.load();
  }

  private setCurrentCineroom(value: Current): void {
    this._currentCineroom.save(value);
  }

  get currentActor(): Current | null {
    return this._currentActor.load();
  }

  private setCurrentActor(value: Current): void {
    this._currentActor.save(value);
  }

  get currentStage(): CurrentStage | null {
    return this._currentStage.load();
  }

  private setCurrentStage(value: CurrentStage): void {
    this._currentStage.save(value);
  }

  get currentKollection(): CurrentKollection | null {
    return this._currentKollection.load();
  }

  private setCurrentKollection(value: CurrentKollection): void {
    this._currentKollection.save(value);
  }

  get currentStageRoles(): string[] {
    // @ts-ignore
    return (this._currentStageRoles.load() || [])[0] || [];
  }

  private setCurrentStageRoles(values: string[]): void {
    this._currentStageRoles.save(values);
  }

  get currentDramaRoles(): string[] {
    // @ts-ignore
    return (this._currentDramaRoles.load() || [])[0] || [];
  }

  private setCurrentDramaRoles(values: string[]): void {
    this._currentDramaRoles.save(values);
  }

  get defaultStage(): Current | null {
    return this._defaultStage.load();
  }

  private setDefaultStage(value: Current): void {
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
