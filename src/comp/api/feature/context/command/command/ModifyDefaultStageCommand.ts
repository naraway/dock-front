import { CommandRequest, CommandType } from '@nara-way/accent';

class ModifyDefaultStageCommand extends CommandRequest {
  audienceId: string;
  defaultStageId: string;

  constructor(
    audienceId: string,
    defaultStageId: string,
  ) {
    super();
    this.audienceId = audienceId;
    this.defaultStageId = defaultStageId;
  }

  static new(
    audienceId: string,
    defaultStageId: string,
  ) {
    return new ModifyDefaultStageCommand(
      audienceId,
      defaultStageId,
    );
  }
}

export default ModifyDefaultStageCommand;
