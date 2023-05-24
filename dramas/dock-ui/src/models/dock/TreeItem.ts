import { IdName, TenantType } from '@nara-way/accent';

export interface TreeItem extends IdName {
  type?: keyof typeof TenantType;
  accessible: boolean;
  children: TreeItem[];
}
