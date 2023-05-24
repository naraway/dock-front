import { CommandRequest } from '@nara-way/accent';

export interface ModifyDefaultFirstForStageCommand extends CommandRequest {
  audienceId?: string;
  defaultFirst?: boolean;
}
