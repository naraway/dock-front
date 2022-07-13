import { CommandRequest, CommandType } from '@nara-way/accent';

class ToggleDefaultFirstForStageCommand extends CommandRequest {
  audienceId: string;
  defaultFirst: boolean;

  constructor(
    audienceId: string,
    defaultFirst: boolean,
  ) {
    super();
    this.audienceId = audienceId;
    this.defaultFirst = defaultFirst;
  }

  static new(
    audienceId: string,
    defaultFirst: boolean,
  ) {
    return new ToggleDefaultFirstForStageCommand(
      audienceId,
      defaultFirst,
    );
  }
}

export default ToggleDefaultFirstForStageCommand;
