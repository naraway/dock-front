import { CommandRequest, CommandType } from '@nara-way/accent';

class ModifyLatestSceneCommand extends CommandRequest {
  actorId: string;
  url: string;
  name: string;

  constructor(
    actorId: string,
    url: string,
    name: string,
  ) {
    super();
    this.actorId = actorId;
    this.url = url;
    this.name = name;
  }

  static new(
    actorId: string,
    url: string,
    name: string,
  ) {
    return new ModifyLatestSceneCommand(
      actorId,
      url,
      name,
    );
  }
}

export default ModifyLatestSceneCommand;
