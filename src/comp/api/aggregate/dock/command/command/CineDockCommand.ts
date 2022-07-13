import { CommandRequest, CommandType, NameValueList } from '@nara-way/accent';
import { CineDockCdo } from '../../api-model';

class CineDockCommand extends CommandRequest {
  cineDockCdo: CineDockCdo | null = null;
  cineDockCdos: CineDockCdo[] = [];
  multiCdo: boolean | null = null;
  cineDockId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterCineDockCommand(cineDockCdo: CineDockCdo): CineDockCommand {
    const command = new CineDockCommand(CommandType.Register);

    command.cineDockCdo = cineDockCdo;
    return command;
  }

  static newRegisterCineDockCommands(cineDockCdos: CineDockCdo[]): CineDockCommand {
    const command = new CineDockCommand(CommandType.Register);

    command.cineDockCdos = cineDockCdos;
    command.multiCdo = true;
    return command;
  }

  static newModifyCineDockCommand(cineDockId: string, nameValues: NameValueList): CineDockCommand {
    const command = new CineDockCommand(CommandType.Modify);

    command.cineDockId = cineDockId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveCineDockCommand(cineDockId: string): CineDockCommand {
    const command = new CineDockCommand(CommandType.Remove);

    command.cineDockId = cineDockId;
    return command;
  }

}

export default CineDockCommand;
