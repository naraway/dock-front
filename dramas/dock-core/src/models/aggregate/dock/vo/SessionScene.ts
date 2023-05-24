import { IdNameList, ValueObject } from '@nara-way/accent';

export interface SessionScene extends ValueObject {
  url?: string;
  name?: string;
  actorId?: string;
  cineroomRoleBooks?: IdNameList;
}
