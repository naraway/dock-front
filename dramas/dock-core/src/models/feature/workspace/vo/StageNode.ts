import { ValueObject } from '@nara-way/accent';
import { StageNodeType } from './index';

export interface StageNode extends ValueObject {
  id?: string;
  name?: string;
  type?: keyof typeof StageNodeType;
  children?: StageNode[];
}
