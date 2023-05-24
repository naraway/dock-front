import { DomainEntity, PickWritable } from '@nara-way/accent';

export interface Stage extends DomainEntity {
  code: string;
  name: string;
  readonly backStageId: string;
  readonly cineroomId: string;
  readonly pavilionId: boolean;
}

export const StageUpdatable = ['code', 'name'] as const;
