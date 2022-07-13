import { TenantType } from '@nara-way/accent';

interface TreeItem {
  id: string;
  name: string;
  type: TenantType | undefined;
  accessible: boolean;
  children: TreeItem[];
}

export default TreeItem;
