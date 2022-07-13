import { CommandRequest, CommandType, NameValueList } from '@nara-way/accent';
import { CineDockHistoryCdo } from '../../api-model';

class CineDockHistoryCommand extends CommandRequest {
  cineDockHistoryCdo: CineDockHistoryCdo | null = null;
  cineDockHistoryCdos: CineDockHistoryCdo[] = [];
  multiCdo: boolean | null = null;
  cineDockHistoryId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterCineDockHistoryCommand(cineDockHistoryCdo: CineDockHistoryCdo): CineDockHistoryCommand {
    const command = new CineDockHistoryCommand(CommandType.Register);

    command.cineDockHistoryCdo = cineDockHistoryCdo;
    return command;
  }

  static newRegisterCineDockHistoryCommands(cineDockHistoryCdos: CineDockHistoryCdo[]): CineDockHistoryCommand {
    const command = new CineDockHistoryCommand(CommandType.Register);

    command.cineDockHistoryCdos = cineDockHistoryCdos;
    command.multiCdo = true;
    return command;
  }

  static newModifyCineDockHistoryCommand(cineDockHistoryId: string, nameValues: NameValueList): CineDockHistoryCommand {
    const command = new CineDockHistoryCommand(CommandType.Modify);

    command.cineDockHistoryId = cineDockHistoryId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveCineDockHistoryCommand(cineDockHistoryId: string): CineDockHistoryCommand {
    const command = new CineDockHistoryCommand(CommandType.Remove);

    command.cineDockHistoryId = cineDockHistoryId;
    return command;
  }

}

export default CineDockHistoryCommand;
