import { CodeName, Kollectie, KollectionRole, ValueObject } from '@nara-way/accent';

export interface DockKollection extends ValueObject {
  kollection?: CodeName;
  path?: string;
  active?: boolean;
  kollecties?: Kollectie[];
  kollectionRoles?: KollectionRole[];
}
