import { CommandRequest } from '@nara-way/accent';

export interface ModifyLatestCineroomCommand extends CommandRequest {
  citizenId?: string;
  latestCineroomId?: string;
}
