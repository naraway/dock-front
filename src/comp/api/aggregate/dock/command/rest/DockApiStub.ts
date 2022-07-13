import { CommandResponse, NameValueList } from '@nara-way/accent';
import { ApiClient, autobind } from '@nara-way/prologue';
import { CineDockCdo, CineDockHistoryCdo, StageDockCdo, StageDockHistoryCdo } from '../../api-model';
import { CineDockCommand, CineDockHistoryCommand, StageDockCommand, StageDockHistoryCommand } from '../command';

class DockApiStub {
  private static _instance: DockApiStub;

  static get instance() {
    if (!DockApiStub._instance) {
      DockApiStub._instance = new DockApiStub();
    }
    return DockApiStub._instance;
  }

  constructor() {
    autobind(this);
  }

  private readonly client = new ApiClient('/api/town/aggregate/dock');

  async registerCineDock(cineDockCdo: CineDockCdo): Promise<CommandResponse> {
    const command = CineDockCommand.newRegisterCineDockCommand(cineDockCdo);
    return this.executeCineDock(command);
  }

  async registerCineDockHistory(cineDockHistoryCdo: CineDockHistoryCdo): Promise<CommandResponse> {
    const command = CineDockHistoryCommand.newRegisterCineDockHistoryCommand(cineDockHistoryCdo);
    return this.executeCineDockHistory(command);
  }

  async registerStageDock(stageDockCdo: StageDockCdo): Promise<CommandResponse> {
    const command = StageDockCommand.newRegisterStageDockCommand(stageDockCdo);
    return this.executeStageDock(command);
  }

  async registerStageDockHistory(stageDockHistoryCdo: StageDockHistoryCdo): Promise<CommandResponse> {
    const command = StageDockHistoryCommand.newRegisterStageDockHistoryCommand(stageDockHistoryCdo);
    return this.executeStageDockHistory(command);
  }

  async registerCineDocks(cineDockCdos: CineDockCdo[]): Promise<CommandResponse> {
    const command = CineDockCommand.newRegisterCineDockCommands(cineDockCdos);
    return this.executeCineDock(command);
  }

  async registerCineDockHistorys(cineDockHistoryCdos: CineDockHistoryCdo[]): Promise<CommandResponse> {
    const command = CineDockHistoryCommand.newRegisterCineDockHistoryCommands(cineDockHistoryCdos);
    return this.executeCineDockHistory(command);
  }

  async registerStageDocks(stageDockCdos: StageDockCdo[]): Promise<CommandResponse> {
    const command = StageDockCommand.newRegisterStageDockCommands(stageDockCdos);
    return this.executeStageDock(command);
  }

  async registerStageDockHistorys(stageDockHistoryCdos: StageDockHistoryCdo[]): Promise<CommandResponse> {
    const command = StageDockHistoryCommand.newRegisterStageDockHistoryCommands(stageDockHistoryCdos);
    return this.executeStageDockHistory(command);
  }

  async modifyCineDock(cineDockId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = CineDockCommand.newModifyCineDockCommand(cineDockId, nameValues);
    return this.executeCineDock(command);
  }

  async modifyCineDockHistory(cineDockHistoryId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = CineDockHistoryCommand.newModifyCineDockHistoryCommand(cineDockHistoryId, nameValues);
    return this.executeCineDockHistory(command);
  }

  async modifyStageDock(stageDockId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = StageDockCommand.newModifyStageDockCommand(stageDockId, nameValues);
    return this.executeStageDock(command);
  }

  async modifyStageDockHistory(stageDockHistoryId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = StageDockHistoryCommand.newModifyStageDockHistoryCommand(stageDockHistoryId, nameValues);
    return this.executeStageDockHistory(command);
  }

  async removeCineDock(cineDockId: string): Promise<CommandResponse> {
    const command = CineDockCommand.newRemoveCineDockCommand(cineDockId);
    return this.executeCineDock(command);
  }

  async removeCineDockHistory(cineDockHistoryId: string): Promise<CommandResponse> {
    const command = CineDockHistoryCommand.newRemoveCineDockHistoryCommand(cineDockHistoryId);
    return this.executeCineDockHistory(command);
  }

  async removeStageDock(stageDockId: string): Promise<CommandResponse> {
    const command = StageDockCommand.newRemoveStageDockCommand(stageDockId);
    return this.executeStageDock(command);
  }

  async removeStageDockHistory(stageDockHistoryId: string): Promise<CommandResponse> {
    const command = StageDockHistoryCommand.newRemoveStageDockHistoryCommand(stageDockHistoryId);
    return this.executeStageDockHistory(command);
  }

  async executeCineDock(cineDockCommand: CineDockCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/cine-dock/command', cineDockCommand);
  }

  async executeCineDockHistory(cineDockHistoryCommand: CineDockHistoryCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/cine-dock-history/command', cineDockHistoryCommand);
  }

  async executeStageDock(stageDockCommand: StageDockCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/stage-dock/command', stageDockCommand);
  }

  async executeStageDockHistory(stageDockHistoryCommand: StageDockHistoryCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/stage-dock-history/command', stageDockHistoryCommand);
  }

}

export default DockApiStub;
