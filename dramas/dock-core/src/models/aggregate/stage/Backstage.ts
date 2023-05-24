import { DomainEntity, PickWritable } from '@nara-way/accent';

export interface Backstage extends DomainEntity {
  name: string;
  parentId: string;
  readonly chartId: string;
}

export const BackstageUpdatable = ['name'] as const;
