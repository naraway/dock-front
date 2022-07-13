import { CommandRequest, CommandType } from '@nara-way/accent';

class ModifyLatestStageCommand extends CommandRequest {
  audienceId: string;
  latestStageId: string;
  url: string;
  name: string;

  constructor(
    audienceId: string,
    latestStageId: string,
    url: string,
    name: string,
  ) {
    super();
    this.audienceId = audienceId;
    this.latestStageId = latestStageId;
    this.url = url;
    this.name = name;
  }

  static new(
    audienceId: string,
    latestStageId: string,
    url: string,
    name: string,
  ) {
    return new ModifyLatestStageCommand(
      audienceId,
      latestStageId,
      url,
      name,
    );
  }
}

export default ModifyLatestStageCommand;
