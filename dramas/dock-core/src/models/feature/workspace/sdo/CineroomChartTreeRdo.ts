import { StageNode, StageNodeType } from '../vo';

export interface CineroomChartTreeRdo {
  id?: string;
  name?: string;
  type?: keyof typeof StageNodeType;
  base?: boolean;
  children?: StageNode[];
}
