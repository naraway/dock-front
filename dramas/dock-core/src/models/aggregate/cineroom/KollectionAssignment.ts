import { DomainEntity, PickWritable } from '@nara-way/accent';

export interface KollectionAssignment extends DomainEntity {
  assigned: boolean;
  readonly subscriptionId: string;
  readonly kollectionVersionId: string;
  readonly cineroomId: string;
  readonly pavilionId: string;
}

export const KollectionAssignmentUpdatable = ['assigned'] as const;
