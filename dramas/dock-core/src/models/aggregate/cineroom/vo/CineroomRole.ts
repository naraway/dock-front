import { CodeName, ValueObject } from '@nara-way/accent';

export interface CineroomRole extends ValueObject {
  kollection?: CodeName;
  kollectionVersionId?: string;
  kollectionRole?: CodeName;
}
