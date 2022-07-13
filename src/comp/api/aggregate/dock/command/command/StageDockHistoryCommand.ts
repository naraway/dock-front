import { CommandRequest, CommandType, NameValueList } from '@nara-way/accent';
import { StageDockHistoryCdo } from '../../api-model';

class StageDockHistoryCommand extends CommandRequest {
  stageDockHistoryCdo: StageDockHistoryCdo | null = null;
  stageDockHistoryCdos: StageDockHistoryCdo[] = [];
  multiCdo: boolean | null = null;
  stageDockHistoryId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterStageDockHistoryCommand(stageDockHistoryCdo: StageDockHistoryCdo): StageDockHistoryCommand {
    const command = new StageDockHistoryCommand(CommandType.Register);

    command.stageDockHistoryCdo = stageDockHistoryCdo;
    return command;
  }

  static newRegisterStageDockHistoryCommands(stageDockHistoryCdos: StageDockHistoryCdo[]): StageDockHistoryCommand {
    const command = new StageDockHistoryCommand(CommandType.Register);

    command.stageDockHistoryCdos = stageDockHistoryCdos;
    command.multiCdo = true;
    return command;
  }

  static newModifyStageDockHistoryCommand(stageDockHistoryId: string, nameValues: NameValueList): StageDockHistoryCommand {
    const command = new StageDockHistoryCommand(CommandType.Modify);

    command.stageDockHistoryId = stageDockHistoryId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveStageDockHistoryCommand(stageDockHistoryId: string): StageDockHistoryCommand {
    const command = new StageDockHistoryCommand(CommandType.Remove);

    command.stageDockHistoryId = stageDockHistoryId;
    return command;
  }

}

export default StageDockHistoryCommand;
