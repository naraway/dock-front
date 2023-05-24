import { IdNameList } from '@nara-way/accent';
import { Actor, CineroomChart, Stage } from '../../../aggregate';

export interface CineroomChartRoleAssignRdo {
  cineroomChart?: CineroomChart;
  stages?: Stage[];
  cineroomRoleBooks?: IdNameList;
  actors?: Actor[];
}
