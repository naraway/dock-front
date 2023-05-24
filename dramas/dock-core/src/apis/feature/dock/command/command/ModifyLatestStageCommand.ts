import { CommandRequest } from '@nara-way/accent';

export interface ModifyLatestStageCommand extends CommandRequest {
  audienceId?: string;
  latestStageId?: string;
  url?: string;
  name?: string;
}
