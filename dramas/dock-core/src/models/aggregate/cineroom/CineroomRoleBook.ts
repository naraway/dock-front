import { DomainEntity, PickWritable } from '@nara-way/accent';
import { CineroomRole } from './vo';

export interface CineroomRoleBook extends DomainEntity {
  code: string;
  name: string;
  description?: string;
  cineroomRoles: CineroomRole[];
  base: boolean;
  defaultRole: boolean;
  readonly cineroomId: string;
  readonly pavilionId: string;
}

export const CineroomRoleBookUpdatable = [
  'code',
  'name',
  'description',
  'cineroomRoles',
  'base',
  'defaultRole',
] as const;
