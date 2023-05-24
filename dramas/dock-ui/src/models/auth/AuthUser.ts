import { CitizenUser } from '@nara-way/checkpoint-core';

export interface AuthUser {
  user: CitizenUser;
  workspaces: string[];
  session?: string;
}
