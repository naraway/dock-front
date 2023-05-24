import { CitizenUser } from '@nara-way/checkpoint-core';
import { Token } from './Token';

export interface Auth {
  username: string;
  password: string;
  pavilionId: string;
  location?: string;
  deviceIp?: string;
}

export interface DevAuth {
  development: boolean;
  user: Partial<CitizenUser>;
  token?: Token;
  workspaces?: string[];
  session?: string;
}
