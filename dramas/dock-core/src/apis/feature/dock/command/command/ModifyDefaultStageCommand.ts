import { CommandRequest } from '@nara-way/accent';

export interface ModifyDefaultStageCommand extends CommandRequest {
  audienceId?: string;
  defaultStageId?: string;
}
