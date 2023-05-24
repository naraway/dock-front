import { IdNameList } from '@nara-way/accent';
import { Actor, CineroomChart, Stage } from '../../../aggregate';

export interface ActiveStageDockRdo {
  cineroomChart?: CineroomChart;
  actor?: Actor;
  stages?: Stage[];
  stage?: Stage;
  cineroomRoleBook?: IdNameList;
}
