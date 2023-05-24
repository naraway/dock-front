import { DomainEntity, PickWritable } from '@nara-way/accent';
import { Creator } from '../shared';

export interface CineroomChart extends DomainEntity {
  name: string;
  stageSequence: number;
  backStageSequence: number;
  cineroomId: string;
}

export const CineroomChartUpdatable = ['name', 'stageSequence', 'backStageSequence'] as const;
