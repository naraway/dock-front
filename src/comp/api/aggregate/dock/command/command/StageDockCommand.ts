import { CommandRequest, CommandType, NameValueList } from '@nara-way/accent';
import { StageDockCdo } from '../../api-model';

class StageDockCommand extends CommandRequest {
  stageDockCdo: StageDockCdo | null = null;
  stageDockCdos: StageDockCdo[] = [];
  multiCdo: boolean | null = null;
  stageDockId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterStageDockCommand(stageDockCdo: StageDockCdo): StageDockCommand {
    const command = new StageDockCommand(CommandType.Register);

    command.stageDockCdo = stageDockCdo;
    return command;
  }

  static newRegisterStageDockCommands(stageDockCdos: StageDockCdo[]): StageDockCommand {
    const command = new StageDockCommand(CommandType.Register);

    command.stageDockCdos = stageDockCdos;
    command.multiCdo = true;
    return command;
  }

  static newModifyStageDockCommand(stageDockId: string, nameValues: NameValueList): StageDockCommand {
    const command = new StageDockCommand(CommandType.Modify);

    command.stageDockId = stageDockId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveStageDockCommand(stageDockId: string): StageDockCommand {
    const command = new StageDockCommand(CommandType.Remove);

    command.stageDockId = stageDockId;
    return command;
  }

}

export default StageDockCommand;
