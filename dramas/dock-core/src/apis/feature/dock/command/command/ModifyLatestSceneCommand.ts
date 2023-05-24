import { CommandRequest } from '@nara-way/accent';

export interface ModifyLatestSceneCommand extends CommandRequest {
  actorId?: string;
  url?: string;
  name?: string;
}
