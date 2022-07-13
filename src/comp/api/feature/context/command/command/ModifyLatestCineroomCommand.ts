import { CommandRequest, CommandType } from '@nara-way/accent';

class ModifyLatestCineroomCommand extends CommandRequest {
  citizenId: string;
  latestCineroomId: string;

  constructor(
    citizenId: string,
    latestCineroomId: string,
  ) {
    super();
    this.citizenId = citizenId;
    this.latestCineroomId = latestCineroomId;
  }

  static new(
    citizenId: string,
    latestCineroomId: string,
  ) {
    return new ModifyLatestCineroomCommand(
      citizenId,
      latestCineroomId,
    );
  }
}

export default ModifyLatestCineroomCommand;
